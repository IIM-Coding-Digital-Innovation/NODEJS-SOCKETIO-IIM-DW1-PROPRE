import { defineNuxtConfig } from 'nuxt';
import eslintPlugin from 'vite-plugin-eslint';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [
      eslintPlugin(),
    ],
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  modules: [
    '@nuxtjs-alt/proxy',
  ],
  proxy: {
    '/api': process.env.API_BASE_URL,
  },
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/global.css',
  ],
  typescript: {
    shim: false,
  },
});
