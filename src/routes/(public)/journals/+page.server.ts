import { db } from "$lib/server/db";
import { journals } from "$lib/server/db/schema";

export async function load(){
	try {
		const journalResult = await db.select().from(journals);
		return {
			journals: journalResult
		};
	} catch (error) {
		console.log("The issue is: " + error);
	}
}