<template>

    
    
    <AppBar  />
        <v-container class="pt-10 pb-12" style="max-width: 1200px;" :class="{ 'blurred': showLoginModal }">


            <div class="static-header">
                <h1>Descubre tu próximo aprendizaje.</h1>
                <p>Miles de desarrolladores han comenzado aquí. ¡Elige tu ruta de aprendizaje!</p>
            </div>

            <v-row class="mb-6">
                <v-col cols="12" sm="6" md="3">
                    <v-select v-model="filtroCategoria"
                        :items="['Todo', 'Frontend', 'Backend', 'DevOps', 'Cloud', 'FullStack']"
                        label="Filtrar por Categoría" dense outlined hide-details dark
                        prepend-inner-icon="mdi-format-list-bulleted"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-select v-model="filtroNivel" :items="['Todos', 'Principiante', 'Intermedio', 'Avanzado']"
                        label="Filtrar por Nivel" dense outlined hide-details dark
                        prepend-inner-icon="mdi-stairs"></v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="busqueda" label="Buscar por título o tecnología..." dense outlined
                        hide-details dark prepend-inner-icon="mdi-magnify" clearable></v-text-field>
                </v-col>
            </v-row>

           <v-row align="stretch"> 
          <v-col v-if="loading" v-for="n in 9" :key="n" cols="12" sm="6" md="4" lg="4">
            <v-skeleton-loader
            theme="light"
            class="mx-auto"
            elevation="2"
            max-width="360"
            type="card-avatar, article, actions"
            
            
        ></v-skeleton-loader>
        </v-col>
                <v-col v-else v-for="curso in cursosFiltrados" :key="curso.id" cols="12" sm="6" md="4" lg="4">

                    <v-card class="course-card-light rounded-lg elevation-8 d-flex flex-column fill-height"
                        @click="iniciarCurso(curso)">

                        <v-img 
                :src="curso.imagen" 
                height="160px" 
                cover 
                class="rounded-t-lg align-center justify-center d-flex flex-grow-0"
              >
                  <div v-if="false" style="position: absolute; top: 8px; left: 8px; display: flex; gap: 4px;">
                      <v-chip small color="primary" dark class="font-weight-bold">{{ curso.nivel }}</v-chip>
                      <v-chip small color="grey lighten-1" class="font-weight-medium grey--text text--darken-3">
                          {{ curso.categoria }}
                      </v-chip>
                  </div>
                  <div class="play-overlay">
                      <v-icon>mdi-play-circle</v-icon>
                  </div>
              </v-img>

                        <div class="px-4 py-2 text-caption font-weight-regular progress-bg">
                            <v-progress-linear :value="curso?.progreso" color="secondary" rounded
                                class="mb-1"></v-progress-linear>
                            <span class="d-block text-center mb-1">
                                {{ ((curso.leccionesCompletadas || 0) / curso.totalLecciones * 100).toFixed(0) || 0 }}%
                                <span v-if="curso.progreso === 0">Inicia sesión para registrar tu progreso</span><span
                                    v-else>Completado</span>
                            </span>
                            <div class="d-flex justify-space-between text--secondary">
                                <span>{{ curso.totalLecciones }} lecciones</span>
                                |<span>Duración: {{ curso.duracion }}</span>
                            </div>
                        </div>

                        <v-card-text class="pb-2">

                            <p class="text-h6 font-weight-bold title-text mb-2">
                                {{ curso.titulo }}
                            </p>

                            <p class="description-text mb-4">
                                {{ curso.descripcion }}
                            </p>

                            <v-spacer></v-spacer>

                            <div class="d-flex align-center justify-space-between pt-2">
                                <div class="d-flex text-caption">
                                    <span class="mr-3 text-black">
                                        <v-icon small left class="footer-icon">mdi-counter</v-icon>
                                        {{ curso.leccionesCompletadas || 0 }}/{{ curso.totalLecciones }}
                                    </span>
                                </div>

                                <div class="price-area">
                                    <span v-if="formatCOP(curso.precio_actual) === 0" class="price-free">FREE</span>
                                    <div v-else class="text-right">
                                        <span class="current-price-footer">COP {{ formatCOP(curso.precio_actual || 0) }}</span>
                                        <span class="old-price-footer ml-1 d-block">{{ formatCOP(curso.precio_anterior || 0) }}</span>
                                    </div>
                                </div>

                                <v-btn color="primary" small
                                    class="text-capitalize font-weight-bold white--text elevation-2 action-button"
                                    @click.stop="iniciarCurso(curso)" v-ripple>
                                    <v-icon left small>
                                        mdi-play-circle-outline
                                    </v-icon>
                                    Comenzar Curso
                                </v-btn>
                            </div>

                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            

            <p v-if="cursosList.length === 0" class="text-center mt-10 text-h6 grey--text text--lighten-1">
                No se encontraron cursos con los filtros aplicados.
            </p>

              <PaginateListComponent :my-list="cursosResponse" :get-data-func="getCourseList" />


        </v-container>
   

</template>

<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'
const showLoginModal = useLoginModal();
const busqueda = ref('')
const filtroCategoria = ref('Todo')
const filtroNivel = ref('Todos')
const paginaActual = ref(1)
const error = ref('')
const loading = ref(false)
const cursosList = ref([])
const cursosResponse = ref([])



function toggleLogin() {
  showLoginModal.value = !showLoginModal.value;
}

// ------------------------------
// Computed
// ------------------------------
const cursosFiltrados = computed(() => {
  const busquedaLower = busqueda.value.toLowerCase();

  let cursosBuscar = cursos.value.filter(curso => {
    const coincideBusqueda =
      !busqueda.value ||
      curso.titulo.toLowerCase().includes(busquedaLower) ||
      curso.descripcion.toLowerCase().includes(busquedaLower) ||
      curso.categoria.toLowerCase().includes(busquedaLower);

    const coincideCategoria =
      filtroCategoria.value === 'Todo' || curso.categoria === filtroCategoria.value;

    const coincideNivel =
      filtroNivel.value === 'Todos' || curso.nivel === filtroNivel.value;

    return coincideBusqueda && coincideCategoria && coincideNivel;
  });

  // ✅ ORDENAR POR EL CAMPO "orden"
  cursosBuscar.sort((a, b) => a.orden - b.orden);

  return cursosBuscar;
});





// ------------------------------
// Métodos
// ------------------------------
function iniciarCurso(cursoActual) {
    const curso = cursosList.value.filter(c => c.id === cursoActual.id)
    if (curso) {
        navigateTo('/course/' + cursoActual.id + '/' + cursoActual.titulo.toLowerCase().replace(/\s+/g, '-'))
    } else {
        push.error({ title: 'Error', message: 'Curso no encontrado', duration: 3000 })
    }
}



const getCourseList = async (url) => {
    loading.value = true
    error.value = ''
    try {

        const {data} = await axios.get(url)

        cursosList.value = data.data;

        cursosResponse.value = data;
    } catch (err) {

        error.value = err.response?.data?.message || 'Intenta nuevamente'
        push.error({ title: 'Upps!', message: error.value, duration: 3000 })

    } finally {
        loading.value = false

    }
}

const cursos = computed(() => {
    const data = cursosList.value;
    return data.map(curso => ({
        ...curso,
        totalLecciones: curso.contenido.reduce(
            (suma, modulo) => suma + (modulo.lessons?.length || 0),
            0
        )
    }))
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

definePageMeta({ layout: false })


onMounted(() => {
    // Crear un <script> dinámicamente para Particles.js
    getCourseList(URL_BASE_API + '/v1/public/courses')

})

// ------------------------------
// Watchers
// ------------------------------
watch(filtroCategoria, () => (paginaActual.value = 1))
watch(filtroNivel, () => (paginaActual.value = 1))
watch(busqueda, () => (paginaActual.value = 1))
</script>

<style>


/* --- Animación 3D y Levantamiento de Cards --- */
.course-card-light {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    background-color: #FFFFFF !important;
    border: 1px solid #ECEFF1;
    transform-style: preserve-3d;
    cursor: pointer;
}

.course-card-light:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
    transform: translateY(-5px) rotateX(1deg);
}

/* --- Estilo del Botón de Acción con Escala --- */
.action-button {
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease !important;
}

.action-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 184, 148, 0.4) !important;
    background-color: #00A683 !important;
}

/* --- Otros Estilos (Mantenidos) --- */
.course-card-light .v-image {
    border-bottom: 1px solid #CFD8DC;
    position: relative;
}

.course-card-light .title-text {
    color: #263238 !important;
}

.course-card-light .description-text {
    color: #546E7A !important;
}

.course-card-light .footer-icon {
    color: #78909C !important;
}

.progress-bg {
    background-color: #ECEFF1;
    color: #78909C !important;
}

.course-card-light .v-btn {
    text-transform: none !important;
    font-size: 0.85rem !important;
    font-weight: 700 !important;
    padding: 0 10px !important;
}

.course-card-light .v-card__text {
    padding-bottom: 16px !important;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.play-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
    border-radius: 8px 8px 0 0;
}

.play-overlay:hover {
    opacity: 1;
}

.play-overlay .v-icon {
    color: white;
    font-size: 60px;
    opacity: 0.8;
}

.static-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #E0E0E0;
    margin-bottom: 5px;
}

.static-header p {
    font-size: 1.1rem;
    color: #94A3B8;
}

.price-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.current-price-footer {
    font-size: 0.95rem;
    font-weight: 900;
    color: #263238 !important;
    white-space: nowrap;
}

.old-price-footer {
    font-size: 0.7rem;
    text-decoration: line-through;
    color: #78909C !important;
    white-space: nowrap;
}

.price-free {
    font-size: 1.1rem;
    font-weight: 900;
    color: #00B894 !important;
    white-space: nowrap;
}



.v-select.v-text-field--outlined.v-input--dark .v-input__control,
.v-text-field.v-text-field--outlined.v-input--dark .v-input__control {
    background-color: rgba(255, 255, 255, 0.08) !important;
}

.v-select.v-text-field--outlined.v-input--dark fieldset,
.v-text-field.v-text-field--outlined.v-input--dark fieldset {
    border-color: rgba(255, 255, 255, 0.15) !important;
}
</style>
