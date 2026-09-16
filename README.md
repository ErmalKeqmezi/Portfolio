# Ermal Keqmezi — Portfolio

Personal portfolio site built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Dark-mode-first design with a light/dark toggle (persisted, respects system preference)
- Smooth-scroll single-page navigation with a sliding active-section indicator
- Scroll-triggered fade/slide-in animations, staggered for lists and cards
- Ambient animated background (aurora glow, grain texture, floating accents) with subtle scroll parallax
- Custom cursor with contextual hover labels and a lightweight spark trail
- A hidden interactive terminal easter egg (bottom-right `</>` icon) — try `whoami`, `skills`, `projects`, `contact`, `help`
- Fully responsive, keyboard-accessible, and respects `prefers-reduced-motion` throughout

## Project structure

```
public/               static assets (photo, résumé PDF, project screenshots, favicon)
src/
  components/         one component per UI piece (Nav, Hero, Projects, Terminal, ...)
  hooks/               useTheme, useActiveSection, useReveal
  data.ts              all site content (projects, education, skills, contact info)
  index.css            design tokens + all custom CSS (Tailwind directives + hand-written styles)
  App.tsx              page composition
  main.tsx             React entry point
```

## Run locally

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

The build output goes to `dist/`.

## Deploy

### Vercel

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy.

### Netlify

1. Push this repo to GitHub.
2. New site from Git at [app.netlify.com](https://app.netlify.com/).
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy.

## Updating content

All personal content (projects, education, skills, contact details) lives in [`src/data.ts`](src/data.ts) — edit that file rather than the components to update copy.

To swap the profile photo, résumé, or project screenshots, replace the matching files in `public/` (same filenames) or update the paths in `src/data.ts` / `src/components/Hero.tsx`.
