<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import confetti from "canvas-confetti";

const route = useRoute()
// --- ESTADO Y DATOS ---

// Control de modo teatro (Video expandido)
const isTheaterMode = ref(false)

// Control de módulos abiertos en el sidebar (Array de IDs o Títulos)
const openedModules = ref([])

// Lección actual en visualización
const currentLesson = ref()
const showLoginModal = useLoginModal();
const currentSession = useSession();
const error = ref('')
const loading = ref(false)
const cursoActual = ref(null)
const videoUrl = ref('')
// --- COMPUTED ---
import MarkdownIt from "markdown-it"
const md = new MarkdownIt()
function toggleLogin() {
  showLoginModal.value = !showLoginModal.value;
}
// Calcular porcentaje de progreso (simulado)
const progress = computed(() => 20)

// --- MÉTODOS ---
const lanzarConfetti=()=> {
  const yaLanzado = localStorage.getItem('confettiLaunched-'+cursoActual.value.id);
  if (yaLanzado) return; // Evitar múltiples lanzamientos
  localStorage.setItem('confettiLaunched-'+cursoActual.value.id, 'true');

  confetti({
    particleCount: 150,
    spread: 120,
    origin: { y: 0.6 }
  });
}
const loadLesson = (lesson) => {

  // 1. Actualizar datos de lección
  navigateTo('/lesson/' + lesson.title.toLowerCase().replace(/\s+/g, '-') + '/' + lesson.id + '/' + cursoActual.value.titulo.toLowerCase().replace(/\s+/g, '-') + '/' + cursoActual.value.id)
  console.log('Cargando lección:', lesson);
  currentLesson.value = lesson
  //cambiar la ruta de la url sin recargar la página
  //history.replaceState(null, '', '/lesson/' + lesson.title.toLowerCase().replace(/\s+/g, '-') + '/' + lesson.id + '/' + cursoActual.value.titulo.toLowerCase().replace(/\s+/g, '-')+'/'+cursoActual.value.id)
  // Scroll al top suave
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getLesson = async (id, courseId) => {
  loading.value = true
  error.value = ''
  try {

    const { data } = await axios.get(URL_BASE_API + '/v1/public/lessons/' + id + '/' + courseId, {
      headers: {
        Authorization: `${localStorage.getItem('token_type') || 'Bearer'} ${localStorage.getItem('token') || ''}`
      }
    });

    currentLesson.value = await data.data;
    cursoActual.value = await data.data.course;
    videoUrl.value = await currentLesson.value.url_video;
    if(cursoActual.value.progreso==100){
      lanzarConfetti();
    }



    // Encuentra el módulo que contiene la lección actual
    const moduloEncontrado = cursoActual.value.contenido.find(modulo =>
      modulo.lessons.some(lesson => lesson.id === currentLesson.value.id)
    )
    if (moduloEncontrado) {
      openedModules.value = [moduloEncontrado.title]   // Guardas el título
    }

    if (!currentLesson.value.isFree && !cursoActual.value.buyed && !currentSession.value?.name) {
      toggleLogin();
    }


  } catch (err) {
    if (err.response?.status === 404) {
      error.value = 'Lección no encontrada'
    } else if (err.response?.status === 401) {
      error.value = 'Por favor, inicia sesión.'
      showLoginModal.value = true;
      localStorage.removeItem('token')
      localStorage.removeItem('token_type')
      navigateTo('/');
    } else{
    error.value = err.response?.data?.message || 'Intenta nuevamente'
    push.error({ title: 'Upps!', message: error.value, duration: 3000 })
    }

  } finally {
    loading.value = false

  }
}

onMounted(() => {

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


  theme.themes.value.dark.colors.primary = '#00B894' // Verde
  theme.themes.value.dark.colors.secondary = '#DC143C' // Rojo/Magenta
  theme.themes.value.dark.colors.accent = '#FFC107' // Amarillo
  // Crear un <script> dinámicamente para Particles.js
  const lessonId = route.params.lessonId;
  const courseId = route.params.courseId;
  if (lessonId > 0 && !isNaN(lessonId)) {
    getLesson(lessonId, courseId);
  } else {
    push.error({ title: 'Upps!', message: 'ID de curso inválido', duration: 3000 })
    navigateTo('/')

  }

  try {
    const token = localStorage.getItem('token') || ''
    currentSession.value = jwtDecode(token) ?? {}
  } catch (error) {

  }


  console.log('Mounted lesson page with ID:', currentSession.value);
})

// Navegación Siguiente/Anterior (Lógica básica secuencial)
const navigateLesson = (direction) => {
  // Aplanar todas las lecciones para encontrar el índice actual
  try {

    const allLessons = curso.value.contenido.flatMap(m => m.lessons.map(l => ({ ...l, moduleTitle: m.title })))
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.value.id)

    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1

    if (newIndex >= 0 && newIndex < allLessons.length) {
      const target = allLessons[newIndex]
      if (!target.isFree && !cursoActual.buyed) {
        toggleLogin();
      } else {

        loadLesson(target)
      }
    }
  } catch (error) {
    console.error('Error al navegar entre lecciones:', error);
  }
}

// Toggle Theater Mode
const toggleTheaterMode = () => {
  isTheaterMode.value = !isTheaterMode.value
}
const commentLesson = (lesson) => {
  push.success({ title: 'Comentar', message: 'Función en desarrollo', duration: 3000 })
}

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

// Configurar tema personalizado al montar
const theme = useTheme()

const renderedMarkdown = computed(() =>
  md.render(currentLesson?.content || "No hay descripción disponible para esta lección.")
)

const globalIndex=(moduleIndex, lessonIndex) =>{
  let count = 0;

  for (let i = 0; i < moduleIndex; i++) {
    count += curso.value.contenido[i].lessons.length;
  }

  return count + lessonIndex + 1; // +1 porque empieza en 1
}

</script>

<template>
  <!-- HEADER -->
  <v-app-bar :class="{ 'blurred': showLoginModal }" flat color="#1a2024" height="54" class="border-b border-opacity-10">
    <LoginModal />
    <v-container class="d-flex align-center py-0" style="max-width: 1600px;">

      <v-btn variant="text" class="text-capitalize font-weight-bold mr-4" color="primary"
        @click="navigateTo('/course/' + curso?.id + '/' + curso?.titulo.toLowerCase().replace(/\s+/g, '-'))">
        <v-icon start>mdi-arrow-left</v-icon>
        Volver
      </v-btn>

      <v-divider vertical class="mx-3 my-4"></v-divider>

      <span class="text-subtitle-1 font-weight-medium d-none d-sm-inline text-white mx-1">
        {{ currentLesson?.title }}
      </span> |
      <v-btn variant="text" class="text-capitalize font-weight-bold mr-4" color="primary"
        @click="navigateTo('/course/' + curso?.id + '/' + curso?.titulo.toLowerCase().replace(/\s+/g, '-'))">
        {{ cursoActual?.titulo }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn v-if="!currentSession?.name" variant="elevated"
        class="text-capitalize elevation-1 ml-2 topbar-login-button mx-2" @click="toggleLogin" v-ripple>
        <v-icon left small>mdi-login</v-icon>
        Ingresar
      </v-btn>
      <p class="mx-4" v-else>{{ currentSession?.name }}</p>
      <v-btn v-if="currentSession?.name" variant="outlined" to="/escritorio"
        class="text-capitalize font-weight-bold mx-4">
        Mi Aprendizaje
      </v-btn>
      <v-btn color="secondary" variant="elevated" class="text-capitalize"
        @click="currentSession?.name ? commentLesson(lesson) : toggleLogin()">
        <v-icon start icon="mdi-comment-text-outline" size="small"></v-icon>
        Comentar
      </v-btn>
    </v-container>
  </v-app-bar>

  <!-- MAIN CONTENT -->
  <v-main class="pt-0" :class="{ 'blurred': showLoginModal }">
    <v-container fluid style="max-width: 1600px;">
      <v-row>

        <!-- COLUMNA IZQUIERDA: PLAYER & INFO -->
        <v-col cols="12" :md="isTheaterMode ? 12 : 8" class="transition-all ">

          <!-- REPRODUCTOR DE VIDEO (16:9 Automático) -->
          <!-- PLAYER PRINCIPAL DE LA LECCIÓN -->
          <!-- HERO SECTION (Diseño 2 columnas como la imagen) -->
          <div class="mt-0">
            <v-container>
              <v-btn icon color="primary" class="fab-toggle" @click="toggleTheaterMode">
                <v-icon>
                  {{ isTheaterMode ? 'mdi-arrow-expand-left' : 'mdi-arrow-expand-right' }}
                </v-icon>
              </v-btn>



              <v-row>

                <!-- COLUMNA IZQUIERDA: VIDEO -->
                <!-- Usamos md="8" para que el ancho sea generoso y el alto 16/9 sea tipo cine -->
                <v-col>
                  <v-card class="overflow-hidden elevation-10 h-100">

                    <!-- AQUI ESTÁ EL CAMBIO SOLICITADO: -->
                    <!-- Usamos v-responsive 16/9 en lugar de min-height fijo de 580px -->

                    <v-responsive :aspect-ratio="16 / 9" class="w-100">
                      <v-col v-if="loading">
                        <v-skeleton-loader type="image" class="rounded-lg" height="420" />

                        <!-- Título -->
                        <v-skeleton-loader type="text" class="mt-4 w-75" />

                        <!-- Subtítulo -->
                        <v-skeleton-loader type="text" class="w-50" />

                        <!-- Botones -->
                        <div class="d-flex gap-3 mt-4">
                          <v-skeleton-loader type="button" width="140" height="36" />
                          <v-skeleton-loader type="button" width="140" height="36" />
                        </div>

                        <!-- Descripción -->
                        <div class="mt-4">
                          <v-skeleton-loader type="text" class="mb-2" />
                          <v-skeleton-loader type="text" class="mb-2 w-75" />
                          <v-skeleton-loader type="text" class="w-50" />
                        </div>
                      </v-col>


                      <!-- ESTADO 1: Video Reproduciendo -->
                      <!-- Importante: w-100 h-100 para llenar el v-responsive -->
                      <div v-if="currentLesson?.type !== 'video'">
                        <h2 class="text-h6 text-primary mb-4">Notas de lectura</h2>

                        <MarkdownRenderer :content="currentLesson?.content" />
                      </div>


                      <div v-else>
                        <div v-if="videoUrl && (currentLesson.isFree || cursoActual.buyed)" class="w-100 h-100">
                          <iframe v-if="videoUrl.includes('youtube.com')" :src="videoUrl" class="w-100 h-100 border-0"
                            allow="autoplay; fullscreen; picture-in-picture" allowfullscreen
                            title="Video Player"></iframe>
                          <VideoPlayer :src="videoUrl" v-else />

                        </div>
                        <!-- ESTADO 2: Portada / Overlay -->
                        <div v-else class="w-100 h-100 position-relative d-flex align-center justify-center">

                          <!-- Imagen fondo -->
                          <v-img :src="curso?.imagen" cover class="w-100 h-100 opacity-70"
                            gradient="to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)"></v-img>

                          <!-- SI ESTÁ LOGUEADO (tu vista previa original) -->
                          <div v-if="currentLesson?.isFree || cursoActual?.buyed"
                            class="position-absolute d-flex flex-column align-center" style="z-index: 2">
                            <v-btn icon="mdi-play" size="x-large" color="primary" class="mb-2 pulse-animation"
                              elevation="6" @click="videoPlaying = true"></v-btn>

                            <span class="font-weight-bold text-white text-shadow">
                              Vista Previa
                            </span>
                          </div>
                          <!-- SI EL USUARIO NO ESTÁ LOGUEADO -->
                          <div v-else
                            class="position-absolute d-flex flex-column align-center justify-center text-center px-6"
                            style="z-index: 3">
                            <v-icon color="white" size="64" class="mb-3">mdi-lock</v-icon>

                            <h3 class="text-white font-weight-bold mb-2">Clase Privada</h3>

                            <p class="text-white mb-4">
                              Inicia sesión para acceder a este contenido
                            </p>

                            <v-btn color="primary" size="large" class="px-8" @click="toggleLogin">
                              Iniciar Sesión
                            </v-btn>
                          </div>


                        </div>
                      </div>


                    </v-responsive>
                  </v-card>
                </v-col>


              </v-row>
            </v-container>
          </div>


          <!-- BARRA DE CONTROL -->
          <v-card class="bg-dark-card pa-4 rounded-lg mb-4" style="height: 500;" flat>
            <div class="d-flex align-center justify-space-between flex-wrap gap-4">
              <h1 class="text-h6 font-weight-bold text-white mb-2 mb-sm-0">
                {{ currentLesson?.title }}
              </h1>

              <div class="d-flex">
                <v-btn variant="tonal" color="grey" class="mr-2 text-capitalize" size="small"
                  @click="navigateLesson('prev')">
                  <v-icon start>mdi-chevron-left</v-icon>
                  Anterior
                </v-btn>

                <v-btn color="primary" class="text-capitalize" size="small" @click="navigateLesson('next')">
                  Siguiente
                  <v-icon end>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </div>

            <div>
              <h2 class="text-subtitle-1 font-weight-bold text-primary mb-3">
                Descripción y Recursos
              </h2>
              <div class="text-grey-lighten-1 mb-4 scrollable-markdown pr-5">
  <MarkdownRenderer :content="currentLesson?.description" />
</div>


              <v-btn v-if="currentLesson?.url_download" color="secondary" variant="flat" size="small" class="text-capitalize mt-2">
                <v-icon start>mdi-file-download-outline</v-icon>
                <a :href="currentLesson?.url_download" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color:white">Descargar Código Fuente</a>
                
              </v-btn>
            </div>



            <v-divider class="my-6 border-opacity-10"></v-divider>

            <h2 class="text-subtitle-1 font-weight-bold text-primary mb-3">
              Preguntas y Respuestas
            </h2>
            <v-alert color="blue-grey-darken-4" icon="mdi-forum" border="start" border-color="primary"
              density="compact">
              <div class="text-caption text-grey-lighten-2">
                No hay preguntas aún en esta lección. ¡Sé el primero en preguntar!
              </div>
            </v-alert>
          </v-card>
        </v-col>

        <!-- COLUMNA DERECHA: SIDEBAR (TEMARIO) -->
        <!-- Se oculta si isTheaterMode es true -->
        <v-col v-if="!isTheaterMode" cols="12" md="4">

          <v-card class="bg-dark-sidebar rounded-lg elevation-4 sticky-sidebar mt-12" style="min-height: 795px;" flat>

            <!-- HEADER DEL SIDEBAR -->
            <div class="pa-4 border-b border-opacity-10">

              <div class="text-subtitle-2 font-weight-bold text-white mb-1">
                TEMARIO DEL CURSO
              </div>
              <v-progress-linear :model-value="curso?.progreso" :color="curso?.progreso==100?'success':'warning'" height="6" rounded
                class="mt-2"></v-progress-linear>
              <div class="d-flex justify-space-between mt-1">
                <span :class="`text-caption text-${curso?.progreso==100?'success':'warning'} font-weight-bold`">{{ curso?.progreso }}% completado</span>
                <span class="text-caption text-grey">{{ curso?.totalLecciones }} Lecciones</span>
              </div>
            </div>

            <!-- LISTA DE MÓDULOS -->
            <div class="sidebar-content">
              <!-- Título -->
              <!-- Lista de secciones -->
              <div v-if="loading" v-for="n in 3" :key="n" class="mb-4">
                <v-row class="align-center">


                  <!-- Nombre de la sección -->
                  <v-col cols="9">
                    <v-skeleton-loader type="text" class="mb-1" />
                    <v-skeleton-loader type="text" width="40%" />
                  </v-col>

                </v-row>
              </div>
              <v-list v-model:opened="openedModules" bg-color="transparent" theme="dark" density="compact" class="py-0">
                <v-list-group v-for="(module, i) in curso?.contenido" :key="i" :value="module.title">
                  <!-- HEADER DEL GRUPO (MÓDULO) -->
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :title="module.title" :subtitle="`${module.lessons.length} Lecciones`"
                      active-class="bg-dark-card" class="module-header">
                      <template v-slot:prepend>
                        <v-icon size="small" :color="openedModules.includes(module.title) ? 'primary' : 'grey'">
                          {{ openedModules.includes(module.title) ? 'mdi-folder-open' : 'mdi-folder' }}
                        </v-icon>
                      </template>
                    </v-list-item>
                  </template>

                  <!-- ITEMS (LECCIONES) -->
                  <v-list-item v-for="(lesson, index) in module.lessons" :key="index" :value="lesson.id"
                    @click="lesson.isFree || cursoActual.buyed ? loadLesson(lesson) : toggleLogin()"
                    class="pl-8 lesson-item" :class="{ 'active-lesson': currentLesson.id === lesson.id }" rounded="0">
                    <template v-slot:prepend>
                      <v-icon
                      v-if="lesson?.type=='video'"
                        :icon="lesson.isFree || cursoActual.buyed ? (lesson.type === 'video' ? 'mdi-play-circle-outline' : 'mdi-play-circle-outline') : ('mdi-lock-outline')"
                        size="small" :color="lesson.isFree || cursoActual.buyed ? 'primary' : 'grey'" class="mr-3">

                      </v-icon>
                      <v-icon
                      v-else 
                        :icon="lesson.isFree || cursoActual.buyed ? (lesson.type === 'reading' ? 'mdi-book-open-page-variant' : 'mdi-file-document-outline') : ('mdi-lock-outline')"
                        size="small" :color="lesson.isFree || cursoActual.buyed ? 'primary' : 'grey'" class="mr-3">
                      </v-icon>

                    <v-list-item-title class="text-caption"  style="padding-left: -20;"
                      :class="currentLesson.id === lesson.id ? 'text-yellow darken-2 font-weight-bold' : 'text-grey-lighten-1'">
                      Lección {{ globalIndex(i, index) }}. {{ lesson.title }}

                    </v-list-item-title>
                    </template>

                    <template v-slot:append>
                      <span class="text-caption text-grey-darken-1 font-weight-light">{{ lesson.duration }}</span>
                    </template>
                  </v-list-item>

                </v-list-group>
              </v-list>
            </div>

          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>

.fab-toggle {
  position: fixed !important;
  top: 85px;
  right: 17px;
  z-index: 9999;
}
.scrollable-text {
  max-height: 400px;      /* ajusta la altura */
  overflow-y: auto;       /* activa scroll */
  padding-right: 10px;    /* para que no tape el scrollbar */
}
.scrollable-markdown {
  max-height: 48vh;        /* altura ajustable */
  overflow-y: auto;
  padding-right: 12px;     /* evita que el texto choque con scrollbar */
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch; /* scroll suave en iOS */
}

/* Scrollbar estilado (opcional) */
.scrollable-markdown::-webkit-scrollbar { width: 8px; }
.scrollable-markdown::-webkit-scrollbar-thumb { background: #666; border-radius: 6px; }

/* Scrollbar opcional */
.scrollable-text::-webkit-scrollbar {
  width: 6px;
}
.scrollable-text::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 4px;
}

/* Móvil */
@media (max-width: 600px) {
  .fab-toggle {
    display: none !important;
  }
}

/* Colores de Fondo Personalizados */
.bg-dark-main {
  background-color: #12161a !important;
}

.bg-dark-card {
  background-color: #1a2024 !important;
}

.bg-dark-sidebar {
  background-color: #0f1518 !important;
}

.sticky-sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
}


/* Scrollbar Personalizado */
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: #0f1518;
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}





/* Botón expandir sobre el video */
.expand-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 20;
  /* Z-index aumentado */
  backdrop-filter: blur(4px);
}

.expand-btn:hover {
  background-color: rgba(0, 0, 0, 0.8) !important;
}

/* Transición suave para el cambio de ancho */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Scrollbar Personalizado */
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: #0f1518;
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

/* Estilos Específicos de Lección */
.lesson-item {
  border-left: 3px solid transparent;
  transition: all 0.2s;
}

.lesson-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.active-lesson {
  background-color: #1a2024 !important;
  border-left: 3px solid #00B894 !important;
  /* Primary Color */
}

/* Utilidad para markdown simulado */
code {
  background-color: #2d3436;
  color: #00B894;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}
</style>