// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/robots', '@vite-pwa/nuxt', '@vueuse/nuxt', '@nuxtjs/i18n'],
  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    baseUrl: 'https://primitiveweightloss.netlify.app',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'de', language: 'de-DE', file: 'de.json' },
    ],
    // Use the device language when it's German, otherwise English.
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'en',
    },
  },
  site: {
    url: 'https://primitiveweightloss.netlify.app',
  },
  // Prerender the home page to a static file so the service worker can cache it for offline use
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
  pwa: {
    // Keep our own public/manifest.json (already linked in the head)
    manifest: false,
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,json}'],
      navigateFallback: '/',
    },
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Primitive Weight Loss App',
      meta: [
        { name: 'description', content: 'Primitive Weight Loss App' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'google-site-verification', content: '36jNV77pgN15JtNg5BRyAru1a58XqOkApZGfz2EAILQ' }
      ],
      link: [
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'icon', type: 'image/png', sizes: '256x256', href: '/logo-256x256.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ]
    }
  }
})
