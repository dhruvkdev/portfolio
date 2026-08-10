import { writable, type Writable } from 'svelte/store';
import type { Theme } from '$lib/types/theme';

export const theme: Writable<Theme> = writable('light');

export function toggleTheme() {
  theme.update(current => current === 'light' ? 'dark' : 'light');
}

export function setTheme(newTheme: Theme) {
  theme.set(newTheme);
}