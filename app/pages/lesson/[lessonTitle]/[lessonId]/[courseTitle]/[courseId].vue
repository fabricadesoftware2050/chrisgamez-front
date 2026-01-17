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
const showQuestionModal = useQuestionModal();
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

function toggleQuestion() {
  showQuestionModal.value = !showQuestionModal.value;
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
      if (target.isFree || cursoActual.value?.buyed) {
        loadLesson(target)
      } else {
        toggleLogin();
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

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const lessonUrl = computed(() => {
  if (process.client) {
    return window.location.href
  }
  return ''
})
</script>
<template>
  <v-app-bar flat color="#1a2024" height="54" class="border-b border-opacity-10">
    <LoginModal />
    <CourseQuestionForm :lesson_id="currentLesson?.id" :lesson_url="lessonUrl" />
    <v-container class="d-flex align-center py-0" fluid>
      <v-btn variant="text" class="text-capitalize font-weight-bold" color="primary"
        @click="navigateTo('/course/' + curso?.id + '/' + curso?.titulo.toLowerCase().replace(/\s+/g, '-'))">
        <v-icon start>mdi-arrow-left</v-icon>
        <span class="d-none d-sm-inline">Regresar</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="secondary" variant="elevated" size="small" class="text-capitalize"
        @click="currentSession?.name ? toggleQuestion() : toggleLogin()">
        <v-icon start icon="mdi-comment-text-outline" size="small"></v-icon>
        Comentar
      </v-btn>
      
    </v-container>
  </v-app-bar>

  <v-main class="bg-dark-main" >
    <v-container fluid style="max-width: 1800px;" class="pa-2 pa-sm-4">
      <v-row>
        <v-col cols="12" :md="isTheaterMode ? 12 : 8">
          
            <v-responsive :aspect-ratio="16 / 9" class=" bg-black">
              <v-skeleton-loader v-if="loading" type="image" height="100%" />
              
              <template v-else>
                <div v-if="currentLesson?.type !== 'video'" class="pa-6 overflow-y-auto h-100 bg-dark-card">
                  <h2 class="text-h6 text-primary mb-4">Notas de lectura</h2>
                  <MarkdownRenderer :content="currentLesson?.content" />
                </div>

                <div v-else class="w-100 h-100 overflow-hidden elevation-10 rounded-lg mb-4 video-hero-card" border="none">
                  <div v-if="videoUrl && (currentLesson.isFree || cursoActual.buyed)" class="w-100 h-100">
                    <iframe v-if="videoUrl.includes('youtube.com')" :src="videoUrl" 
                      class="w-100 h-100 border-0" allowfullscreen></iframe>
                    <VideoPlayer 
                    v-if="videoUrl" 
                    :src="videoUrl" 
                    @fullscreen-change="(val) => isTheaterMode = val" 
                 />
                  </div>
                  <div v-else class="w-100 h-100 d-flex flex-column align-center justify-center bg-dark-card">
                    <v-icon size="64" color="grey-darken-3">mdi-lock</v-icon>
                    <h3 class="text-white mt-4">Contenido Privado</h3>
                    <v-btn color="primary" class="mt-4" @click="toggleLogin">Ingresar</v-btn>
                  </div>
                </div>
              </template>
            </v-responsive>

          <v-card class="bg-dark-card pa-4 rounded-lg mb-4 main-info-card" flat>
            <div class="d-flex align-center justify-space-between mb-6">
              <h1 class="text-subtitle-1 text-md-h6 font-weight-bold text-white mb-0 line-clamp-1">
                {{ currentLesson?.title }}
              </h1>
              <div class="d-flex shrink-0">
                <v-btn variant="tonal" color="grey" class="mr-2" size="small" icon="mdi-chevron-left" @click="navigateLesson('prev')" />
                <v-btn color="primary" size="small" icon="mdi-chevron-right" @click="navigateLesson('next')" />
              </div>
            </div>

            <div class="info-scroll-content">
              <h2 class="text-subtitle-2 font-weight-bold text-primary mb-2">Descripción</h2>
              <div class="text-grey-lighten-1 mb-4">
                <MarkdownRenderer :content="currentLesson?.description" />
              </div>

              <v-btn v-if="currentLesson?.url_download" color="secondary" variant="flat" size="small" class="text-capitalize mb-6" block>
                <v-icon start>mdi-file-download-outline</v-icon>
                <a :href="currentLesson?.url_download" target="_blank" style="text-decoration:none; color:white">Código Fuente</a>
              </v-btn>

              <v-divider class="my-4 border-opacity-10"></v-divider>

              <h2 class="text-subtitle-2 font-weight-bold text-primary mb-3">Comentarios</h2>
              <v-alert v-for="(item, index) in currentLesson?.comments" :key="index" 
                color="blue-grey-darken-4" density="compact" class="mb-2 border-start">
                <div class="text-caption">
                  <span class="text-white font-weight-bold">{{ item.title }}</span>
                  <div class="mt-1 text-grey-lighten-1"><MarkdownRenderer :content="item.content" /></div>
                </div>
              </v-alert>
            </div>
          </v-card>
        </v-col>

        <v-col v-if="!isTheaterMode || $vuetify.display.smAndDown" cols="12" md="4">
          <v-card class="bg-dark-sidebar rounded-lg sticky-sidebar" flat>
            <div class="pa-4 border-b border-opacity-10">
              <div class="text-overline text-white">Temario</div>
              <v-progress-linear :model-value="curso?.progreso" color="success" height="6" rounded class="mt-1" />
              <div class="d-flex justify-space-between mt-1 text-caption">
                <span class="text-success">{{ curso?.progreso }}%</span>
                <span class="text-grey">{{ curso?.totalLecciones }} Clases</span>
              </div>
            </div>

            <div class="sidebar-list-container">
              <v-list v-model:opened="openedModules" bg-color="transparent" theme="dark" density="compact">
                <v-list-group v-for="(module, i) in curso?.contenido" :key="i" :value="module.title">
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :title="module.title" class="module-item" />
                  </template>
                  <v-list-item v-for="(lesson, idx) in module.lessons" :key="idx"
                    :class="{ 'active-lesson': currentLesson.id === lesson.id }"
                    @click="lesson.isFree || cursoActual.buyed ? loadLesson(lesson) : toggleLogin()"
                    class="pl-6">
                    <template v-slot:prepend>
                      <v-icon size="14" :color="currentLesson.id === lesson.id ? 'yellow' : 'primary'">
                        {{ lesson.type === 'video' ? 'mdi-play-circle' : 'mdi-file-document' }}
                      </v-icon>
                    </template>
                    <v-list-item-title class="text-caption">
                      {{ globalIndex(i, idx) }}. {{ lesson.title }}
                    </v-list-item-title>
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
/* --- 1. CARD DEL VIDEO --- */
/* En móvil: Alto automático basado en el ancho (16:9) */
.video-hero-card {
  height: auto;
  min-height: auto;
}

/* En escritorio: Forzamos el alto de 550px */
@media (min-width: 960px) {
  .video-hero-card {
    height: 550px !important;
  }
  /* Aseguramos que el contenido interno (iframe/video) llene los 550px */
  .video-hero-card :deep(.v-responsive),
  .video-hero-card :deep(.v-responsive__content) {
    height: 100% !important;
  }
}

/* --- 2. INFO CARD (DESCRIPCIÓN) --- */
/* Alto fijo de 500px en cualquier dispositivo */
.main-info-card {
  height: 500px !important;
  display: flex;
  flex-direction: column;
}

.info-scroll-content {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
}

/* --- 3. SIDEBAR (TEMARIO) --- */
/* Alto fijo de 795px */
.sticky-sidebar {
  height: 795px !important;
  display: flex;
  flex-direction: column;
}

.sidebar-list-container {
  flex: 1;
  overflow-y: auto;
}

/* Comportamiento Sticky solo en Desktop */
@media (min-width: 960px) {
  .sticky-sidebar {
    position: sticky;
    top: 70px;
  }
}

/* --- ESTILOS DE INTERFAZ --- */
.active-lesson {
  background-color: rgba(0, 184, 148, 0.1) !important;
  border-left: 3px solid #00B894 !important;
}

.bg-dark-main { background-color: #12161a !important; margin-top: -45px;}
.bg-dark-card { background-color: #1a2024 !important; }
.bg-dark-sidebar { background-color: #0f1518 !important; }

/* Scrollbar para que no se vea tosco en los 500px/795px */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
</style>