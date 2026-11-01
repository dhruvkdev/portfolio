import { desc } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { requireAdminSession } from '$lib/server/admin';
import { journals, projects } from '$lib/server/db/schema';

export async function load({ cookies }) {
  requireAdminSession(cookies);

  const [journalRows, projectRows] = await Promise.all([
    db.select().from(journals).orderBy(desc(journals.createdAt)),
    db.select().from(projects).orderBy(desc(projects.createdAt))
  ]);

  return {
    journals: journalRows,
    projects: projectRows
  };
}
