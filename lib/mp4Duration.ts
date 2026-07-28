import { S3Client, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

// R2-specific: newer AWS SDK versions default to sending a CRC32 checksum
// header on every request, which R2 rejects on presigned browser uploads.
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

async function fetchRange(bucket: string, key: string, start: number, end: number): Promise<Buffer> {
	const res = await s3.send(
		new GetObjectCommand({ Bucket: bucket, Key: key, Range: `bytes=${start}-${end}` })
	);

	const stream = res.Body as AsyncIterable<Uint8Array>;
	const chunks: Buffer[] = [];

	for await (const chunk of stream) {
		chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
	}

	return Buffer.concat(chunks);
}

/** Finds a top-level ISO-BMFF box by 4-char type within `buf`, starting at offset 0. */
function findTopLevelBox(buf: Buffer, type: string): { start: number; size: number } | null {
	let offset = 0;

	while (offset + 8 <= buf.length) {
		let size = buf.readUInt32BE(offset);
		const boxType = buf.toString("ascii", offset + 4, offset + 8);
		let headerSize = 8;

		if (size === 1) {
			// 64-bit extended size lives in the next 8 bytes
			if (offset + 16 > buf.length) break;
			size = Number(buf.readBigUInt64BE(offset + 8));
			headerSize = 16;
		} else if (size === 0) {
			// Box extends to end of buffer/file
			size = buf.length - offset;
		}

		if (boxType === type) {
			return { start: offset, size };
		}

		if (size < headerSize) break;
		offset += size;
	}

	return null;
}

/** Parses an `mvhd` box (buf starts at the box's own size field) and returns duration in seconds. */
function parseMvhd(buf: Buffer): number {
	const version = buf.readUInt8(8);

	if (version === 1) {
		const timescale = buf.readUInt32BE(28);
		const duration = Number(buf.readBigUInt64BE(32));
		return duration / timescale;
	}

	const timescale = buf.readUInt32BE(20);
	const duration = buf.readUInt32BE(24);
	return duration / timescale;
}

/**
 * Reads an MP4's duration straight from its `moov`/`mvhd` atoms using ranged
 * S3 GETs — no ffmpeg binary, no downloading the full (up to 500MB) file.
 * Checks the front of the file first (covers "fast start" web exports), then
 * falls back to the tail (covers files where moov was written after mdat).
 * Throws if the structure can't be parsed — callers should treat that as a
 * failed verification, not a passed one.
 */
export async function getMp4DurationFromS3(key: string): Promise<number> {
	const bucket = process.env.R2_BUCKET_NAME!;

	const FRONT_WINDOW = 4 * 1024 * 1024; // 4MB
	const front = await fetchRange(bucket, key, 0, FRONT_WINDOW - 1);

	let moov = findTopLevelBox(front, "moov");
	let searchBuf = front;

	if (!moov) {
		const head = await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
		const fileSize = head.ContentLength ?? 0;

		const TAIL_WINDOW = 8 * 1024 * 1024; // 8MB
		const tailStart = Math.max(0, fileSize - TAIL_WINDOW);
		const tail = await fetchRange(bucket, key, tailStart, fileSize - 1);

		moov = findTopLevelBox(tail, "moov");
		searchBuf = tail;

		if (!moov) {
			throw new Error("Could not locate the video's moov atom to verify duration");
		}
	}

	const moovBuf = searchBuf.subarray(moov.start, moov.start + moov.size);
	// moov's own header is 8 bytes; mvhd is typically its first child
	const mvhd = findTopLevelBox(moovBuf.subarray(8), "mvhd");

	if (!mvhd) {
		throw new Error("Could not locate the video's mvhd atom to verify duration");
	}

	const mvhdBuf = moovBuf.subarray(8 + mvhd.start, 8 + mvhd.start + mvhd.size);
	return parseMvhd(mvhdBuf);
}