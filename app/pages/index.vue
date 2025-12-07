<template>
    <div  class="position-relative" :class="{ 'blurred': showLoginModal }">
    <div class="blob blob-blue top-right"></div>
    <div class="blob blob-cyan bottom-left"></div>
<AppBar/>
      
      <v-container class=" pb-10 position-relative" >
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="7">
            <v-chip
              variant="outlined"
              color="cyan-accent-2"
              class="mb-6 font-weight-bold"
              style="border-color: #18FFFF;">
              <v-icon start icon="mdi-code-braces" size="small"></v-icon>
              Nuevos cursos disponibles
            </v-chip>

            <h1 class="text-h3 text-sm-h1 font-weight-black mb-4 lh-tight">
              Deja de copiar tutoriales.
              <br />
              <span class="gradient-text">Conviértete en Dev Top 1%.</span>
            </h1>
            
            <p class="text-h6 text-grey-lighten-1 mb-8 font-weight-light" style="max-width: 600px; line-height: 1.5;">
              Soy <strong>Chris Gamez</strong>. Te enseño a construir aplicaciones escalables</p>

            <div class="d-flex flex-wrap gap-4">
              <nuxt-link to="/cursos" class="btn-link mr-4">
                    <v-btn
                        size="x-large"
                        variant="elevated"
                        append-icon="mdi-arrow-right"
                    >
                        Ver Cursos
                    </v-btn>
                </nuxt-link>

              
              <v-btn
                variant="outlined"
                color="white"
                size="x-large"
                class="px-8"
                prepend-icon="mdi-discord"
              >
                Únete al Discord
              </v-btn>
            </div>

            <div class="d-flex align-center mt-10 text-grey-darken-1">
              <v-avatar-group max="4">
                <v-avatar size="40" image="https://placehold.co/100x100/111/fff?text=U1"></v-avatar>
                <v-avatar size="40" image="https://placehold.co/100x100/222/fff?text=U2"></v-avatar>
                <v-avatar size="40" image="https://placehold.co/100x100/333/fff?text=U3"></v-avatar>
              </v-avatar-group>
              <div class="ml-4 text-caption font-weight-bold">
                +5,000 estudiantes programando hoy
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="5" class="d-none d-md-block position-relative">
            <div class="image-frame">
              <v-img
                src="https://revistachoco.com.co/wp-content/uploads/2024/06/china1-768x1024.jpg"
                alt="Chris Gamez"
                cover
                class="rounded-xl"
              ></v-img>
              <v-card class="floating-card pa-4 rounded-lg mb-3" elevation="10" theme="dark" style="height: auto;">
                <div class="d-flex align-center gap-3">
                  <v-icon color="green-accent-3" icon="mdi-check-decagram"></v-icon>
                  <div>
                    <div class="text-caption text-grey">Estado</div>
                    <div class="font-weight-bold">Mentorías en Vivo</div>
                  </div>
                </div>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <div class="border-y border-grey-darken-3 bg-black py-8 my-10">
        <v-container>
          <p class="text-center text-overline text-grey mb-6">Dominamos las tecnologías que pagan bien</p>
          <v-row justify="center" align="center" class="opacity-70 grayscale-logos text-h4 font-weight-bold text-grey-darken-2">
            <v-col class="text-center">VUE.JS</v-col>
            <v-col class="text-center">REACT</v-col>
            <v-col class="text-center">NODE</v-col>
            <v-col class="text-center">PYTHON</v-col>
            <v-col class="text-center">AWS</v-col>
          </v-row>
        </v-container>
      </div>

      <v-container class="py-16">
        <v-row>
          <v-col cols="12" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-2">
              No vendo humo. <span class="text-blue-accent-3">Vendo código.</span>
            </h2>
            <div class="mx-auto mt-4" style="width: 60px; height: 4px; background: #2979FF;"></div>
          </v-col>
        </v-row>
        
        <v-row class="mt-12" align="stretch">
          <v-col cols="12" md="4">
            <v-card class="h-100 bg-grey-darken-4 pa-6 rounded-xl border-highlight hover-scale" variant="flat">
              <v-icon color="cyan-accent-3" size="48" class="mb-4">mdi-laptop-account</v-icon>
              <h3 class="text-h5 font-weight-bold mb-3">100% Práctico</h3>
              <p class="text-grey-lighten-1">
                Adiós a la teoría infinita. Aquí construimos clones de Spotify, E-commerce reales y Dashboards desde el día 1.
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
             <v-card class="h-100 bg-grey-darken-4 pa-6 rounded-xl border-highlight hover-scale" variant="flat">
              <v-icon color="blue-accent-3" size="48" class="mb-4">mdi-fire</v-icon>
              <h3 class="text-h5 font-weight-bold mb-3">Sin Relleno</h3>
              <p class="text-grey-lighten-1">
                Mis videos están editados para respetar tu tiempo. Lo que otros explican en 20 minutos, yo te lo explico en 5.
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
             <v-card class="h-100 bg-grey-darken-4 pa-6 rounded-xl border-highlight hover-scale" variant="flat">
              <v-icon color="purple-accent-3" size="48" class="mb-4">mdi-account-group</v-icon>
              <h3 class="text-h5 font-weight-bold mb-3">Comunidad Privada</h3>
              <p class="text-grey-lighten-1">
                Acceso a mi Discord privado. Networking real, ofertas de trabajo exclusivas y ayuda cuando te atascas.
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="py-16">
        <div class="d-flex justify-space-between align-end mb-10">
          <div>
            <div class="text-overline text-cyan-accent-3 font-weight-bold">Librería Premium</div>
            <h2 class="text-h4 font-weight-bold">Cursos Más Vendidos</h2>
          </div>
          <v-btn variant="text" color="white" append-icon="mdi-arrow-right">Ver todos</v-btn>
        </div>

        <v-row>
          <v-col cols="12" md="6" lg="4">
            <v-card class="rounded-lg bg-surface" elevation="10">
              <v-img
                src="https://placehold.co/600x350/111/2962FF?text=Master+Backend"
                height="200"
                cover
              >
                <v-chip color="orange" size="small" class="ma-3 font-weight-bold">Bestseller</v-chip>
              </v-img>
              <v-card-text class="pa-5">
                <div class="text-caption text-grey mb-1">Node.js & Microservicios</div>
                <h3 class="text-h6 font-weight-bold mb-2">Backend Masterclass 2024</h3>
                <p class="text-grey mb-4 text-body-2 line-clamp-2">
                  Aprende a crear APIs escalables que soporten millones de usuarios. Docker, Kubernetes y AWS incluidos.
                </p>
                <v-divider class="mb-4"></v-divider>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-h6 font-weight-black">$19.99</div>
                  <v-btn color="blue-darken-2" variant="flat" size="small">Ver Detalles</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <v-card class="rounded-lg bg-surface" elevation="10">
              <v-img
                src="https://placehold.co/600x350/111/00B8D4?text=Frontend+Pro"
                height="200"
                cover
              >
                <v-chip color="cyan" size="small" class="ma-3 font-weight-bold">Nuevo</v-chip>
              </v-img>
              <v-card-text class="pa-5">
                <div class="text-caption text-grey mb-1">Vue 3 & Tailwind</div>
                <h3 class="text-h6 font-weight-bold mb-2">Frontend de Alto Nivel</h3>
                <p class="text-grey mb-4 text-body-2 line-clamp-2">
                  Deja de hacer webs feas. Aprende diseño de sistemas, animaciones avanzadas y gestión de estado compleja.
                </p>
                <v-divider class="mb-4"></v-divider>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-h6 font-weight-black">$24.99</div>
                  <v-btn color="cyan-darken-2" variant="flat" size="small">Ver Detalles</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

           <v-col cols="12" md="6" lg="4">
            <v-card class="rounded-lg bg-surface" elevation="10">
              <v-img
                src="https://placehold.co/600x350/111/6200EA?text=React+Native"
                height="200"
                cover
              >
              </v-img>
              <v-card-text class="pa-5">
                <div class="text-caption text-grey mb-1">Mobile Development</div>
                <h3 class="text-h6 font-weight-bold mb-2">React Native: Zero to Hero</h3>
                <p class="text-grey mb-4 text-body-2 line-clamp-2">
                  Crea aplicaciones para iOS y Android con una sola base de código. Publica en tiendas reales.
                </p>
                <v-divider class="mb-4"></v-divider>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-h6 font-weight-black">$19.99</div>
                  <v-btn color="deep-purple-darken-2" variant="flat" size="small">Ver Detalles</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="py-16">
        <v-card class="gradient-border-card rounded-xl pa-1" theme="dark">
            <div class="bg-grey-darken-4 rounded-xl pa-10 text-center">
                <v-icon color="grey-darken-2" size="60" class="mb-6">mdi-format-quote-close</v-icon>
                <h3 class="text-h5 text-md-h4 font-weight-medium mb-6 font-italic">
                  "Gracias a los cursos de Chris, pasé de trabajar en soporte técnico a ser
                  <span class="text-cyan-accent-3">Mid-Level Developer</span> en 8 meses. 
                  La mejor inversión que he hecho."
                </h3>
                <div class="d-flex justify-center align-center gap-3">
                    <v-avatar image="https://placehold.co/100x100?text=Student"></v-avatar>
                    <div class="text-left">
                        <div class="font-weight-bold">Carlos M.</div>
                        <div class="text-caption text-grey">Frontend Dev @ TechCompany</div>
                    </div>
                </div>
            </div>
        </v-card>
      </v-container>

      <v-container class="py-16 text-center">
        <h2 class="text-h3 font-weight-black mb-6">
          ¿Listo para subir de nivel?
        </h2>
        <p class="text-body-1 text-grey mb-8">
          Únete a la newsletter y recibe gratis mi ebook "5 Patrones de React que debes conocer".
        </p>
        
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-text-field
                    variant="solo-filled"
                    placeholder="Tu mejor email..."
                    rounded="pill"
                    bg-color="grey-darken-3"
                    append-inner-icon="mdi-send"
                    height="60"
                >
                    <template v-slot:append-inner>
                        <v-btn color="blue-accent-4" rounded="pill" class="text-capitalize">Suscribirse</v-btn>
                    </template>
                </v-text-field>
            </v-col>
        </v-row>
      </v-container>

      <v-spacer class="py-10"></v-spacer>
      
    </div>
</template>

<script setup>
import { getDate } from 'vuetify/lib/labs/VCalendar/util/timestamp.mjs';

// Lógica mínima requerida
const showLoginModal = useLoginModal();
function toggleLogin() {
  showLoginModal.value = !showLoginModal.value;
}
</script>

<style scoped>
/* ESTILOS PERSONALIZADOS PARA CHRIS GAMEZ */

/* Texto con Gradiente Azul/Cyan */
.gradient-text {
  background: linear-gradient(90deg, #2979FF 0%, #00E5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Bolas de luz ambiental */
.blob {
    position: fixed;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
}
.blob-blue {
    background: #2962FF;
    top: -150px;
    right: -100px;
}
.blob-cyan {
    background: #00B8D4;
    bottom: -150px;
    left: -100px;
}

/* Efecto de imagen del Hero */
.image-frame {
    position: relative;
    padding: 10px;
    border: 1px solid rgba(41, 121, 255, 0.3);
    border-radius: 24px;
    background: rgba(41, 121, 255, 0.05);
}

.floating-card {
    position: absolute;
    bottom: 40px;
    left: -30px;
    backdrop-filter: blur(10px);
    background: rgba(30, 30, 30, 0.8) !important;
    border: 1px solid rgba(255,255,255,0.1);
    animation: float 4s ease-in-out infinite;
}

@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
}

/* Tarjetas de Beneficios */
.border-highlight {
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
}
.hover-scale:hover {
    transform: translateY(-5px);
    border-color: #2979FF;
    box-shadow: 0 10px 30px rgba(41, 121, 255, 0.15);
}

/* Tarjeta con Borde Gradiente */
.gradient-border-card {
    background: linear-gradient(45deg, #2979FF, #00E5FF);
}

/* Logos en escala de grises */
.grayscale-logos {
    filter: grayscale(100%);
    opacity: 0.5;
}

/* Utilidades de texto */
.lh-tight {
    line-height: 1.1;
}
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>