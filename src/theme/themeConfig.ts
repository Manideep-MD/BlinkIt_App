export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  background: string;
  primaryBG: string;
  success: string;
}

export const lightTheme: ThemeColors = {
  primary: '#f28913',
  background: '#FFFFFF',
  primaryBG: "#F2F2F2",
  success: "#4CBB17"
};

export const darkTheme: ThemeColors = {
  primary: '#f28913',
  background: '#121212',
  primaryBG: "#F2F2F2",
  success: "#4CBB17"
};

export type ThemeColorKey = keyof ThemeColors;
