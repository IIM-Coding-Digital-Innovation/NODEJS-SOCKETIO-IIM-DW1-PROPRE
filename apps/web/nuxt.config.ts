import { defineNuxtConfig } from 'nuxt';
import eslintPlugin from '@nuxtjs/eslint-config-typescript';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [
      eslintPlugin(),
    ],
  },
});
