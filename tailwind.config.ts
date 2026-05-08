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
        // ── Palette officielle (logo LTB) ─────────────────────────
        primary: {
          navy:    "#001F4D",  // Bleu Marine — darkest, footer, overlays
          dark:    "#003D7A",  // Bleu Professionnel — principal, CTA
          DEFAULT: "#003D7A",  // Alias raccourci → primary === primary-dark
          light:   "#0099FF",  // Bleu Moderne — accents, hover
          lighter: "#E3F0FF",  // Très clair — backgrounds, badges
          50:  "#E3F0FF",
          100: "#B3D9FF",
          200: "#80BFFF",
          300: "#4DA6FF",
          400: "#1A8CFF",
          500: "#0099FF",
          600: "#0077CC",
          700: "#003D7A",
          800: "#002B5C",
          900: "#001F4D",
        },

        // ── Gris neutres ─────────────────────────────────────────
        gray: {
          50:  "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E5E5E5",
          400: "#CCCCCC",
          500: "#999999",
          600: "#757575",
          700: "#4A4A4A",
          800: "#424242",
          900: "#212121",
        },

        // ── Couleurs fonctionnelles ───────────────────────────────
        success: "#27AE60",
        warning: "#F39C12",
        error:   "#E74C3C",
        info:    "#3498DB",

        // ── Namespace ltb (rétrocompatibilité → bleus officiels) ──
        ltb: {
          white:         "#FFFFFF",
          black:         "#000000",
          blue:          "#003D7A",  // → primary-dark
          "blue-dark":   "#001F4D",  // → primary-navy
          "blue-hover":  "#002B5C",  // → primary-800
          gray:          "#E5E5E5",  // → gray-300
          light:         "#999999",  // → gray-500
          cream:         "#E3F0FF",  // → primary-lighter
          brick:         "#003D7A",  // → primary-dark
          earth:         "#001F4D",  // → primary-navy
          sand:          "#E3F0FF",  // → primary-lighter
        },
      },

      fontFamily: {
        sans:     ["var(--font-inter)",    "system-ui", "sans-serif"],
        heading:  ["var(--font-poppins)",  "system-ui", "sans-serif"],
        poppins:  ["var(--font-poppins)",  "sans-serif"],
        inter:    ["var(--font-inter)",    "sans-serif"],
        playfair: ["var(--font-poppins)",  "serif"],  // alias → Poppins
      },

      animation: {
        "fade-in":        "fadeIn 0.6s ease-out forwards",
        "slide-up":       "slideUp 0.6s ease-out forwards",
        "count-up":       "countUp 2s ease-out forwards",
        float:            "float 6s ease-in-out infinite",
        shimmer:          "shimmer 2s linear infinite",
        marquee:          "marquee 40s linear infinite",
        "marquee-reverse":"marqueeReverse 40s linear infinite",
      },

      keyframes: {
        fadeIn:   { "0%": { opacity: "0" },                                       "100%": { opacity: "1" } },
        slideUp:  { "0%": { opacity: "0", transform: "translateY(40px)" },         "100%": { opacity: "1", transform: "translateY(0)" } },
        float:    { "0%, 100%": { transform: "translateY(0px)" },                  "50%":  { transform: "translateY(-12px)" } },
        shimmer:  { "0%": { backgroundPosition: "-200% 0" },                       "100%": { backgroundPosition: "200% 0" } },
        marquee:  { "0%": { transform: "translateX(0)" },                          "100%": { transform: "translateX(-50%)" } },
        marqueeReverse: { "0%": { transform: "translateX(-50%)" },                 "100%": { transform: "translateX(0)" } },
      },
    },
  },
  plugins: [],
};
export default config;
