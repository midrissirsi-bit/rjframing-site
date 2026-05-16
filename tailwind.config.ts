import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1480px" },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#060709",
          elev: "#0c1014",
        },
        surface: "#14181f",
        bone: {
          DEFAULT: "#e8ecf0",
          dim: "#a3aab4",
          mute: "#5a626d",
        },
        line: "#1a1f27",
        brand: {
          DEFAULT: "#29c5e8",
          dim: "#1e8aa3",
          glow: "#4ed5f0",
        },
        rust: "#f47d3a",
        background: "#060709",
        foreground: "#e8ecf0",
        card: "#0c1014",
        "card-foreground": "#e8ecf0",
        muted: "#14181f",
        "muted-foreground": "#a3aab4",
        secondary: "#14181f",
        "secondary-foreground": "#e8ecf0",
        border: "#1a1f27",
        ring: "#29c5e8",
      },
      fontFamily: {
        display: ["Fraunces", "Cormorant Garamond", "Times New Roman", "serif"],
        sans: ["Inter", "-apple-system", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SF Mono", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        mono: "0.18em",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(.22, .61, .36, 1)",
        "out-expo": "cubic-bezier(.16, 1, .3, 1)",
      },
      borderRadius: {
        lg: "0.625rem",
      },
    },
  },
  plugins: [],
};

export default config;
