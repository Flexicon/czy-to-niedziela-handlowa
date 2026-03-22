# CLAUDE.md — Agent Reference for `czy-to-niedziela-handlowa`

## What This Project Is

**"Czy to niedziela handlowa?"** — Polish for "Is it a commercial (trading) Sunday?"

A simple Polish-language web utility that answers whether the nearest Sunday is a "handlowa" (commercial/trading) Sunday. In Poland, retail stores are legally prohibited from opening on most Sundays; only a specific set of Sundays per year are designated as commercial, and this app tells users which ones they are.

The site displays:

- Whether the nearest Sunday (today if Sunday, otherwise next Sunday) is commercial — shown as `tak ✅ 🤩` (yes) or `nie ❌ 😢` (no)
- A collapsible list of all commercial Sundays for the current year (dynamically computed, not hardcoded)

---

## Tech Stack

| Layer          | Tool                                           |
| -------------- | ---------------------------------------------- |
| Framework      | Astro 6.x                                      |
| Language       | TypeScript (strict)                            |
| Date utilities | date-fns                                       |
| CSS            | Water.css 2 (bundled locally in `src/styles/`) |
| Tests          | Vitest                                         |
| Linting        | ESLint 10 (flat config) + eslint-plugin-astro  |
| Formatting     | Prettier 3 + prettier-plugin-astro             |
| Deployment     | Netlify (static output)                        |
| PWA            | site.webmanifest (standalone mode)             |

---

## Project Structure

```
czy-to-niedziela-handlowa/
├── src/
│   ├── pages/
│   │   └── index.astro              # Single page (static HTML shell + client <script>)
│   ├── lib/
│   │   ├── holidays.ts              # getEasterSunday() — Anonymous Gregorian algorithm
│   │   └── commercial-sundays.ts    # getCommercialSundays(), isCommercialSunday(), formatDate(), getNearestSunday()
│   └── styles/
│       └── water.css                 # Water.css dark theme, bundled locally
├── public/
│   ├── favicon.ico / favicon.svg / favicon-*.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-*.png
│   └── site.webmanifest              # PWA manifest
├── tests/
│   ├── holidays.test.ts             # getEasterSunday() — known correct dates
│   └── commercial-sundays.test.ts   # getCommercialSundays(), isCommercialSunday(), getNearestSunday(), formatDate()
├── astro.config.mjs                 # output: 'static'
├── tsconfig.json                    # extends astro/tsconfigs/strict
├── vitest.config.ts                 # test environment: node
├── eslint.config.mjs                # ESLint flat config
├── netlify.toml                     # build → dist/
└── package.json                     # scripts: dev, build, preview, check, lint, format, test, test:run
```

---

## Key Architecture Decision: Static Shell + Client Script

The app **must** read `new Date()` in the **browser** (not at build time). The approach:

1. Astro pre-renders a **static HTML shell** with loading placeholders (`Ładowanie...`)
2. A bundled `<script>` tag in `index.astro` runs in the browser, reads the real date, and fills in the DOM
3. This avoids baking in a build-time date (which would make the app wrong for all visitors after the build)

This is why there is no SSR — the computation is purely client-side.

---

## Business Logic

### Polish Commercial Sunday Rules (as of ~2022)

Per Polish law, there are exactly **7 commercial Sundays per year**:

| #   | Rule                                                        |
| --- | ----------------------------------------------------------- |
| 1   | Last Sunday of January                                      |
| 2   | Sunday before Easter (Palm Sunday)                          |
| 3   | Last Sunday of April                                        |
| 4   | Last Sunday of June                                         |
| 5   | Last Sunday of August                                       |
| 6   | Second-to-last Sunday of December before Christmas (Dec 25) |
| 7   | Last Sunday of December before Christmas (Dec 25)           |

**Verify law accuracy before adding tests** — the law may have changed as of 2026.

### Easter Calculation

Easter Sunday is computed using the **Anonymous Gregorian algorithm** in `src/lib/holidays.ts`. Pure math — no lookup tables or external data. Source: StackOverflow.

### Determining the Relevant Sunday

```
if today is Sunday → use today
else → use nextSunday(today) via date-fns
```

### December Edge Case

Fixed from the old double-`.pop()` mutation pattern. Now uses `.slice(-2)` to cleanly get the last two Sundays of December before Dec 25:

```typescript
const decemberSundaysBeforeChristmas = getSundaysForMonth(year, DECEMBER).filter((d) => d < christmasDay)
const lastTwoDecember = decemberSundaysBeforeChristmas.slice(-2)
```

---

## Scripts

```bash
npm run dev         # start Astro dev server
npm run build       # production build → /dist
npm run preview     # preview production build
npm run check       # Astro type checking
npm run lint        # ESLint (flat config)
npm run format      # Prettier
npm run test        # Vitest (watch mode)
npm run test:run    # Vitest (run once)
```

---

## Formatting / Style

- No semicolons
- Single quotes
- Trailing commas
- 120-character line width
- Spaces (no tabs)
- Strict TypeScript

---

## Deployment

- **Platform**: Netlify
- **Build command**: `npm run build`
- **Publish dir**: `dist/`
- **Config**: `netlify.toml`
- PWA-ready (installable, standalone display, dark theme via Water.css)

---

## Testing

18 tests covering:

- `getEasterSunday()` — verified against known correct dates (2023–2027, boundary years)
- `getCommercialSundays()` — correct count (7), correct dates for 2022 and 2026, sorted, December before Christmas
- `isCommercialSunday()` — true for commercial Sundays, false otherwise
- `getNearestSunday()` — returns today when Sunday, next Sunday otherwise
- `formatDate()` — Polish locale formatting

---

## ESLint Configuration Note

ESLint v10 flat config is used. Key gotcha: `tseslint.configs.recommended` includes a global `files: undefined` config that sets the TypeScript parser for ALL files, which overrides the Astro parser for `.astro` files. The current config works around this by:

1. Using `astroeslintparser.configs.recommended` first (which sets the Astro parser for `.astro` files)
2. Then adding TypeScript rules only for `**/*.ts` and `**/*.tsx` files with an explicit parser override

If you add new config entries, **do not spread `tseslint.configs.recommended` globally** — always pair it with an explicit `files` constraint.

---

## Known Issues / Technical Debt

1. **Law accuracy**: The 7-Sunday rule reflects law as of ~2022. Verify whether the rules have changed for 2026. Update `src/lib/commercial-sundays.ts` if needed, then update test assertions accordingly.

2. **No historical year support**: The app always shows the current year's Sundays. Could be extended with a year picker.

3. **No service worker**: Could add offline caching via `@astrojs/netlify` integration.

4. **Water.css from CDN originally**: Now bundled locally (`src/styles/water.css`), so no CDN dependency — good.

5. **No dark/light theme toggle**: Water.css dark theme is hardcoded. Could add a toggle.
