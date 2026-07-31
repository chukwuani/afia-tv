type FileKind = "entry" | "photo";
type Category = "essay" | "videography" | "photography";

/**
 * Reads a video file's duration in the browser without uploading it.
 * Resolves to null if the browser can't read it — this is often a codec/browser
 * quirk (e.g. H.265 inside MP4 not decoding in some browsers), not proof the
 * file is actually invalid, so callers should treat null as "skip this check"
 * rather than "reject the file."
 */
export function getVideoDuration(file: File): Promise<number | null> {
	return new Promise((resolve) => {
		const video = document.createElement("video");
		video.preload = "metadata";

		video.onloadedmetadata = () => {
			URL.revokeObjectURL(video.src);
			resolve(video.duration);
		};
		video.onerror = () => {
			URL.revokeObjectURL(video.src);
			resolve(null);
		};

		video.src = URL.createObjectURL(file);
	});
}

/**
 * Fast client-side pre-filter only. If the browser can't read the file's
 * metadata, this passes it through rather than blocking — the server
 * re-verifies duration authoritatively against the actual uploaded bytes
 * after upload, so nothing slips through unchecked, it just isn't caught
 * this early for files this particular browser can't probe.
 */
export async function validateVideoDuration(file: File): Promise<{ ok: boolean; message?: string }> {
	const duration = await getVideoDuration(file);

	if (duration === null) {
		return { ok: true };
	}

	const MIN = 3 * 60;
	const MAX = 7 * 60;

	if (duration < MIN || duration > MAX) {
		return {
			ok: false,
			message: `Video must be between 3 and 7 minutes long (yours is ${Math.round(duration / 60)} min).`,
		};
	}

	return { ok: true };
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