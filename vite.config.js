import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  base: '/kazory-profile/', // 👈 這裡很重要
  plugins: [vue()],
});
