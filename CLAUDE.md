# PhysioAtHomes — Patient App

Home physiotherapy service platform: licensed physiotherapists visit patients at
home. This repo is the **patient-facing mobile app** (Expo / React Native).

## Stack

- Expo SDK 54 + expo-router (file-based routing, typed routes)
- NativeWind 4 (Tailwind classes in RN) — config in `tailwind.config.js`
- Supabase for auth + data (`src/lib/supabase.ts`, `src/providers/AuthProvider.tsx`)
- `lucide-react-native` for icons (line icons, consistent stroke — do not mix icon sets in new UI)
- TypeScript strict mode; path alias `@/*` → repo root (import as `@/src/...`)

## Commands

- `npm start` — Expo dev server (`npm run ios` / `npm run android` / `npm run web`)
- `npm run lint` — ESLint (expo config)
- Type check: `npx tsc --noEmit`

## Structure

- `src/app/` — routes. `(user)` = main tab group (index = Home, services, profile),
  `(auth)` = sign-in/up, `(modals)` = modal screens.
- `src/components/` — shared components; `src/components/home/` = Home screen
  sections (presentational only, typed props, no data fetching).
- `src/theme/tokens.ts` — design tokens (colors, type scale, radius, spacing).
  Single source of truth; `tailwind.config.js` requires it directly. **Never
  hardcode hex values in components** — use Tailwind classes or import tokens.
- `src/types/` — data models. `src/lib/mock/` — mock data layer (swappable for
  real API). `src/hooks/` — data-loading hooks.
- `src/providers/` — Auth and Location contexts.

## Design conventions

Minimal, clinically professional — a calm medical practice, not a fitness app.

- Restrained palette: one primary (clinical teal), neutrals, status colors for
  state only. No gradients, no glassmorphism, no decorative color.
- Depth via 1px hairline borders (`border-line`) and whitespace, not shadows.
  Subtle elevation is allowed only on a screen's single primary card.
- Typography carries hierarchy (sizes/weights from tokens); body minimum 16pt;
  keep `allowFontScaling` enabled (default).
- 8pt spacing grid; screen padding 20 (`px-screen`); section gap 28
  (`gap-section`); touch targets ≥ 48×48.
- Every interactive element gets `accessibilityRole` + `accessibilityLabel`;
  AA contrast minimum (don't put `ink-tertiary` text on white for meaningful copy).
- No gamification (streaks, badges, confetti).

## States

Screens implement: skeleton loading (no spinners), empty state with one clear
CTA, inline per-section error with retry (never full-screen errors), offline
banner with cached data, pull-to-refresh.
