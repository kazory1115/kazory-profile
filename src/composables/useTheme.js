import { computed, ref } from 'vue';

const THEME_STORAGE_KEY = 'theme';
const isDark = ref(true);
let initialized = false;

const applyTheme = (theme) => {
  const dark = theme === 'dark';
  isDark.value = dark;
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.classList.toggle('light', !dark);
};

export const initializeTheme = () => {
  if (initialized || typeof window === 'undefined') return;

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : preferredTheme);
  initialized = true;
};

export const useTheme = () => {
  initializeTheme();

  const toggleTheme = () => {
    const theme = isDark.value ? 'light' : 'dark';
    applyTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  };

  return {
    isDark: computed(() => isDark.value),
    toggleTheme,
  };
};
