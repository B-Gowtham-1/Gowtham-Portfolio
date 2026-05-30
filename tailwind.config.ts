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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom Recruiter-friendly Zenitsu theme
        zenitsu: {
          darkest: "#040404",   // Premium absolute black
          dark: "#0b0b0b",      // Sleek charcoal card base
          gray: "#161616",      // Graphite border lines
          lightGray: "#282828", // Subtle highlights
          yellow: "#ffd700",    // Zenitsu electric gold
          gold: "#f59e0b",      // Amber lightning gold
          orange: "#f97316",    // Thunder flame orange
          light: "#fbfbfb",     // Clean typography white
          glow: "rgba(255, 215, 0, 0.05)", // Soft ambient gold glow
        }
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        sketch: "4px 4px 0px 0px rgba(0,0,0,0.8)",
        sketchGold: "3px 3px 0px 0px #ffd700",
        sketchGoldHover: "5px 5px 0px 0px #ffd700",
        neonYellow: "0 0 20px rgba(255, 215, 0, 0.2)",
        neonOrange: "0 0 20px rgba(249, 115, 22, 0.2)",
      },
      animation: {
        "thunder-blink": "blink 2s infinite steps(1)",
        "scanline": "scanline 12s linear infinite",
        "glitch": "glitch 1.5s linear infinite",
        "lightning-strike": "strike 4s ease-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
        strike: {
          "0%, 95%, 100%": { opacity: "0", filter: "brightness(1)" },
          "96%": { opacity: "0.8", filter: "brightness(1.5)" },
          "97%": { opacity: "0.3", filter: "brightness(1.1)" },
          "98%": { opacity: "0.9", filter: "brightness(1.8)" },
          "99%": { opacity: "0.4", filter: "brightness(1.2)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
