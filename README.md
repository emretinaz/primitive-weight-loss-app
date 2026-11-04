# Primitive Weight Loss App 🥘

A tiny 24-hour fasting timer. Tap **"just 💩"**, watch the ring count down, and when the day is over, it's time to **Enjoy Your Meal**.

🌐 **Live:** [primitiveweightloss.netlify.app](https://primitiveweightloss.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/eeb97243-f6e0-48d1-b40a-4b08ee9462f6/deploy-status)](https://app.netlify.com/sites/primitiveweightloss/deploys)

> ⚠️ This is a web development playground, not dietary advice.

## ✨ Features

- ⏱️ Live countdown in `HH : MM : SS` with a circular progress ring
- 💾 Remembers your fast across page reloads (stored in `localStorage`)
- 📱 Installable as a standalone app (PWA manifest)

## 🧰 Stack

- [Nuxt 4](https://nuxt.com) (Vue 3, server-rendered)
- [Nuxt UI](https://ui.nuxt.com) 4 with Tailwind CSS 4
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
├── app.vue              # the whole app: UI, timer logic, styles
├── app.config.ts        # Nuxt UI theme (primary colour)
└── assets/css/main.css  # Tailwind and Nuxt UI imports
public/                  # icons and PWA manifest
nuxt.config.ts           # modules, CSS, page head
```

## 🌍 Deployment

Hosted on Netlify. Every push to the repository triggers a new deploy.
