<template>

    <div>
        <!-- V-APP es el root obligatorio para Vuetify -->
        
            
            
    <AppBar />

                <!-- HERO SECTION (Diseño 2 columnas como la imagen) -->
                <div class="bg-dark-base py-5">
                    <v-container>
                        <v-row v-if="loading">
                            <!-- Izquierda: portada del curso -->
                            <v-col cols="12" md="7">
                                <v-skeleton-loader type="image" height="410" class="rounded-lg" />
                            </v-col>

                            <!-- Derecha: info del curso -->
                            <v-col cols="12" md="5">

                                <!-- Título -->
                                <v-skeleton-loader type="heading" class="mb-4" />

                                <!-- Subtítulo -->
                                <v-skeleton-loader type="text" class="mb-2" />
                                <v-skeleton-loader type="text" class="mb-2" />
                                <v-skeleton-loader type="text" class="mb-6" />

                                <!-- Rating -->
                                <v-skeleton-loader type="text" width="40%" class="mb-6" />

                                <!-- Precio -->
                                <v-skeleton-loader type="text" width="30%" class="mb-6" />

                                <!-- Botón -->
                                <v-skeleton-loader type="button" height="48" class="rounded-lg" />

                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <!-- COLUMNA IZQUIERDA: VIDEO -->
                            <!-- Usamos md="8" para que el ancho sea generoso y el alto 16/9 sea tipo cine -->
                            <v-col cols="12" md="8">
                                <v-card class="rounded-lg overflow-hidden elevation-10 h-100" color="black">

                                    <!-- AQUI ESTÁ EL CAMBIO SOLICITADO: -->
                                    <!-- Usamos v-responsive 16/9 en lugar de min-height fijo de 580px -->
                                    <v-responsive :aspect-ratio="16 / 9" class="w-100">


                                        <!-- ESTADO 1: Video Reproduciendo -->
                                        <!-- Importante: w-100 h-100 para llenar el v-responsive -->
                                        <div v-if="curso?.url_video_intro" class="w-100 h-100">
                                         <iframe v-if="curso?.url_video_intro.includes('youtube.com')" :src="curso?.url_video_intro" class="w-100 h-100 border-0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Video Player" ></iframe>
                                        <VideoPlayer :src="curso?.url_video_intro" v-else />

                                        </div>
                                        <!-- ESTADO 2: Portada / Overlay -->
                                        <div v-else
                                            class="w-100 h-100 position-relative d-flex align-center justify-center">
                                            <!-- Imagen de fondo -->
                                            <v-img :src="curso?.imagen" cover class="w-100 h-100 opacity-60"
                                                gradient="to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)"></v-img>

                                            <!-- Botón Play Centrado -->
                                            <div class="position-absolute d-flex flex-column align-center"
                                                style="z-index: 2">
                                                <v-btn icon="mdi-play" size="x-large" color="primary"
                                                    class="mb-2 pulse-animation" elevation="6"
                                                    @click="videoPlaying = true"></v-btn>
                                                <span class="font-weight-bold text-white text-shadow">Vista
                                                    Previa</span>
                                            </div>
                                        </div>

                                    </v-responsive>
                                </v-card>
                            </v-col>

                            <!-- COLUMNA DERECHA: INFO Y COMPRA -->
                            <v-col cols="12" md="4">
                                <div class="pl-md-4">
                                    <h1 class="course-title mb-2 text-white">
                                        {{ curso?.titulo }}
                                    </h1>
                                    <p class="text-grey-lighten-1 mb-4 text-body-2">
                                        {{ curso?.descripcion }}
                                    </p>

                                    <!-- Rating y Autor -->
                                    <div class="d-flex align-center mb-6">
                                        <span class="text-caption font-weight-bold mr-4 text-primary">{{ curso?.autor
                                            }}</span>

                                        <v-rating :model-value="4.8" color="amber" density="compact" half-increments
                                            readonly size="small"></v-rating>
                                        <span class="text-caption text-grey ml-1">(1.5K Reseñas)</span>
                                    </div>

                                    <v-divider class="mb-6 border-opacity-25"></v-divider>

                                    <!-- Precio -->
                                    <div class="d-flex align-end mb-4" v-if="cursoActual?.buyed !== true">
                                        <span class="price-tag lh-3 mr-3">COP {{  formatCOP(curso?.precio_actual) }}</span>
                                        <span class="old-price mb-2">{{ formatCOP(curso?.precio_anterior) }}</span>
                                    </div>

                                    <!-- Botones de Acción -->
                                    <WompiPayBtn v-if="cursoActual?.buyed !== true"
                                        :curso="curso"
                                        />
                                    <v-btn v-else color="green darken-2" class="text-white font-weight-bold" block size="x-large"
                                        @click="playLesson(curso?.contenido[0]?.lessons[0], curso)">
                                        Continuar Curso
                                    </v-btn>


                                    <div class="d-flex justify-space-between text-caption text-grey mt-4">
                                        <span class="d-flex align-center"><v-icon size="small"
                                                class="mr-1">mdi-clock-outline</v-icon> {{ curso?.duracion }}</span>
                                        <span class="d-flex align-center"><v-icon size="small"
                                                class="mr-1">mdi-all-inclusive</v-icon> Acceso de por vida</span>
                                        <span class="d-flex align-center"><v-icon size="small"
                                                class="mr-1">mdi-certificate</v-icon> Certificado</span>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>

                <!-- SECCIÓN DE CONTENIDO (TABS) -->
                <v-container class="mt-4 mb-16">
                    <!-- Tabs Navigation -->
                    <div class="mb-6 border-b border-opacity-10">
                        <v-tabs v-model="tab" bg-color="transparent" color="primary" align-tabs="start" class="mb-0">
                            <v-tab value="temario" class="text-capitalize font-weight-bold"><v-icon
                                    start>mdi-book-open-variant</v-icon> Temario</v-tab>
                            <v-tab value="aprenderas" class="text-capitalize font-weight-bold"><v-icon
                                    start>mdi-check-circle-outline</v-icon> Aprenderás</v-tab>
                            <v-tab value="resenas" class="text-capitalize font-weight-bold"><v-icon
                                    start>mdi-star-outline</v-icon> Reseñas</v-tab>
                            <v-tab value="incluye" class="text-capitalize font-weight-bold"><v-icon
                                    start>mdi-gift-outline</v-icon> Incluye</v-tab>
                        </v-tabs>
                    </div>

                    <v-window v-model="tab">

                        <!-- TAB TEMARIO (ACORDEONES) -->
                        <v-window-item value="temario">

                            <div class="d-flex justify-space-between align-center mb-4">
                                <h3 class="text-h6 font-weight-bold text-primary">{{ curso?.totalLecciones }} Lecciones
                                    en {{ curso?.contenido?.length }} Módulos</h3>
                                <v-btn variant="text" size="small" color="grey" @click="expandAll">Expandir todo</v-btn>
                            </div>

                            <v-expansion-panels variant="accordion" v-model="panel" multiple>
                                <v-expansion-panel v-for="(module, i) in curso?.contenido" :key="i" elevation="0"
                                    class="mb-2 rounded border-thin">
                                    <v-expansion-panel-title class="py-3">
                                        <div class="d-flex flex-column align-start">
                                            <span class="font-weight-bold text-subtitle-1">{{ module.title }}</span>
                                            <span class="text-caption text-grey">{{ module.lessons.length }}
                                                Lecciones</span>
                                        </div>
                                    </v-expansion-panel-title>

                                    <v-expansion-panel-text>
                                        <v-list density="compact" bg-color="transparent">
                                            <v-list-item v-for="(lesson, j) in module.lessons" :key="j" class="px-2"
                                                link
                                                @click="lesson.isFree || cursoActual?.buyed ? playLesson(lesson, curso) : toggleLogin()">
                                                <template v-slot:prepend>
                                                    <v-icon
                                                        :icon="lesson.isFree || cursoActual?.buyed ? 'mdi-play-circle-outline' : 'mdi-lock-outline'"
                                                        size="small" :color="lesson.isFree || cursoActual?.buyed ? 'yellow' : 'red lighten-1'"
                                                        class="mr-3"></v-icon>
                                                </template>

                                                <v-list-item-title class="text-body-2 text-grey-lighten-2">
                                                    {{ i + 1 }}. {{ lesson.title }}
                                                </v-list-item-title>

                                                <template v-slot:append>
                                                     <v-icon
                                                        :icon="'mdi-clock-outline'"
                                                        size="small" :color="'yellow darken-2'"
                                                        class="mr-1"></v-icon><span class="text-caption text-yellow darken-2">{{ lesson.duration
                                                        }}</span>
                                                </template>
                                            </v-list-item>
                                        </v-list>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-window-item>

                        <!-- TAB APRENDERÁS -->
                        <v-window-item value="aprenderas">
                            <v-row>
                                <v-col cols="12" md="6" v-for="n in 6" :key="n">
                                    <v-sheet class="bg-dark-surface pa-4 rounded border-thin d-flex">
                                        <v-icon color="primary" class="mr-3 mt-1">mdi-check</v-icon>
                                        <p class="text-body-2 ma-0 text-grey-lighten-1">
                                            Aprenderás a configurar un entorno profesional con VSCode, ESLint y Prettier
                                            desde cero.
                                        </p>
                                    </v-sheet>
                                </v-col>
                            </v-row>
                        </v-window-item>

                    </v-window>
                </v-container>
            

            <!-- FOOTER STICKY (COMO EN LA IMAGEN) -->
            <!-- Solo visible si la pantalla es pequeña o si queremos que esté siempre fijo abajo -->
            <div class="sticky-purchase-bar py-3 px-4">
                <v-container class="py-0 mb-10">
                    <v-row align="center" justify="space-between">
                        <!-- Left: Info del curso (Oculto en móvil) -->
                        <v-col cols="0" md="6" class="d-none d-md-flex flex-column">
                            <span class="font-weight-bold text-white text-truncate">{{ cursoActual?.titulo }}</span>
                            <div class="d-flex align-center">
                                <span class="text-caption text-primary font-weight-bold mr-1">4.8</span>
                                <v-rating :model-value="4.8" color="amber" density="compact" size="x-small"
                                    readonly></v-rating>
                                <span class="text-caption text-grey ml-2">(1.5K estudiantes)</span>
                            </div>
                        </v-col>

                        <!-- Right: Precio y Botones -->
                        <v-col cols="12" md="6" class="d-flex align-center justify-end">
                            <div class="d-flex flex-column align-end mr-4" v-if="cursoActual?.buyed !== true">
                                <span class="text-h6 font-weight-bold text-green lh-1">{{ formatCOP(cursoActual?.precio_actual|| 0) }}</span>
                                <span class="text-h8 text-green">USD {{ cursoActual?.precio_actual>0?formatCOP(copToUsd(cursoActual?.precio_anterior|| 0)):'Gratis' }}</span>
                            </div>

                            

                            <WompiPayBtn v-if="!loading && cursoActual?.buyed !== true" 
                                :curso="cursoActual"
                                />
                            <v-btn v-else color="green darken-2" class="text-white font-weight-bold"
                                 @click="playLesson(curso?.contenido[0]?.lessons[0], curso)">
                                {{ cursoActual?.buyed === true ? 'Continuar curso' : 'Cargando...' }}
                            </v-btn>
                            
                        </v-col>
                    </v-row>
                </v-container>
            </div>

       
    </div>
</template>
<style>
/* Globales */
body {
    font-family: 'Inter', sans-serif;
    background-color: #0f1115;
    color: #ffffff;
}

/* Utilidades Personalizadas que imitan clases de Tailwind/CSS moderno */
.text-accent {
    color: #00E676 !important;
}

.bg-dark-base {
    background-color: #0f1115 !important;
}

.bg-dark-surface {
    background-color: #1a1d21 !important;
}

/* Estilo específico para los paneles de expansión (Acordeón) */
.v-expansion-panel {
    background-color: #1a1d21 !important;
    border: 1px solid #2d3238;
}

.v-expansion-panel-title {
    font-weight: 600;
    color: #fff;
}

.v-expansion-panel-text__wrapper {
    padding: 0 !important;
}

/* Botón Sticky Flotante */
.sticky-purchase-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #1a1d21;
    border-top: 1px solid #2d3238;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
}

/* Ajustes de tipografía para parecerse a la imagen */
.course-title {
    font-size: 2rem;
    line-height: 1.1;
    font-weight: 800;
    letter-spacing: -0.5px;
}

.price-tag {
    font-size: 2.5rem;
    font-weight: 700;
    color: #00E676;
}

.old-price {
    text-decoration: line-through;
    color: #6c757d;
    font-size: 1.1rem;
}
</style>

<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'
// Estado Reactivo
const tab = ref('temario')
const panel = ref([0]) // El primer módulo abierto por defecto

// NUEVO: Estado para controlar el video
const videoPlaying = ref(false)


const expandAll = () => {
    // Lógica simple para expandir todos los paneles
    panel.value = curso.value.contenido.map((_, index) => index)
}



const showLoginModal = useLoginModal();
const currentSession = useSession();
const error = ref('')
const cursoActual = ref(null)
const route = useRoute()
const loading = ref(false);
const token = ref('')
const token_type = ref('')

function toggleLogin() {
    showLoginModal.value = !showLoginModal.value;
}
const getCourse = async (url) => {
    loading.value = true
    error.value = ''
    try {
        token.value = localStorage.getItem('token') || ''
        token_type.value = localStorage.getItem('token_type') || ''
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `${token_type.value || 'Bearer'} ${token.value || 'xy'}`
            }
        })

        cursoActual.value = data.data;
    } catch (err) {

        error.value = err.response?.data?.message || 'Intenta nuevamente'
        push.error({ title: 'Upps!', message: error.value, duration: 3000 })

    } finally {
        loading.value = false

    }
}

function playLesson(lesson, course) {
    if (lesson) {
        navigateTo('/lesson/' + lesson.title.toLowerCase().replace(/\s+/g, '-') + '/' + lesson.id + '/' + course.titulo.toLowerCase().replace(/\s+/g, '-') + '/' + course.id)
    } else {
        push.error({ title: 'Error', message: 'Curso no encontrado', duration: 3000 })
    }
}

definePageMeta({ layout: false })


onMounted(() => {
    // Crear un <script> dinámicamente para Particles.js
    const courseId = route.params.slug[0];
    if (courseId > 0 && !isNaN(courseId)) {
        getCourse(URL_BASE_API + '/v1/public/courses/' + courseId)
    } else {
        push.error({ title: 'Upps!', message: 'ID de curso inválido', duration: 3000 })
        navigateTo('/')

    }
  
    window.addEventListener("keydown", (e) => {
        if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C" || e.key === "J")) ||
            (e.ctrlKey && e.key === "U")
        ) {
            e.preventDefault()
            e.stopPropagation()
        }
    })

})

const curso = computed(() => {
    const data = cursoActual.value

    if (!data) return null
    return {
        ...data,
        totalLecciones: data.contenido?.reduce(
            (suma, modulo) => suma + (modulo.lessons?.length || 0),
            0
        ) || 0
    }
})

const formatCOP = n => new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
}).format(n);

// Formatear dólares con 2 decimales
const formatUSD = n => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(n);

// Conversión simple (ej: tasa 1 USD = 4500 COP)
const copToUsd = (cop) => cop / 4000;
</script>