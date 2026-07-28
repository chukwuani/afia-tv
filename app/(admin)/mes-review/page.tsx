import { desc } from "drizzle-orm";
import { db } from "@/src/index";
import { submissions, exportLogs } from "@/src/db/schema";
import { getAdminByKey } from "@/lib/adminAuth";
import AdminDashboard from "@/components/layout/admin-dashboard";

// Next.js 15: searchParams is async. On Next.js 14, type it as
// `{ ak?: string }` directly and drop the `await`.
export default async function AdminPage({
	searchParams,
}: {
	searchParams: Promise<{ ak?: string }>;
}) {
	const { ak } = await searchParams;
	const admin = await getAdminByKey(ak);

	if (!admin) {
		return (
			<div className="flex min-h-screen items-center justify-center px-6 text-center">
				<p className="text-muted-foreground">
					Invalid or missing access key. Append <code>?ak=your-key</code> to the URL.
				</p>
			</div>
		);
	}

	// fileKey/photoKey are internal storage identifiers, intentionally left out of what
	// reaches the browser — fileUrl/photoUrl are the public links admins actually need.
	const allSubmissions = await db
		.select({
			id: submissions.id,
			contestantId: submissions.contestantId,
			fullName: submissions.fullName,
			age: submissions.age,
			stateOfOrigin: submissions.stateOfOrigin,
			community: submissions.community,
			entryTitle: submissions.entryTitle,
			category: submissions.category,
			phone: submissions.phone,
			email: submissions.email,
			instagramLink: submissions.instagramLink,
			caption: submissions.caption,
			fileUrl: submissions.fileUrl,
			photoUrl: submissions.photoUrl,
			status: submissions.status,
			approvedBy: submissions.approvedBy,
			reviewedAt: submissions.reviewedAt,
			createdAt: submissions.createdAt,
		})
		.from(submissions)
		.orderBy(desc(submissions.createdAt));

	const [lastExport] = await db
		.select()
		.from(exportLogs)
		.orderBy(desc(exportLogs.exportedAt))
		.limit(1);

	return (
		<AdminDashboard
			submissions={allSubmissions}
			adminName={admin.name}
			accessKey={ak!}
			lastExport={
				lastExport
					? { adminName: lastExport.adminName, exportedAt: lastExport.exportedAt.toISOString() }
					: null
			}
		/>
	);
}
