import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        "72px": "72px",
      },
      width: {
        "60px": "60px",
        "124px": "124px",
        "150px": "150px",
        "304px": "304px",
      },
      minWidth: {
        "240px": "240px",
        "300px": "300px",
        "400px": "400px",
      },

      maxWidth: {
        "320px": "320px",
      },
      backgroundImage: {
        "main-bcg": "url('/bcg.webp')",
        "main-bcg2": "url('/bcg-dark.webp')",
        "loader-bcg": "url('/loader.webp')",
      },
      backgroundColor: {
        mybcg: "#1F2025",
        myBlackBcg: "rgb(33,33,33)",
        mySeacrhBcg: "rgb(44,44,44)",
        currentContextMenuMessage: "rgba( 24, 24, 24 , 0.9)",
        hoverGray: "rgba( 170,170,170 , 0.08)",
      },
      colors: {
        textSecondary: "rgb(170,170,170)",
        textcolor: "#707175",
        inputChar: "#35363B",
        inputCharSelect: "#13BAEE",
        myblue: "#13BAEE",
      },
      boxShadow: {
        mainShadow: "0 0.25rem 0.5rem 0.125rem rgb(16,16,16,0.612)",
        secondaryShadow: "0 0.2rem 0.75rem 0.125rem rgba(16, 16, 16, 0.612)",
        whiteTopShadow:
          "0rem -0.6875rem 0.4375rem -0.4375rem rgba(255, 255, 255, 0.612)",
        bottomShadow: "0 0.5rem 0.75rem 0.125rem rgba(16, 16, 16, 0.612)",
      },
    },
  },
  plugins: [],
};

export default config;
