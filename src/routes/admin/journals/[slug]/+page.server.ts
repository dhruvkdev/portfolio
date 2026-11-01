import { eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { journals } from '$lib/server/db/schema';
import { requireAdminSession } from '$lib/server/admin';
import { buildJournalPayload } from '$lib/server/content-form';

export async function load({ cookies, params }) {
  requireAdminSession(cookies);

  const rows = await db.select().from(journals).where(eq(journals.slug, params.slug));

  if (!rows.length) {
    throw error(404, 'Journal not found.');
  }

  return {
    journal: rows[0]
  };
}

export const actions = {
  update: async ({ request, cookies, params }) => {
    requireAdminSession(cookies);

    const formData = await request.formData();
    const payload = buildJournalPayload(formData);

    if (!payload.title || !payload.content) {
      throw error(400, 'Title and content are required.');
    }

    await db
      .update(journals)
      .set({
        title: payload.title,
        slug: payload.slug,
        content: payload.content,
        tags: payload.tags,
        status: payload.status,
        publishedAt: payload.publishedAt,
        updatedAt: new Date()
      })
      .where(eq(journals.slug, params.slug));

    throw redirect(303, '/admin/journals');
  }
};
