import { create } from 'zustand';
import { ColorTheme } from '../types/ColorTheme';

interface ThemeStore {
  currentTheme: number;
  themes: ColorTheme[];
  getCurrentTheme: () => ColorTheme;
}

const useThemeStore = create<ThemeStore>((set, get) => ({
  currentTheme: 0,
  themes: [
    {
      name: 'light',
      background: '#fef7ee',
      text: '#ffff',
      primary: '#f9930a',
      secondary: '#a73029',
      tertiary: '#53b7e8'
    },
    {
      name: 'dark',
      background: '#121212',
      text: '#E0E0E0',
      primary: '#1E90FF',
      secondary: '#A9A9A9',
      tertiary: '#32CD32'
    }
  ],
  getCurrentTheme: () => {
    const { currentTheme, themes } = get();
    return themes[currentTheme];
  }
}));

export default useThemeStore;
