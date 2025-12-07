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
            title: "Academia Cristal - Aprende y Crece Con Nosotros",
            meta: [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
            ],
            link: [
                { rel: "icon", type: "image/x-icon", href: "images/icono.png" },
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
