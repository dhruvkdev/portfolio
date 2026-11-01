import { redirect } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';

export const ADMIN_COOKIE_NAME = 'portfolio_admin_session';
export const ADMIN_USERNAME = env.ADMIN_USERNAME ?? 'admin';

export function isAdminConfigured() {
  return Boolean(env.ADMIN_PASSWORD);
}

export function isValidAdminCredentials(username: string, password: string) {
  if (!isAdminConfigured()) {
    return false;
  }

  return username === ADMIN_USERNAME && password === env.ADMIN_PASSWORD;
}

export function getSessionUsername(cookies: Cookies) {
  const rawSession = cookies.get(ADMIN_COOKIE_NAME);

  if (!rawSession) {
    return null;
  }

  const [username, signature] = rawSession.split(':');

  if (!username || !signature) {
    return null;
  }

  const expected = createSignedSession(username);

  if (expected.length !== rawSession.length) {
    return null;
  }

  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(rawSession)) ? username : null;
  } catch {
    return null;
  }
}

export function setAdminSession(cookies: Cookies, username: string) {
  cookies.set(ADMIN_COOKIE_NAME, createSignedSession(username), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    maxAge: 60 * 60 * 24 * 7
  });
}

export function clearAdminSession(cookies: Cookies) {
  cookies.delete(ADMIN_COOKIE_NAME, { path: '/' });
}

export function requireAdminSession(cookies: Cookies) {
  const username = getSessionUsername(cookies);

  if (!username) {
    throw redirect(303, '/admin/login');
  }

  return username;
}

function createSignedSession(username: string) {
  const secret = env.ADMIN_SESSION_SECRET ?? env.ADMIN_PASSWORD ?? 'portfolio-dev-secret';
  const signature = createHmac('sha256', secret).update(username).digest('hex');

  return `${username}:${signature}`;
}
