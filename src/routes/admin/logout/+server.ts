import { redirect } from '@sveltejs/kit';

import { clearAdminSession } from '$lib/server/admin';

export function GET({ cookies }) {
  clearAdminSession(cookies);
  throw redirect(303, '/admin/login');
}
