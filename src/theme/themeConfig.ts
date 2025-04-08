export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  background: string;
  primaryBG: string;
  text: string;
  card: string;
  border: string;
  inActiveColor: string;
  lightBlack: string;
  lightWhite: string;
  cardDescription: string;
  deepMaroon: string;
  lightMaroon: string;
  textDark: string;
  borderColor: string;
  blueColor: string;
  ripplePrimary: string;
  darkPink: string;
  error: string;
  success: string;
}

export const lightTheme: ThemeColors = {
  primary: '#f28913',
  background: '#FFFFFF',
  primaryBG: "#F2F2F2",
  text: '#000000',
  textDark: '#ffffff',
  card: '#FFFFFF',
  border: '#C6C6C8',
  inActiveColor: '#8E8E93',
  lightBlack: 'rgba(0, 0, 0, 0.3)',
  lightWhite: 'rgba(255, 255, 255, 0.2)',
  cardDescription: '#918E8E',
  deepMaroon: '#631513',
  lightMaroon: '#A94442',
  borderColor: '#E1E0E0',
  blueColor: '#134CBF',
  ripplePrimary: 'rgba(0,0,0,0.1)',
  darkPink: '#DE1E79',
  error: "#CC3333",
  success: "#4CBB17"
};

export const darkTheme: ThemeColors = {
  primary: '#f28913',
  background: '#121212',
  primaryBG: "#F2F2F2",
  text: '#FFFFFF',
  textDark: '#000000',
  card: '#1E1E1E',
  border: '#2C2C2E',
  inActiveColor: '#98989D',
  lightBlack: 'rgba(255, 255, 255, 0.3)',
  lightWhite: 'rgba(0, 0, 0, 0.2)',
  cardDescription: '#A9A9A9',
  deepMaroon: '#ff2d2a',
  lightMaroon: '#D27B7B',
  borderColor: '#E1E0E0',
  blueColor: '#134CBF',
  ripplePrimary: 'rgba(255,255,255,0.1)',
  darkPink: '#DE1E79',
  error: "#CC3333",
  success: "#4CBB17"
};

export type ThemeColorKey = keyof ThemeColors;
