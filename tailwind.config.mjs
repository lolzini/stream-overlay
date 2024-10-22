/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        minecraft: ["Minecraft"],
      },
    },
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        ".custom-shadow": {
          filter: `drop-shadow(2px 2px 0px #000000);`,
        },
      });
    },
  ],
};
