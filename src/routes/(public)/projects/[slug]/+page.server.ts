import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import { renderMarkdown } from '$lib/server/markdown';

export async function load({ params }) {
  const rows = await db.select().from(projects).where(eq(projects.slug, params.slug));

  if (!rows.length) {
    throw error(404, 'Project not found.');
  }

  return {
    project: rows[0],
    html: renderMarkdown(rows[0].content ?? '')
  };
}
