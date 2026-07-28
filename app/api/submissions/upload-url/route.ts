import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { z } from "zod";

// R2-compatible via the S3 API. R2 doesn't support the request/response
// checksum headers the AWS SDK sends by default from v3.729+, so those are
// turned off below - without this, presigned uploads fail against R2.
const s3 = new S3Client({
	region: process.env.R2_REGION || "auto",
	endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID!,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
	},
	requestChecksumCalculation: "WHEN_REQUIRED",
	responseChecksumValidation: "WHEN_REQUIRED",
});

const FILE_LIMITS = {
	essay: {
		maxSize: 10 * 1024 * 1024,
		types: [
			"application/pdf",
			"application/msword",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		],
	},
	videography: {
		maxSize: 500 * 1024 * 1024,
		types: ["video/mp4"],
	},
	photography: {
		maxSize: 15 * 1024 * 1024,
		types: ["image/jpeg", "image/png"],
	},
} as const;

const requestSchema = z.object({
	category: z.enum(["essay", "videography", "photography"]),
	// "entry" = the essay/video/photo being submitted, "photo" = participant's profile photo
	fileType: z.enum(["entry", "photo"]),
	contentType: z.string(),
	fileSize: z.number().positive(),
});

export async function POST(req: NextRequest) {
	const body = await req.json().catch(() => null);
	const parsed = requestSchema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
	}

	const { category, fileType, contentType, fileSize } = parsed.data;

	// A profile photo always follows the photography size/type limits, regardless of category
	const limits = fileType === "photo" ? FILE_LIMITS.photography : FILE_LIMITS[category];

	if (!limits.types.includes(contentType as never)) {
		return NextResponse.json(
			{ error: `${contentType} is not an accepted file type for ${fileType}` },
			{ status: 400 }
		);
	}

	if (fileSize > limits.maxSize) {
		return NextResponse.json(
			{ error: `File exceeds the ${limits.maxSize / (1024 * 1024)}MB limit` },
			{ status: 400 }
		);
	}

	const extension = contentType.split("/")[1];
	const key = `submissions/${category}/${fileType}-${randomUUID()}.${extension}`;

	const command = new PutObjectCommand({
		Bucket: process.env.R2_BUCKET_NAME!,
		Key: key,
		ContentType: contentType,
	});

	const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 minutes

	return NextResponse.json({
		uploadUrl,
		fileKey: key,
		fileUrl: `${process.env.R2_CDN_URL}/${key}`,
	});
}