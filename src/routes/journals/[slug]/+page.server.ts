import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

import { db } from '$lib/server/db';
import { journals } from '$lib/server/db/schema';

export async function load({ params }){
  const journal = await db.select().from(journals).where(eq(journals.slug, params.slug));
  if(journal.length == 0){
    error(404, 'Journal Not Found');
  }
  const rawHtml = await marked.parse(journal[0].content);
  const html = sanitizeHtml(rawHtml);
  return {
    journal: journal[0],
    html
  };
}