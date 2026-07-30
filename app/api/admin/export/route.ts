import { NextRequest, NextResponse } from "next/server";
import { eq, asc } from "drizzle-orm";
import ExcelJS from "exceljs";
import { db } from "@/src/index";
import { exportLogs, submissions } from "@/src/db/schema";
import { getAdminByKey } from "@/lib/adminAuth";

const CATEGORIES = ["essay", "videography", "photography"] as const;

// Note: this is worksheet protection, not encryption. It stops accidental edits
// in Excel's UI but is trivially removable by anyone who wants to bypass it -
// treat it as a deterrent, not a security boundary. The database stays authoritative.
async function protectSheet(sheet: ExcelJS.Worksheet) {
	await sheet.protect(process.env.EXPORT_SHEET_PASSWORD || "readonly", {
		selectLockedCells: true,
		selectUnlockedCells: true,
		formatCells: false,
		formatColumns: false,
		formatRows: false,
		insertColumns: false,
		insertRows: false,
		insertHyperlinks: false,
		deleteColumns: false,
		deleteRows: false,
		sort: true,
		autoFilter: true,
		pivotTables: false,
	});
}

export async function GET(req: NextRequest) {
	const key = req.nextUrl.searchParams.get("ak");
	const admin = await getAdminByKey(key);

	if (!admin) {
		return NextResponse.json({ error: "Invalid or missing access key" }, { status: 401 });
	}

	const categoryFilter = req.nextUrl.searchParams.get("category") as
		| (typeof CATEGORIES)[number]
		| null;

	const allSubmissions = categoryFilter
		? await db
				.select()
				.from(submissions)
				.where(eq(submissions.category, categoryFilter))
				.orderBy(asc(submissions.createdAt))
		: await db
				.select()
				.from(submissions)
				.orderBy(asc(submissions.category), asc(submissions.createdAt));

	const workbook = new ExcelJS.Workbook();
	workbook.creator = admin.name;
	workbook.created = new Date();

	const categoriesToRender = categoryFilter ? [categoryFilter] : CATEGORIES;

	// "All Entries" goes first so a contestant's entries across categories are
	// visible together in one place, not scattered across separate tabs.
	if (!categoryFilter) {
		const allSheet = workbook.addWorksheet("All Entries");

		allSheet.columns = [
			{ header: "Contestant ID", key: "contestantId", width: 14 },
			{ header: "Full Name", key: "fullName", width: 24 },
			{ header: "Category", key: "category", width: 14 },
			{ header: "Entry Title", key: "entryTitle", width: 28 },
			{ header: "Gender", key: "gender", width: 10 },
			{ header: "State of Origin", key: "stateOfOrigin", width: 16 },
			{ header: "State of Residence", key: "stateOfResidence", width: 16 },
			{ header: "Address", key: "address", width: 30 },
			{ header: "Date of Birth", key: "dateOfBirth", width: 20 },
			{ header: "Phone", key: "phone", width: 16 },
			{ header: "Email", key: "email", width: 28 },
			{ header: "Caption / Story", key: "caption", width: 50 },
			{ header: "Entry File", key: "fileUrl", width: 45 },
			{ header: "Profile Photo", key: "photoUrl", width: 45 },
			{ header: "Status", key: "status", width: 12 },
			{ header: "Reviewed By", key: "approvedBy", width: 18 },
			{ header: "Submitted At", key: "createdAt", width: 20 },
		];

		allSheet.getRow(1).font = { bold: true };
		allSheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE5E7EB" } };

		[...allSubmissions]
			.sort((a, b) => a.contestantId - b.contestantId || a.category.localeCompare(b.category))
			.forEach((s) => {
				allSheet.addRow({
					contestantId: s.contestantId,
					fullName: s.fullName,
					category: s.category,
					entryTitle: s.entryTitle,
					dateOfBirth: s.dateOfBirth,
					gender: s.gender,
					stateOfOrigin: s.stateOfOrigin,
					stateOfResidence: s.stateOfResidence,
					address: s.address,
					phone: s.phone,
					email: s.email,
					caption: s.caption ?? "",
					fileUrl: s.fileUrl,
					photoUrl: s.photoUrl,
					status: s.status,
					approvedBy: s.approvedBy ?? "",
					createdAt: s.createdAt.toLocaleString("en-NG"),
				});
			});

		await protectSheet(allSheet);
	}

	for (const category of categoriesToRender) {
		const sheet = workbook.addWorksheet(category.charAt(0).toUpperCase() + category.slice(1));

		sheet.columns = [
			{ header: "Contestant ID", key: "contestantId", width: 14 },
			{ header: "Full Name", key: "fullName", width: 24 },
			{ header: "Age", key: "age", width: 8 },
			{ header: "Gender", key: "gender", width: 10 },
			{ header: "State of Origin", key: "stateOfOrigin", width: 16 },
			{ header: "State of Residence", key: "stateOfResidence", width: 16 },
			{ header: "Address", key: "address", width: 30 },
			{ header: "Date of Birth", key: "dateOfBirth", width: 20 },
			{ header: "Entry Title", key: "entryTitle", width: 28 },
			{ header: "Phone", key: "phone", width: 16 },
			{ header: "Email", key: "email", width: 28 },
			{ header: "Instagram", key: "instagramLink", width: 32 },
			{ header: "Caption / Story", key: "caption", width: 50 },
			{ header: "Entry File", key: "fileUrl", width: 45 },
			{ header: "Profile Photo", key: "photoUrl", width: 45 },
			{ header: "Status", key: "status", width: 12 },
			{ header: "Reviewed By", key: "approvedBy", width: 18 },
			{ header: "Submitted At", key: "createdAt", width: 20 },
		];

		sheet.getRow(1).font = { bold: true };
		sheet.getRow(1).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFE5E7EB" },
		};

		allSubmissions
			.filter((s) => s.category === category)
			.forEach((s) => {
				sheet.addRow({
					contestantId: s.contestantId,
					fullName: s.fullName,
					dateOfBirth: s.dateOfBirth,
					gender: s.gender,
					stateOfOrigin: s.stateOfOrigin,
					stateOfResidence: s.stateOfResidence,
					address: s.address,
					entryTitle: s.entryTitle,
					phone: s.phone,
					email: s.email,
					instagramLink: s.instagramLink,
					caption: s.caption ?? "",
					fileUrl: s.fileUrl,
					photoUrl: s.photoUrl,
					status: s.status,
					approvedBy: s.approvedBy ?? "",
					createdAt: s.createdAt.toLocaleString("en-NG"),
				});
			});

		await protectSheet(sheet);
	}

	// Audit trail — every export, not just the most recent, so "who exported last"
	// is always answerable and there's a record if data ever needs to be traced back.
	await db.insert(exportLogs).values({
		adminId: admin.id,
		adminName: admin.name,
		category: categoryFilter ?? null,
	});

	const buffer = await workbook.xlsx.writeBuffer();

	return new NextResponse(buffer, {
		status: 200,
		headers: {
			"Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"Content-Disposition": `attachment; filename="submissions-${new Date().toISOString().slice(0, 10)}.xlsx"`,
		},
	});
}
