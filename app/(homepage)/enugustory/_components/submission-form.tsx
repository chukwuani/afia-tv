"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { FileUploader } from "@/components/file-uploader";
import { PhotoUploader } from "@/components/photo-uploader";

import {
	submissionFormSchema,
	wordCount,
	type SubmissionFormValues,
} from "@/lib/validations/submission";
import { uploadSubmissionFile, validateVideoDuration } from "@/lib/uploadSubmissionFile";

const FILE_SIZE_LIMITS = {
	image: 15 * 1024 * 1024, // 15 MB
	video: 500 * 1024 * 1024, // 500 MB
	document: 10 * 1024 * 1024, // 10 MB
} as const;

const CATEGORY_FILE_CONFIG = {
	essay: {
		accept: {
			"application/pdf": [".pdf"],
		},
		accepts: ".pdf",
		maxSize: FILE_SIZE_LIMITS.document,
		label: "Essay file (PDF only)",
	},
	videography: {
		accept: { "video/mp4": [".mp4"] },
		accepts: ".mp4",
		maxSize: FILE_SIZE_LIMITS.video,
		label: "Video file (MP4, 3-7 minutes)",
	},
	photography: {
		accept: { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
		accepts: ".jpg,.jpeg,.png",
		maxSize: FILE_SIZE_LIMITS.image,
		label: "Photo/artwork file (JPG or PNG)",
	},
} as const;

function SubmissionForm({ setOpen }: { setOpen: (open: boolean) => void }) {
	const id = useId();

	const [openAlert, setOpenAlert] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<string>("");

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
		clearErrors,
	} = useForm<SubmissionFormValues>({
		resolver: zodResolver(submissionFormSchema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			category: "essay",
			stateOfOrigin: "enugu",
		},
	});

	const selectedCategory = watch("category");
	const caption = watch("caption") || "";
	const captionWords = wordCount(caption);

	const fileConfig = CATEGORY_FILE_CONFIG[selectedCategory];

	const [files, setFiles] = useState<File[]>([]);
	const [photos, setPhotos] = useState<File[]>([]);

	const onSubmit = async (data: SubmissionFormValues) => {
		setOpenAlert(false);

		if (files.length === 0) {
			toast.error(`Please upload your ${data.category === "essay" ? "essay" : "entry"} file.`);
			return;
		}

		if (photos.length === 0) {
			toast.error("Please upload a profile photo.");
			return;
		}

		setIsSubmitting(true);

		try {
			if (data.category === "videography") {
				setSubmitStatus("Checking video length...");
				// Client-side check for fast feedback only — the server re-verifies
				// this against the actual uploaded file before accepting the entry.
				await validateVideoDuration(files[0]);
			}

			setSubmitStatus("Uploading your files...");
			const [entryUpload, photoUpload] = await Promise.all([
				uploadSubmissionFile(files[0], data.category, "entry"),
				uploadSubmissionFile(photos[0], data.category, "photo"),
			]);

			setSubmitStatus("Submitting your entry...");
			const res = await fetch("/api/submissions", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...data,
					fileKey: entryUpload.fileKey,
					fileUrl: entryUpload.fileUrl,
					photoKey: photoUpload.fileKey,
					photoUrl: photoUpload.fileUrl,
				}),
			});

			const result = await res.json();

			if (!res.ok) {
				const message =
					typeof result?.error === "string"
						? result.error
						: "Submission failed. Please check your details and try again.";
				throw new Error(message);
			}

			toast.success("Upload Successful", {
				description:
					"Thank you for your submission! We will review your work and get back to you soon.",
				duration: 8000,
			});

			setOpen(false);
		} catch (error) {
			console.error(error);
			toast.error("Submission Failed", {
				description:
					error instanceof Error ? error.message : "An error occurred. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
			setSubmitStatus("");
		}
	};

	return (
		<div className="overflow-y-auto">
			<form className="space-y-4">
				<div className="px-6 pt-4 pb-6 space-y-4">
					<PhotoUploader
						accept={{
							"image/jpeg": [".jpeg", ".jpg"],
							"image/png": [".png"],
						}}
						maxSize={FILE_SIZE_LIMITS.image}
						multiple={false}
						onValueChange={setPhotos}
						disabled={isSubmitting}
					/>

					<div className="flex flex-col gap-4 sm:flex-row">
						<div className="flex-1 space-y-2">
							<Label htmlFor={`${id}-category`}>Category</Label>
							<Select
								defaultValue="essay"
								onValueChange={(newValue: SubmissionFormValues["category"]) => {
									setValue("category", newValue);
									clearErrors("category");
								}}>
								<SelectTrigger
									className="w-full"
									disabled={isSubmitting || files.length > 0}
									id={`${id}-category`}>
									<SelectValue placeholder="Select category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="essay">Essay</SelectItem>
									<SelectItem value="photography">Photography</SelectItem>
									<SelectItem value="videography">Videography</SelectItem>
								</SelectContent>
							</Select>

							{errors.category && (
								<p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
							)}
						</div>

						<div className="flex-1 space-y-2">
							<Label htmlFor={`${id}-state`}>State of Origin</Label>
							<Select
								defaultValue="enugu"
								onValueChange={(newValue: SubmissionFormValues["stateOfOrigin"]) => {
									setValue("stateOfOrigin", newValue);
									clearErrors("stateOfOrigin");
								}}>
								<SelectTrigger className="w-full" disabled={isSubmitting} id={`${id}-state`}>
									<SelectValue placeholder="Select state" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="abia">Abia</SelectItem>
									<SelectItem value="anambra">Anambra</SelectItem>
									<SelectItem value="ebonyi">Ebonyi</SelectItem>
									<SelectItem value="enugu">Enugu</SelectItem>
									<SelectItem value="imo">Imo</SelectItem>
								</SelectContent>
							</Select>

							{errors.stateOfOrigin && (
								<p className="text-red-500 text-sm mt-1">{errors.stateOfOrigin.message}</p>
							)}
						</div>
					</div>

					<div className="flex flex-col gap-4 sm:flex-row">
						<div className="flex-[2] space-y-2">
							<Label htmlFor={`${id}-full-name`}>Full name</Label>
							<Input
								id={`${id}-full-name`}
								placeholder="John Doe"
								type="text"
								{...register("fullName")}
								onChange={(e) => {
									setValue("fullName", e.target.value);
									clearErrors("fullName");
								}}
								disabled={isSubmitting}
							/>
							{errors.fullName && (
								<p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
							)}
						</div>

						<div className="flex-1 space-y-2">
							<Label htmlFor={`${id}-age`}>Age</Label>
							<Input
								id={`${id}-age`}
								placeholder="24"
								type="number"
								min={1}
								max={100}
								{...register("age")}
								onChange={(e) => {
									setValue("age", e.target.value as unknown as number);
									clearErrors("age");
								}}
								disabled={isSubmitting}
							/>
							{errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
						</div>
					</div>

					<div className="*:not-first:mt-2">
						<Label htmlFor={`${id}-community`}>Community</Label>
						<Input
							id={`${id}-community`}
							placeholder="e.g. Nsukka"
							type="text"
							{...register("community")}
							onChange={(e) => {
								setValue("community", e.target.value);
								clearErrors("community");
							}}
							disabled={isSubmitting}
						/>
						{errors.community && (
							<p className="text-red-500 text-sm mt-1">{errors.community.message}</p>
						)}
					</div>

					<div className="*:not-first:mt-2">
						<Label htmlFor={`${id}-entry-title`}>Title of your entry</Label>
						<Input
							id={`${id}-entry-title`}
							placeholder="Give your entry a title"
							type="text"
							{...register("entryTitle")}
							onChange={(e) => {
								setValue("entryTitle", e.target.value);
								clearErrors("entryTitle");
							}}
							disabled={isSubmitting}
						/>
						{errors.entryTitle && (
							<p className="text-red-500 text-sm mt-1">{errors.entryTitle.message}</p>
						)}
					</div>

					<div className="flex flex-col gap-4 sm:flex-row">
						<div className="flex-1 space-y-2">
							<Label htmlFor={`${id}-phone`}>Phone number</Label>
							<Input
								id={`${id}-phone`}
								placeholder="080..."
								type="tel"
								{...register("phone")}
								onChange={(e) => {
									setValue("phone", e.target.value);
									clearErrors("phone");
								}}
								disabled={isSubmitting}
							/>
							{errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
						</div>

						<div className="flex-1 space-y-2">
							<Label htmlFor={`${id}-email`}>Email</Label>
							<Input
								id={`${id}-email`}
								placeholder="m@example.com"
								type="email"
								{...register("email")}
								onChange={(e) => {
									setValue("email", e.target.value);
									clearErrors("email");
								}}
								disabled={isSubmitting}
							/>
							{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
						</div>
					</div>

					<div className="*:not-first:mt-2">
						<Label htmlFor={`${id}-socials`}>Your Instagram link</Label>
						<Input
							id={`${id}-socials`}
							placeholder="https://instagram.com/username"
							type="text"
							{...register("instagramLink")}
							onChange={(e) => {
								setValue("instagramLink", e.target.value);
								clearErrors("instagramLink");
							}}
							disabled={isSubmitting}
						/>
						{errors.instagramLink && (
							<p className="text-red-500 text-sm mt-1">{errors.instagramLink.message}</p>
						)}
					</div>

					{selectedCategory === "photography" && (
						<div className="*:not-first:mt-2">
							<Label htmlFor={`${id}-caption`}>Photo caption / story</Label>
							<Textarea
								id={`${id}-caption`}
								placeholder="Tell the story behind your photo (100-200 words)..."
								className="max-h-25"
								{...register("caption")}
								onChange={(e) => {
									setValue("caption", e.target.value);
									clearErrors("caption");
								}}
								disabled={isSubmitting}
								rows={6}
								aria-describedby={`${id}-caption-count`}
							/>
							<p
								id={`${id}-caption-count`}
								className={`mt-2 text-right text-xs ${
									captionWords < 100 || captionWords > 200
										? "text-red-500"
										: "text-muted-foreground"
								}`}
								role="status"
								aria-live="polite">
								<span className="tabular-nums">{captionWords}</span> / 100-200 words required
							</p>
							{errors.caption && (
								<p className="text-red-500 text-sm mt-1">{errors.caption.message}</p>
							)}
						</div>
					)}

					<div className="*:not-first:mt-2">
						<Label>{fileConfig.label}</Label>
						<FileUploader
							accept={fileConfig.accept}
							accepts={fileConfig.accepts}
							maxSize={fileConfig.maxSize}
							multiple={false}
							onValueChange={setFiles}
							disabled={isSubmitting}
						/>
						{selectedCategory === "videography" && (
							<p className="text-muted-foreground text-xs">
								Must be 3-7 minutes long. We check this again automatically after upload.
							</p>
						)}
					</div>
				</div>

				<DialogFooter className="border-t px-6 py-4">
					<DialogClose asChild>
						<Button type="button" variant="outline" disabled={isSubmitting}>
							Cancel
						</Button>
					</DialogClose>

					<AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
						<AlertDialogTrigger asChild>
							<Button type="button" disabled={isSubmitting}>
								{isSubmitting ? submitStatus || "Submitting..." : "Submit Entry"}
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you sure?</AlertDialogTitle>
								<AlertDialogDescription>
									Please ensure all your information is correct before submitting. You won't be able
									to make changes after submission, and you can only submit once per category.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel disabled={isSubmitting}>Go Back</AlertDialogCancel>
								<AlertDialogAction onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
									Yes, Submit
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</DialogFooter>
			</form>
		</div>
	);
}

export default SubmissionForm;
