import { desc, eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import { requireAdminSession } from '$lib/server/admin';
import { buildProjectPayload } from '$lib/server/content-form';

export async function load({ cookies }) {
  requireAdminSession(cookies);

  const rows = await db.select().from(projects).orderBy(desc(projects.createdAt));

  return {
    projects: rows
  };
}

export const actions = {
  create: async ({ request, cookies }) => {
    requireAdminSession(cookies);

    const formData = await request.formData();
    const payload = buildProjectPayload(formData);

    if (!payload.title || !payload.summary || !payload.content) {
      throw error(400, 'Title, summary, and content are required.');
    }

    await db.insert(projects).values({
      ...payload,
      createdAt: new Date(),
      liveUrl: payload.liveUrl ?? null
    });

    throw redirect(303, '/admin/projects');
  },

  delete: async ({ request, cookies }) => {
    requireAdminSession(cookies);

    const formData = await request.formData();
    const slug = String(formData.get('slug') ?? '').trim();

    if (!slug) {
      throw error(400, 'Missing project slug.');
    }

    await db.delete(projects).where(eq(projects.slug, slug));

    throw redirect(303, '/admin/projects');
  }
};
