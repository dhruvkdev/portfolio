import { eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import { requireAdminSession } from '$lib/server/admin';
import { buildProjectPayload } from '$lib/server/content-form';

export async function load({ cookies, params }) {
  requireAdminSession(cookies);

  const rows = await db.select().from(projects).where(eq(projects.slug, params.slug));

  if (!rows.length) {
    throw error(404, 'Project not found.');
  }

  return {
    project: rows[0]
  };
}

export const actions = {
  update: async ({ request, cookies, params }) => {
    requireAdminSession(cookies);

    const formData = await request.formData();
    const payload = buildProjectPayload(formData);

    if (!payload.title || !payload.summary || !payload.content) {
      throw error(400, 'Title, summary, and content are required.');
    }

    await db
      .update(projects)
      .set({
        title: payload.title,
        slug: payload.slug,
        summary: payload.summary,
        content: payload.content,
        techStack: payload.techStack,
        githubUrl: payload.githubUrl,
        liveUrl: payload.liveUrl,
        status: payload.status,
        featured: payload.featured,
        homepageOrder: payload.homepageOrder,
        updatedAt: new Date()
      })
      .where(eq(projects.slug, params.slug));

    throw redirect(303, '/admin/projects');
  }
};
