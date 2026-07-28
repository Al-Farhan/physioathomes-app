/**
 * Design tokens — single source of truth.
 * `tailwind.config.js` requires this file directly (loaded via jiti), so any
 * change here propagates to NativeWind classes. Components must not hardcode
 * hex values; use Tailwind classes or import from here (e.g. for icon colors).
 */

export const colors = {
  primary: {
    50: "#F0FDFA",
    600: "#0F766E",
    700: "#115E59",
  },
  ink: {
    DEFAULT: "#0F172A", // primary text
    secondary: "#475569", // secondary text
    tertiary: "#94A3B8", // placeholders / disabled / decorative icons only — fails AA on white
  },
  line: "#E2E8F0", // hairline borders
  surface: {
    DEFAULT: "#FFFFFF",
    alt: "#F8FAFC",
  },
  // Status colors communicate state only — never decoration.
  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",
} as const;

// Single family: Inter, weights 400/500/600 only. Runtime-loaded fonts
// register one family name per weight, so weight is selected via the
// font-sans / font-sans-medium / font-sans-semibold classes rather than
// fontWeight utilities.
export const fontFamily = {
  sans: ["Inter_400Regular"],
  "sans-medium": ["Inter_500Medium"],
  "sans-semibold": ["Inter_600SemiBold"],
} as const;

export const fontSize = {
  display: ["28px", { lineHeight: "34px" }],
  title: ["20px", { lineHeight: "28px" }],
  body: ["16px", { lineHeight: "24px" }],
  label: ["14px", { lineHeight: "20px" }],
  caption: ["13px", { lineHeight: "18px" }],
} as const;

// 8pt grid (4 allowed for icon gaps). Named steps for layout constants.
export const spacing = {
  screen: "20px", // horizontal screen padding
  section: "28px", // vertical gap between sections
} as const;

export const borderRadius = {
  card: "16px",
  btn: "12px",
  pill: "999px",
} as const;

/** Minimum touch target, in dp. */
export const TOUCH_TARGET = 48;
