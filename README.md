# Primitive Weight Loss App 🥘

A tiny fasting timer. Tap **"just 💩"**, watch the ring count down, and when the fast is over, it's time to **Enjoy Your Meal**.

🌐 **Live:** [primitiveweightloss.netlify.app](https://primitiveweightloss.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/eeb97243-f6e0-48d1-b40a-4b08ee9462f6/deploy-status)](https://app.netlify.com/sites/primitiveweightloss/deploys)

> ⚠️ This is a web development playground, not dietary advice.

## ✨ Features

- ⏱️ Live countdown in `HH : MM : SS` with a circular progress ring
- 🍽️ Choose a fast length: 16:8, 20:4 or 24 hours (⚙️ settings at the bottom of the page)
- 💾 Remembers your fast across page reloads (stored in `localStorage`)
- 🧭 Start prompt for first-time visitors
- 📲 Installable: an **Install app** button on Chromium browsers, and an **Add to Home Screen** hint on iPhone and iPad
- 🔌 Service worker caches the app for offline use

## 🧰 Stack

- [Nuxt 4](https://nuxt.com) (Vue 3, server-rendered)
- [Nuxt UI](https://ui.nuxt.com) 4 (Tailwind CSS 4 runs underneath it)
- [VueUse](https://vueuse.org) for the clock tick
- [`@vite-pwa/nuxt`](https://vite-pwa-org.netlify.app/frameworks/nuxt) for the service worker
- Node.js 24 (see `.nvmrc`)

## 🚀 Getting started

```bash
nvm use            # picks up Node 24 from .nvmrc
npm install
npm run dev        # http://localhost:3000
```

## 📦 Scripts

| Command           | What it does                     |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the dev server             |
| `npm run build`   | Production build into `.output/` |
| `npm run preview` | Preview the production build     |
| `npm run generate`| Pre-render a static site         |

## 🗂️ Project layout

```
app/
├── app.vue                      # the page: layout, settings, install button, styles
├── app.config.ts                # Nuxt UI theme (primary colour)
├── assets/css/main.css          # Tailwind and Nuxt UI imports
└── composables/
    ├── useFastingTimer.ts       # timer state, computed from the stored start time
    ├── useFastSettings.ts       # fast length setting (16:8, 20:4, 24h)
    └── usePwaInstall.ts         # install prompt and iOS hint
public/                  # icons and PWA manifest
nuxt.config.ts           # modules, CSS, page head
```

## 🌍 Deployment

Hosted on Netlify at [primitiveweightloss.netlify.app](https://primitiveweightloss.netlify.app/).
