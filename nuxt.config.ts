import { defineNuxtConfig } from "nuxt/config";
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,  
    target: 'static', 
    nitro: {
        preset: 'static'
    },
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    app: {
        pageTransition: { name: "page", mode: "out-in" },
        head: {
    title: "CHRIS GÁMEZ - CURSOS DE PROGRAMACIÓN",
    meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },

        // ⭐ SEO PRINCIPAL
        {
            hid: "description",
            name: "description",
            content:
                "Chris Gámez Cursos: aprende programación desde cero con clases claras, prácticas y sin complicaciones. Domina Python, Laravel, Vue.js, FastAPI y más."
        },

        // ⭐ OPEN GRAPH (para compartir en Facebook / WhatsApp)
        {
            hid: "og:title",
            property: "og:title",
            content: "Chris Gámez - Cursos de Programación"
        },
        {
            hid: "og:description",
            property: "og:description",
            content:
                "Cursos prácticos y claros para aprender programación: Python, Laravel, Vue.js, FastAPI y tecnologías actuales."
        },
        {
            hid: "og:image",
            property: "og:image",
            content: "/image.png" // desde /public o /assets
        },
        {
            hid: "og:type",
            property: "og:type",
            content: "website"
        },

        // ⭐ TWITTER CARDS
        {
            hid: "twitter:card",
            name: "twitter:card",
            content: "summary_large_image"
        },
        {
            hid: "twitter:title",
            name: "twitter:title",
            content: "Chris Gámez - Cursos de Programación"
        },
        {
            hid: "twitter:description",
            name: "twitter:description",
            content:
                "Aprende programación paso a paso con cursos claros y prácticos: Python, Laravel, Vue.js, FastAPI y más."
        },
        {
            hid: "twitter:image",
            name: "twitter:image",
            content: "/image.png"
        }
    ],

    link: [
        {
            rel: "icon",
            type: "image/png",
            href: "/image.png" // funciona en todas las rutas
        },
                // Bulma
                {
                    //rel: "stylesheet",
                   // href: "https://cdn.tailwindcss.com",
                },
                // Material Icons
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/icon?family=Material+Icons",
                },
                {
                    //rel: "stylesheet",
                    //href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap",
                },
                {
                   // rel: "stylesheet",
                    //href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
                },
                // Google Fonts Poppins
                {
                    //rel: "stylesheet",
                   // href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap",
                },
            ],
            script: [
                // Particles.js
                //{ src: 'https://www.google.com/recaptcha/api.js', defer: true,async:true }
            ],
        },
    },
    modules: ["notivue/nuxt", 'nuxt-vue3-google-signin'],
    googleSignIn: {
        clientId: '258719388133-rhtg60fgf2nkbutnco8o02nbbefd9u0d.apps.googleusercontent.com',
    },
    notivue: {
        position: "middle-right",
        limit: 4,
        enqueue: true,
        avoidDuplicates: true,
        notifications: {
            global: {
                duration: 4000,
            },
        },
    },
    css: [
        "notivue/notification.css", // Only needed if using built-in <Notification />
        "notivue/animations.css", // Only needed if using default animations
        "~/assets/css/main.css"
    ],
    build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [
      vuetify({ autoImport: true,}),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
    
});
