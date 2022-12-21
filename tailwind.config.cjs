/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        qiita: "#55c500",
        zenn: "rgb(62, 168, 255)",
      },
    },
  },
  plugins: [],
};
