// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'Primitive Weight Loss App', 
      meta: [
        { name: 'description', content: 'Primitive Weight Loss App' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'manifest', href: '/manifest.json' },
      ]
    }
  }
})
