# PWA Install Demo

A minimal Next.js app that demonstrates how to add an **"Install App"** button — the same mechanism Brave/Chrome use to let you install YouTube as a desktop app.

**No extra dependencies required** — just Next.js, React, and a hand-written service worker.

## Quick start

```bash
npm install
npm run build && npm run start
```

Then open http://localhost:3000 in Chrome, Edge, or Brave. You should see the **Install App** button — click it to install the site as a standalone desktop app.

> The install flow only works over HTTPS (or localhost). `npm run dev` works too, but the service worker registration only takes effect in production builds.

## How it works

1. **`public/manifest.json`** — The web app manifest tells the browser the app's name, icons, start URL, and that it should open in a standalone window (`"display": "standalone"`).
2. **`public/sw.js`** — A minimal hand-written service worker (no `next-pwa` needed). Does basic offline caching of the app shell. Required for install eligibility.
3. **`app/_components/ServiceWorkerRegister.tsx`** — Registers the service worker on the client.
4. **`app/_components/InstallButton.tsx`** — Captures the `beforeinstallprompt` event and triggers the install dialog from a custom button click.

## Project structure

```
├── app/
│   ├── _components/
│   │   ├── InstallButton.tsx           ← install button + beforeinstallprompt logic
│   │   └── ServiceWorkerRegister.tsx   ← registers /sw.js
│   ├── globals.css
│   ├── layout.tsx                      ← links manifest + theme color + SW register
│   └── page.tsx
├── public/
│   ├── icons/
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── icon-512-maskable.png
│   ├── manifest.json                  ← web app manifest
│   └── sw.js                           ← minimal service worker (no next-pwa)
├── next.config.js                      ← plain Next.js config (no PWA plugin)
├── package.json                        ← only next, react, react-dom
└── tsconfig.json
```

## Requirements

- HTTPS (localhost works for testing)
- Chrome, Edge, or Brave (Firefox doesn't support desktop PWA install)
- Service worker + web manifest + icons (all included)
