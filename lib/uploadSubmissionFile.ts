type FileKind = "entry" | "photo";
type Category = "essay" | "videography" | "photography";

/**
 * Reads a video file's duration in the browser without uploading it.
 * Use this before requesting an upload URL to enforce the 3–7 minute rule.
 */
export function getVideoDuration(file: File): Promise<number> {
	return new Promise((resolve, reject) => {
		const video = document.createElement("video");
		video.preload = "metadata";

		video.onloadedmetadata = () => {
			URL.revokeObjectURL(video.src);
			resolve(video.duration);
		};
		video.onerror = () => {
			URL.revokeObjectURL(video.src);
			reject(new Error("Could not read video metadata"));
		};

		video.src = URL.createObjectURL(file);
	});
}

export async function validateVideoDuration(file: File) {
	const duration = await getVideoDuration(file);
	const MIN = 3 * 60;
	const MAX = 7 * 60;

	if (duration < MIN || duration > MAX) {
		throw new Error(
			`Video must be between 3 and 7 minutes long (yours is ${Math.round(duration / 60)} min).`
		);
	}
}

/**
 * Requests a presigned URL, then PUTs the file directly to storage.
 * Returns the fileKey/fileUrl to send along with the rest of the submission metadata.
 */
export async function uploadSubmissionFile(
	file: File,
	category: Category,
	fileType: FileKind
) {
	const res = await fetch("/api/submissions/upload-url", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			category,
			fileType,
			contentType: file.type,
			fileSize: file.size,
		}),
	});

	if (!res.ok) {
		const { error } = await res.json().catch(() => ({ error: "Could not start upload" }));
		throw new Error(typeof error === "string" ? error : "Could not start upload");
	}

	const { uploadUrl, fileKey, fileUrl } = await res.json();

	const putRes = await fetch(uploadUrl, {
		method: "PUT",
		headers: { "Content-Type": file.type },
		body: file,
	});

	if (!putRes.ok) {
		throw new Error("File upload to storage failed");
	}

	return { fileKey, fileUrl };
}