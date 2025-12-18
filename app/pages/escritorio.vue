<template>
  

    <div class="bg-dark-main">
      <AppBar/>
      <div class="dashboard-hero pt-10 pb-10 mb-6">
        <v-container style="max-width: 1200px">
          <p class="text-primary-custom text-subtitle-1 font-weight-bold mb-1">
            Bienvenido de vuelta, {{ currentSession?.name }}!
          </p>
          <h1 class="text-h3 font-weight-bold text-white">
            Tu Progreso de Aprendizaje
          </h1>
        </v-container>
      </div>

      <v-container class="py-6" style="max-width: 1200px">
        
        <v-row class="mb-8">
          <v-col cols="12" sm="4">
          <v-skeleton-loader v-if="loading" type="paragraph"></v-skeleton-loader>

            <v-card v-else class="stat-card pa-4 rounded-lg bg-card-dark" elevation="0" style="height: fit-content;">
              <div class="d-flex justify-space-between align-center">
                <div>
                  <p class="text-h4 text-primary-custom font-weight-bold mb-0">{{ coursesInProgress?.length ?? '0' }}</p>
                  <p class="text-subtitle-2 text-grey-lighten-1 mb-0">Cursos Activos</p>
                </div>
                <v-icon size="48" color="#00B894">mdi-rocket-launch-outline</v-icon>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="4">
            <v-skeleton-loader v-if="loading" type="paragraph"></v-skeleton-loader>

            <v-card v-else class="stat-card pa-4 rounded-lg bg-card-dark" elevation="0" style="height: fit-content;">
              <div class="d-flex justify-space-between align-center">
                <div>
                  <p class="text-h4 text-amber font-weight-bold mb-0">{{ totalHorasVistas }}h</p>
                  <p class="text-subtitle-2 text-grey-lighten-1 mb-0">Horas Dedicadas</p>
                </div>
                <v-icon size="48" color="#FFC107">mdi-clock-time-three-outline</v-icon>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="4">
             <v-skeleton-loader v-if="loading" type="paragraph"></v-skeleton-loader>

            <v-card v-else class="stat-card pa-4 rounded-lg bg-card-dark" elevation="0" style="height: fit-content;">
              <div class="d-flex justify-space-between align-center">
                <div>
                  <p class="text-h4 text-secondary-custom font-weight-bold mb-0">{{ cursosCompletados?.length }}</p>
                  <p class="text-subtitle-2 text-grey-lighten-1 mb-0">Certificados</p>
                </div>
                <v-icon size="48" color="#DC143C">mdi-seal-variant</v-icon>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <h2 class="text-h5 font-weight-bold mb-4 pl-1">Mis Cursos {{ coursesInProgress?.length || '' }}</h2>
          <v-skeleton-loader v-if="loading" type="paragraph"></v-skeleton-loader>
        <v-row  v-else>

          <v-col cols="12" md="6" v-for="course in coursesInProgress" :key="course.id">
            <NuxtLink @click.prevent="iniciarCurso(course)" style="text-decoration: none;">
            <v-card class="course-progress-card bg-card-dark rounded-lg pa-3" elevation="2" hover style="height: fit-content;">
              <div class="d-flex align-center">
                <v-img 
                  :src="course.imagen" 
                  height="80" 
                  width="120" 
                  max-width="120"
                  cover 
                  class="rounded-lg mr-4 flex-shrink-0"
                ></v-img>

                <div class="flex-grow-1" style="min-width: 0;">
                  <div class="text-subtitle-1 font-weight-bold text-truncate mb-1">
                    {{ course.titulo }}
                  </div>
                  <div class="text-caption text-grey mb-2 text-truncate">
                    Próxima: {{ course.contenido[0].title }}
                  </div>
                  <div class="text-caption text-grey mb-2 text-truncate">
                    Has visto: <strong>{{ course.horas_vistas }}</strong> horas de {{ course.duracion }} totales
                  </div>
                  
                  <div class="d-flex align-center gap-2">
                    <v-progress-linear
                      :model-value="course.progreso"
                      color="#00B894"
                      bg-color="grey-darken-3"
                      height="6"
                      rounded
                      class="flex-grow-1"
                    ></v-progress-linear>
                    <span class="text-caption font-weight-bold ml-2">{{ course.progreso }}%</span>
                  </div>
                </div>

                <div class="ml-2">
                   <v-btn 
                    icon="mdi-play" 
                    color="primary-custom" 
                    size="small" 
                    elevation="4"
                   ></v-btn>
                </div>
              </div>
            </v-card>
            </NuxtLink>
          </v-col>
        </v-row>

        <h2 class="text-h5 font-weight-bold mt-10 mb-4 pl-1">Finalizados ({{ cursosCompletados?.length }})</h2>
        <v-card class="bg-card-dark rounded-lg" elevation="0" style="height: fit-content;">
          <v-list bg-color="transparent">
            <v-list-item v-if="cursosCompletados?.length > 0"
              v-for="course in cursosCompletados"
              :key="course?.id"
              class="completed-list-item mb-1 py-3"
              
            >
           
              <template v-slot:prepend>
                <v-icon color="#66BB6A" class="mr-4">mdi-check-decagram</v-icon>
                <v-img 
                  :src="course.imagen" 
                  height="80" 
                  width="250" 
                  max-width="120"
                  cover 
                  class="rounded-lg mr-4 flex-shrink-0"
                ></v-img>
              </template>
              

              <v-list-item-title class="font-weight-medium">
                {{ course?.titulo }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption text-grey mt-1">
                Completado el <strong>{{ course.horas_vistas }}</strong> horas vistas
              </v-list-item-subtitle>

              <template v-slot:append>
                <v-btn @click="navigateTo('/certificado/'+course?.id)" variant="outlined" size="small" color="white" class="text-capitalize">
                  Ver Certificado
                </v-btn>
              </template>
            </v-list-item>
            <v-alert color="info" v-else>Aún no hay cursos finalizados.</v-alert>
          </v-list>
        </v-card>

      </v-container>
    </div>

   

  
</template>

<script setup>
import { ref } from 'vue';
import { jwtDecode } from 'jwt-decode'
import { push } from 'notivue'
import axios from 'axios'

const route = useRoute()
definePageMeta({
    middleware:['auth','rate']
})
const router = useRouter()
const currentSession = useSession();
const token = ref('')
const token_type = ref('')
const error = ref('')
const loading = ref(false)
const coursesInProgress = ref([])


const getMisCursos = async () => {
    loading.value = true
    error.value = ''
    try {

        const {data} = await axios.get(URL_BASE_API + '/v1/public/courses?userCourses',{
      headers: {
        Authorization: `${localStorage.getItem('token_type') || 'Bearer'} ${localStorage.getItem('token') || ''}`
      }
    });

        coursesInProgress.value = await data.data;

        

    } catch (err) {

        error.value = err.response?.data?.message || 'Intenta nuevamente'
        push.error({ title: 'Upps!', message: error.value, duration: 3000 })

    } finally {
        loading.value = false

    }
}

const totalHorasVistas = computed(() => {
  if (!coursesInProgress.value) return 0

  return coursesInProgress.value.reduce((acc, curso) => {
    return acc + (curso.horas_vistas || 0)
  }, 0).toFixed(2)
})

const cursosCompletados = computed(() => {
  if (!coursesInProgress.value) return 0

  return coursesInProgress.value.filter(
    curso => Number(curso.progreso) === 100
  )
})



onMounted(() => {
    try {
      token.value = localStorage.getItem('token') || ''
      token_type.value = localStorage.getItem('token_type') || ''

      currentSession.value = jwtDecode(token.value) ?? {}
    } catch (error) {
      push.warning({ title: 'Upps!', message: 'Su sesión expiró' })
      localStorage.removeItem('token')
      localStorage.removeItem('token_type')
      router.push('/')
    }

    getMisCursos();
});
 
// --- DATOS (State) ---
const stats = ref({
  activeCourses: 3,
  hoursSpent: 125,
  completedCourses: 2,
});


const iniciarCurso = (cursoActual) => {
    // 2. CORRECCIÓN LÓGICA: Usa .find() en lugar de .filter().
    // .filter devuelve un array [], lo cual siempre es "true" en el if.
    // .find devuelve el objeto o undefined.
    const cursoEncontrado = coursesInProgress.value.find(c => c.id === cursoActual.id);

    if (cursoEncontrado) {
        // Generar el slug limpio
        const slug = cursoActual.titulo.toLowerCase().replace(/\s+/g, '-');
        
        // 3. USA ROUTER.PUSH: Esto garantiza navegación interna sin recargar
        router.push(`/course/${cursoActual.id}/${slug}`);
        
    } else {
        push.error({ title: 'Error', message: 'Curso no encontrado', duration: 3000 });
    }
}

const completedCourses = ref([
  {
    id: 4,
    title: "Git y GitHub: Control de Versiones",
    completionDate: "01 Nov, 2025",
  },
  {
    id: 5,
    title: "Introducción a la Nube (AWS)",
    completionDate: "15 Oct, 2025",
  },
]);

// --- MÉTODOS ---
const resumeCourse = (courseId) => {
  console.log(`Reanudando el curso ID: ${courseId}`);
  // Aquí iría tu lógica de router.push(`/curso/${courseId}`)
};
</script>

<style scoped>
/* DEFINICIÓN DE COLORES
  Usamos clases CSS para forzar los colores específicos solicitados
  sin depender de la configuración global del tema de Vuetify.
*/

.bg-dark-main {
  background-color: #12161a !important;
}

.bg-card-dark {
  background-color: #1a2024 !important;
}

/* Colores de texto/fondo personalizados */
.text-primary-custom { color: #00B894 !important; }
.bg-primary-custom { background-color: #00B894 !important; }
.text-secondary-custom { color: #DC143C !important; }
.text-amber { color: #FFC107 !important; }

/* Sobreescribir el color primario de botones específicos */
:deep(.v-btn.bg-primary-custom) {
    background-color: #00B894 !important;
}

/* HERO */
.dashboard-hero {
  background-color: #0f1518;
  border-bottom: 3px solid #00B894; /* Color Primario */
}

/* TARJETAS DE ESTADÍSTICAS */
.stat-card {
  border-left: 5px solid #00B894; /* Verde por defecto */
  transition: transform 0.2s;
}
.stat-card-amber {
  border-left-color: #FFC107 !important;
}
.stat-card-red {
  border-left-color: #DC143C !important;
}

/* TARJETA DE CURSO (HOVER) */
.course-progress-card {
  transition: all 0.3s ease;
  border: 1px solid transparent;
}
.course-progress-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.4) !important;
  border-color: rgba(0, 184, 148, 0.3);
}

/* LISTA DE COMPLETADOS */
.completed-list-item {
  border-left: 3px solid #66bb6a;
  background: rgba(255,255,255,0.02);
  margin-bottom: 8px;
  border-radius: 4px;
}
</style>