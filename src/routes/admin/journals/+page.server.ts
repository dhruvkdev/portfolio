import { desc, eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { journals } from '$lib/server/db/schema';
import { requireAdminSession } from '$lib/server/admin';
import { buildJournalPayload } from '$lib/server/content-form';

export async function load({ cookies }) {
  requireAdminSession(cookies);

  const rows = await db.select().from(journals).orderBy(desc(journals.createdAt));

  return {
    journals: rows
  };
}

export const actions = {
  create: async ({ request, cookies }) => {
    requireAdminSession(cookies);

    const formData = await request.formData();
    const payload = buildJournalPayload(formData);

    if (!payload.title || !payload.content) {
      throw error(400, 'Title and content are required.');
    }

    await db.insert(journals).values({
      ...payload,
      createdAt: new Date(),
      publishedAt: payload.publishedAt ?? null
    });

    throw redirect(303, '/admin/journals');
  },

  delete: async ({ request, cookies }) => {
    requireAdminSession(cookies);

    const formData = await request.formData();
    const slug = String(formData.get('slug') ?? '').trim();

    if (!slug) {
      throw error(400, 'Missing journal slug.');
    }

    await db.delete(journals).where(eq(journals.slug, slug));

    throw redirect(303, '/admin/journals');
  }
};
