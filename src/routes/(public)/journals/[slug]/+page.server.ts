import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

import { db } from '$lib/server/db';
import { journals } from '$lib/server/db/schema';

export async function load({ params }){
  try {
    const journal = await db.select().from(journals).where(eq(journals.slug, params.slug));
    if(journal.length == 0){
      throw new Error('Journal Not Found');
    }
    const rawHtml = await marked.parse(journal[0].content);
    const html = sanitizeHtml(rawHtml);
    return {
      journal: journal[0],
      html
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("The error is: " + message);

    if (typeof err === 'object' && err !== null && 'status' in err && typeof err.status === 'number') {
      throw err;
    }

    throw error(500, 'Failed to load journal');
  }
}