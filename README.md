# Ramarao Iragavarapu — Portfolio

Aurora Glass portfolio site. Built with Vite + React + TypeScript.

## Run locally

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Deploying

The site is a static SPA — any static host will work. Pre-configured for Vercel and Netlify.

### Option A — Vercel (recommended, ~3 min)

1. Push this `app/` folder (or the whole repo with `app/` as a subdirectory) to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. If `app/` is a subdirectory: in the Vercel project settings, set **Root Directory** to `app`.
4. Vercel auto-detects Vite via `vercel.json`. Click **Deploy**. You'll get a URL like
   `ramarao-portfolio.vercel.app`.

To use a custom domain, add it under **Settings → Domains** in your Vercel project.

### Option B — Netlify

1. Push to GitHub the same way.
2. https://app.netlify.com/start → connect your repo.
3. If `app/` is a subdirectory, set **Base directory** to `app`. Build command and publish dir
   are read from `netlify.toml`.
4. Click **Deploy site**. You'll get a URL like `ramarao-portfolio.netlify.app`.

### Option C — Drag-and-drop (zero git)

```bash
npm run build
```

Then drag the generated `dist/` folder onto https://app.netlify.com/drop. You get a URL instantly,
no GitHub required.

## Project layout

```
app/
├── public/
│   ├── favicon.svg
│   └── headshot.jpg          # swap with your photo (any name; update src in Hero.tsx)
├── src/
│   ├── components/           # one file per section
│   ├── App.tsx               # composes the page
│   ├── main.tsx              # React entry
│   ├── data.ts               # all copy + portfolio data — edit me
│   └── index.css             # the entire Aurora stylesheet
├── index.html
├── vite.config.ts
├── tsconfig.json
├── vercel.json               # Vercel config
└── netlify.toml              # Netlify config
```

## Editing content

All text, projects, experience, certifications, testimonials, etc. live in `src/data.ts`.
Tweak there and the whole site updates.

To swap the photo: drop a new image into `public/` and update the `<img src="/headshot.jpg" />`
in `src/components/Hero.tsx`.
