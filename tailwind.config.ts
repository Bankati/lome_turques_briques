import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ltb: {
          // ── Palette officielle (logo) ──────────────────────────
          white: "#FFFFFF",
          black: "#000000",
          blue: "#065A96", // Bleu principal du logo
          "blue-dark": "#044070", // Variante sombre (dégradés, sections)
          "blue-hover": "#054f82", // Hover des boutons bleus
          gray: "#D5D6D6", // Gris clair (bordures, séparateurs)
          light: "#BBBEBE", // Gris moyen (texte secondaire)
          cream: "#EDF0F0", // Fond clair (sections alternées)
          // ── Alias pour rétrocompatibilité ──────────────────────
          // Toutes les anciens accents chauds sont remappés sur la palette
          brick: "#065A96", // → bleu (remplace l'orange)
          earth: "#044070", // → bleu foncé (remplace le brun)
          sand: "#EDF0F0", // → fond clair (remplace le sable)
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "count-up": "countUp 2s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marqueeReverse 40s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
