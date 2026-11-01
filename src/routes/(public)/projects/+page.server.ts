import { desc } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';

export async function load() {
  const rows = await db.select().from(projects).orderBy(desc(projects.createdAt));

  return {
    projects: rows
  };
}
