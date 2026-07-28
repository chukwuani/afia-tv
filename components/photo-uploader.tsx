"use client";

import * as React from "react";
import { CircleUserRoundIcon, XIcon } from "lucide-react";
import Dropzone, { type DropzoneProps, type FileRejection } from "react-dropzone";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { useControllableState } from "@/hooks/use-controllable-state";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Value of the uploader.
	 * @type File[]
	 * @default undefined
	 * @example value={files}
	 */
	value?: File[];

	/**
	 * Function to be called when the value changes.
	 * @type React.Dispatch<React.SetStateAction<File[]>>
	 * @default undefined
	 * @example onValueChange={(files) => setFiles(files)}
	 */
	onValueChange?: React.Dispatch<React.SetStateAction<File[]>>;

	/**
	 * Function to be called when files are uploaded.
	 * @type (files: File[]) => Promise<void>
	 * @default undefined
	 * @example onUpload={(files) => uploadFiles(files)}
	 */
	onUpload?: (files: File[]) => Promise<void>;

	/**
	 * Progress of the uploaded files.
	 * @type Record<string, number> | undefined
	 * @default undefined
	 * @example progresses={{ "file1.png": 50 }}
	 */
	progresses?: Record<string, number>;

	/**
	 * Accepted file types for the uploader.
	 * @type { [key: string]: string[]}
	 * @default
	 * ```ts
	 * { "image/*": [] }
	 * ```
	 * @example accept={["image/png", "image/jpeg"]}
	 */
	accept?: DropzoneProps["accept"];

	/**
	 * Maximum file size for the uploader.
	 * @type number | undefined
	 * @default 1024 * 1024 * 2 // 2MB
	 * @example maxSize={1024 * 1024 * 2} // 2MB
	 */
	maxSize?: DropzoneProps["maxSize"];

	/**
	 * Maximum number of files for the uploader.
	 * @type number | undefined
	 * @default 1
	 * @example maxFiles={5}
	 */
	maxFiles?: DropzoneProps["maxFiles"];

	/**
	 * Whether the uploader should accept multiple files.
	 * @type boolean
	 * @default false
	 * @example multiple
	 */
	multiple?: boolean;

	/**
	 * Whether the uploader is disabled.
	 * @type boolean
	 * @default false
	 * @example disabled
	 */
	disabled?: boolean;
}

export function PhotoUploader(props: FileUploaderProps) {
	const {
		value: valueProp,
		onValueChange,
		onUpload,
		progresses,
		accept = { "image/*": [] },
		maxSize = 1024 * 1024 * 2,
		maxFiles = 1,
		multiple = false,
		disabled = false,
		className,
		...dropzoneProps
	} = props;

	const [files, setFiles] = useControllableState({
		prop: valueProp,
		onChange: onValueChange,
	});

	const onDrop = React.useCallback(
		(acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
				toast.error("Cannot upload more than 1 file at a time");
				return;
			}

			if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
				toast.error(`Cannot upload more than ${maxFiles} files`);
				return;
			}

			const newFiles = acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			);

			const updatedFiles = files ? [...files, ...newFiles] : newFiles;

			setFiles(updatedFiles);

			if (rejectedFiles.length > 0) {
				rejectedFiles.forEach(({ file }) => {
					toast.error(`File ${file.name} was rejected`);
				});
			}

			if (onUpload && updatedFiles.length > 0 && updatedFiles.length <= maxFiles) {
				const target = updatedFiles.length > 0 ? `${updatedFiles.length} files` : `file`;

				toast.promise(onUpload(updatedFiles), {
					loading: `Uploading ${target}...`,
					success: () => {
						setFiles([]);
						return `${target} uploaded`;
					},
					error: `Failed to upload ${target}`,
				});
			}
		},

		[files, maxFiles, multiple, onUpload, setFiles]
	);

	function onRemove(index: number) {
		if (!files) return;
		const newFiles = files.filter((_, i) => i !== index);
		setFiles(newFiles);
		onValueChange?.(newFiles);
	}

	// Revoke preview url when component unmounts
	React.useEffect(() => {
		return () => {
			if (!files) return;
			files.forEach((file) => {
				if (isFileWithPreview(file)) {
					URL.revokeObjectURL(file.preview);
				}
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const isDisabled = disabled || (files?.length ?? 0) >= maxFiles;

	return (
		<div className="flex flex-col items-center gap-2">
			<Dropzone
				onDrop={onDrop}
				accept={accept}
				maxSize={maxSize}
				maxFiles={maxFiles}
				multiple={maxFiles > 1 || multiple}
				disabled={isDisabled}>
				{({ getRootProps, getInputProps, isDragActive }) => (
					<div
						{...getRootProps()}
						className="relative flex flex-col items-center gap-2"
						{...dropzoneProps}>
						<input {...getInputProps()} />
						<div
							className={cn(
								buttonVariants({ variant: "outline" }),
								"relative !size-16 p-0 shadow-none"
							)}
							aria-label={files?.length ? "Change image" : "Upload image"}>
							{files?.length ? (
								<div>
									{files?.map((file, index) => (
										<div className="relative" key={index}>
											{isFileWithPreview(file) ? (
												<Image
													src={file.preview}
													alt={file.name}
													width={64}
													height={64}
													loading="lazy"
													className="size-16 object-cover rounded-xl"
												/>
											) : null}

											<Button
												key={index}
												disabled={disabled}
												onClick={() => onRemove(index)}
												size="icon"
												className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
												aria-label="Remove image">
												<XIcon className="size-3.5" />
											</Button>
										</div>
									))}
								</div>
							) : (
								<div aria-hidden="true">
									<CircleUserRoundIcon className="size-4 opacity-60" />
								</div>
							)}
						</div>

						{files?.length ? (
							<div>
								{files?.map((file, index) => (
									<p key={index} className="text-muted-foreground text-xs">
										{file.name}
									</p>
								))}
							</div>
						) : null}

						<p aria-live="polite" role="region" className="text-muted-foreground mt-2 text-xs">
							Upload your photo to be featured in your entry flier.
						</p>
					</div>
				)}
			</Dropzone>
		</div>
	);
}

function isFileWithPreview(file: File): file is File & { preview: string } {
	return "preview" in file && typeof file.preview === "string";
}
