"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

import { FileUploader } from "@/components/file-uploader";
import { PhotoUploader } from "@/components/photo-uploader";

import {
	submissionFormSchema,
	wordCount,
	NIGERIAN_STATE_LABELS,
	STATE_OF_RESIDENCE_LABELS,
	type SubmissionFormValues,
} from "@/lib/validations/submission";
import { uploadSubmissionFile, validateVideoDuration } from "@/lib/uploadSubmissionFile";
import { cn } from "@/lib/utils";

const FILE_SIZE_LIMITS = {
	image: 15 * 1024 * 1024, // 15 MB
	video: 500 * 1024 * 1024, // 500 MB
	document: 10 * 1024 * 1024, // 10 MB
} as const;

const CATEGORY_FILE_CONFIG = {
	essay: {
		accept: {
			"application/pdf": [".pdf"],
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
			"application/msword": [".doc"],
		},
		accepts: ".pdf,.doc,.docx",
		maxSize: FILE_SIZE_LIMITS.document,
		label: "Essay file (PDF or Word doc)",
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

function SubmissionForm({
	verifiedContact,
}: {
	verifiedContact: { fullName: string; email: string; phone: string; token: string };
}) {
	const id = useId();
	const router = useRouter();

	const [openAlert, setOpenAlert] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<string>("");
	const [openCalendar, setOpenCalendar] = useState(false);

	const [date, setDate] = useState<Date | undefined>(undefined);

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
			stateOfResidence: "enugu",
			fullName: verifiedContact.fullName,
			email: verifiedContact.email,
			phone: verifiedContact.phone,
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
				const durationCheck = await validateVideoDuration(files[0]);
				if (!durationCheck.ok) {
					throw new Error(durationCheck.message);
				}
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
					verificationToken: verifiedContact.token,
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

			router.push("/enugustory");
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
		<form className="mx-auto max-w-2xl space-y-4 py-8 px-4">
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
					<Label htmlFor={`${id}-gender`}>Gender</Label>
					<Select
						onValueChange={(newValue: SubmissionFormValues["gender"]) => {
							setValue("gender", newValue);
							clearErrors("gender");
						}}>
						<SelectTrigger className="w-full" disabled={isSubmitting} id={`${id}-gender`}>
							<SelectValue placeholder="Select gender" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="male">Male</SelectItem>
							<SelectItem value="female">Female</SelectItem>
						</SelectContent>
					</Select>
					{errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
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
						readOnly
						className="bg-muted/50"
					/>
					<p className="text-muted-foreground text-xs">Verified — locked to what you confirmed.</p>
					{errors.fullName && (
						<p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
					)}
				</div>

				<div className="flex-1 space-y-2">
					<Label htmlFor={`${id}-date-of-birth`}>Date of Birth</Label>

					<Popover open={openCalendar} onOpenChange={setOpenCalendar}>
						<PopoverTrigger asChild>
							<button
								type="button"
								id="date"
								className={cn(
									"flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
									!date && "text-muted-foreground!",
								)}
								disabled={isSubmitting}>
								{date ? date.toLocaleDateString() : "Select date"}
							</button>
						</PopoverTrigger>
						<PopoverContent className="w-auto overflow-hidden p-0" align="start">
							<Calendar
								mode="single"
								selected={date}
								defaultMonth={date}
								captionLayout="dropdown"
								onSelect={(date) => {
									if (!date) return; // ignore deselection, keep last valid date
									setDate(date);
									setValue("dateOfBirth", date.toLocaleDateString(), {
										shouldValidate: true,
										shouldDirty: true,
									});
									clearErrors("dateOfBirth");
									setOpenCalendar(false);
								}}
							/>
						</PopoverContent>
					</Popover>

					{errors.dateOfBirth && (
						<p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-4 sm:flex-row">
				<div className="flex-1 space-y-2">
					<Label htmlFor={`${id}-state-of-origin`}>State of origin</Label>
					<Select
						onValueChange={(newValue: SubmissionFormValues["stateOfOrigin"]) => {
							setValue("stateOfOrigin", newValue);
							clearErrors("stateOfOrigin");
						}}>
						<SelectTrigger className="w-full" disabled={isSubmitting} id={`${id}-state-of-origin`}>
							<SelectValue placeholder="Select state" />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(NIGERIAN_STATE_LABELS).map(([value, label]) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.stateOfOrigin && (
						<p className="text-red-500 text-sm mt-1">{errors.stateOfOrigin.message}</p>
					)}
				</div>

				<div className="flex-1 space-y-2">
					<Label htmlFor={`${id}-state-of-residence`}>State of residence</Label>
					<Select
						defaultValue="enugu"
						onValueChange={(newValue: SubmissionFormValues["stateOfResidence"]) => {
							setValue("stateOfResidence", newValue);
							clearErrors("stateOfResidence");
						}}>
						<SelectTrigger
							className="w-full"
							disabled={isSubmitting}
							id={`${id}-state-of-residence`}>
							<SelectValue placeholder="Select state" />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(STATE_OF_RESIDENCE_LABELS).map(([value, label]) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<p className="text-muted-foreground text-xs">Open to South East residents only.</p>
					{errors.stateOfResidence && (
						<p className="text-red-500 text-sm mt-1">{errors.stateOfResidence.message}</p>
					)}
				</div>
			</div>

			<div className="*:not-first:mt-2">
				<Label htmlFor={`${id}-address`}>Address</Label>
				<Input
					id={`${id}-address`}
					placeholder="Street address"
					type="text"
					{...register("address")}
					onChange={(e) => {
						setValue("address", e.target.value);
						clearErrors("address");
					}}
					disabled={isSubmitting}
				/>
				{errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
			</div>

			<div className="*:not-first:mt-2">
				<Label htmlFor={`${id}-entry-title`}>Title of entry</Label>
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
						readOnly
						className="bg-muted/50"
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
						readOnly
						className="bg-muted/50"
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
							captionWords < 100 || captionWords > 200 ? "text-red-500" : "text-muted-foreground"
						}`}
						role="status"
						aria-live="polite">
						<span className="tabular-nums">{captionWords}</span> / 100-200 words required
					</p>
					{errors.caption && <p className="text-red-500 text-sm mt-1">{errors.caption.message}</p>}
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
			</div>

			<div className="flex justify-end border-t pt-4">
				<AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
					<AlertDialogTrigger asChild>
						<Button type="button" disabled={isSubmitting}>
							{isSubmitting ? submitStatus || "Submitting..." : "Review & Submit"}
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you sure?</AlertDialogTitle>
							<AlertDialogDescription>
								Please ensure all your information is correct before submitting. If your entry is
								rejected, you get exactly one resubmission in this category — after that, this
								category is closed to you, so double-check everything now.
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
			</div>
		</form>
	);
}

export default SubmissionForm;
