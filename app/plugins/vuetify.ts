// plugins/vuetify.ts
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          colors: {
            primary: '#00B894',   // Verde Nuxt
            secondary: '#2D3436',
            accent: '#616161',
            info: '#0984E3',
            success: '#00B894',
            warning: '#FDCB6E',
            error: '#D63031',
          },
        },
      },
    },
    defaults: {
      VCard: {
        elevation: 4,        // Siempre con sombra
        rounded: 'lg',
        height: 260,         // 🔥 Altura fija para que todos los cards queden iguales
      },
      VBtn: {
        color: 'primary',
        rounded: 'lg',
      },
    },
  })

  app.vueApp.use(vuetify)
})
