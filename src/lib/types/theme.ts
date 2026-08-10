export type Theme = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  primary: string;
  accent: string;
  secondary: string;
  rules: string;
}

export const LIGHT_COLORS: ThemeColors = {
  background: '#F3EFE7',
  primary: '#171717',
  accent: '#A94F35',
  secondary: '#68645D',
  rules: '#292722',
};

export const DARK_COLORS: ThemeColors = {
  background: '#181715',
  primary: '#E6E0D5',
  accent: '#B85F43',
  secondary: '#A09A90',
  rules: '#756F66',
};