import { fail, redirect } from '@sveltejs/kit';

import { getSessionUsername, isAdminConfigured, isValidAdminCredentials, setAdminSession } from '$lib/server/admin';

export async function load({ cookies }) {
  if (getSessionUsername(cookies)) {
    throw redirect(303, '/admin');
  }

  return {
    notConfigured: !isAdminConfigured()
  };
}

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    if (!isAdminConfigured()) {
      return fail(500, {
        error: 'Admin authorization is not configured yet. Set ADMIN_PASSWORD on the server.'
      });
    }

    if (!isValidAdminCredentials(username, password)) {
      return fail(401, { error: 'Invalid username or password.' });
    }

    setAdminSession(cookies, username);
    throw redirect(303, '/admin');
  }
};
