import { db } from "@/src/index";
import { admins } from "@/src/db/schema";

// Edit this list, then run: npx tsx scripts/seed-admins.ts
// Keys should be hard to guess (not sequential/short) since they're the entire auth mechanism.
const ADMIN_LIST = [
	{ key: "322465", name: "Stephen" },
	{ key: "123456", name: "JohnPaul" },
];

async function main() {
	const inserted = await db.insert(admins).values(ADMIN_LIST).returning();
	console.log(`Seeded ${inserted.length} admin(s):`, inserted.map((a) => a.name).join(", "));
	process.exit(0);
}

main().catch((err) => {
	console.error("Seeding failed:", err);
	process.exit(1);
});