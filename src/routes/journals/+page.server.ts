import { db } from "$lib/server/db";
import { journals } from "$lib/server/db/schema";

export async function load(){
	const journalResult = await db.select().from(journals);
	return {
		journals: journalResult
	};
}