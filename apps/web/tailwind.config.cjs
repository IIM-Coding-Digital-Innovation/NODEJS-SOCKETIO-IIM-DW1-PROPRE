/* eslint-disable global-require */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    // "./nuxt.config.{js,ts}",
  ],
  plugins: [require('daisyui')],
  theme: {
    extend: {},
  },
};
