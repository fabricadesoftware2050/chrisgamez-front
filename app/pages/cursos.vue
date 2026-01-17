<template>

    
    
    <AppBar  />
        <v-container class="pt-10 pb-12" style="max-width: 1600px;" :class="{ 'blurred': showLoginModal }">


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
                <v-col v-for="curso in cursosFiltrados" :key="curso.id" cols="12" sm="6" md="4" lg="4">

  <v-card 
    class="master-card rounded-sm d-flex flex-column fill-height overflow-hidden"
    elevation="0"
    @click="iniciarCurso(curso)"
  >
    
    <div class="img-wrapper relative overflow-hidden">
        <v-img 
          :src="curso.imagen" 
          height="200px" 
          cover 
          class="course-image transition-swing"
        >
            <div class="gradient-overlay fill-height w-100 absolute"></div>

            <div class="d-flex justify-space-between w-100 px-4 pt-4 absolute" style="z-index: 2;">
                <v-chip label x-small color="white" text-color="black" class="font-weight-bold elevation-2">
                    {{ curso.categoria }}
                </v-chip>
                
                <div class="level-badge d-flex align-center px-2 py-1 rounded-pill backdrop-blur">
                   <v-icon x-small color="warning" class="mr-1">mdi-star</v-icon>
                   <span class="white--text caption font-weight-bold">{{ curso.nivel }}</span>
                </div>
            </div>

            <div class="play-centered absolute d-flex align-center justify-center w-100 h-100" style="top:0; left:0; z-index: 1;">
                <div class="play-pulse-circle d-flex align-center justify-center">
                    <v-icon large color="white" style="margin-left: 2px;">mdi-play</v-icon>
                </div>
            </div>
        </v-img>
    </div>

    <div class="d-flex flex-column flex-grow-1 px-5 pt-5 pb-2">
        
        <h3 class="text-h6 font-weight-black mb-2 title-clamp" style="color: #1a202c; line-height: 1.25;">
            {{ curso.titulo }}
        </h3>

        <div class="d-flex align-center mb-3">
             <div class="d-flex align-center mr-4 meta-item">
                <v-icon small color="primary" class="mr-1 opacity-70">mdi-play-box-outline</v-icon>
                <span class="text-caption font-weight-medium grey--text text--darken-2">{{ curso.totalLecciones }} lecciones</span>
             </div>
             <div class="d-flex align-center meta-item">
                <v-icon small color="primary" class="mr-1 opacity-70">mdi-clock-time-four-outline</v-icon>
                <span class="text-caption font-weight-medium grey--text text--darken-2">{{ curso.duracion }}</span>
             </div>
        </div>

        <p class="text-body-2 grey--text text--darken-1 flex-grow-1">
            {{ curso.descripcion }}
        </p>
    </div>

    <div class="px-5 pb-5 pt-2 mt-auto">
        <v-divider class="mb-4 dashed-border"></v-divider>
        
        <div class="d-flex flex-column">
            
            <div class="d-flex align-baseline justify-space-between mb-3 px-1">
                <span class="text-caption font-weight-bold grey--text text--lighten-1 text-uppercase ls-1">Inversión</span>
                
                <div class="text-right">
                    <template v-if="curso.precio_actual == 0">
                         <span class="text-h6 font-weight-black primary--text" style="color:mediumseagreen">
                            100% GRATIS
                         </span>
                    </template>
                    <template v-else>
                         <span v-if="curso.precio_anterior" class="text-caption text-decoration-line-through grey--text mr-2">
                            {{ formatCOP(curso.precio_anterior) }}
                         </span>
                         <span class="text-h6 font-weight-bold primary--text">
                            COP {{ formatCOP(curso.precio_actual) }}
                         </span>
                    </template>
                </div>
            </div>

            <v-btn
                block
                large
                elevation="4"
                :color="formatCOP(curso.precio_actual) === 0 ? '#00C853' : 'primary'"
                class="white--text font-weight-bold rounded-lg py-6 glow-button transition-scale"
                @click.stop="iniciarCurso(curso)"
            >
                <span class="mr-2 text-uppercase ls-1" style="font-size: 0.95rem;">
                    Iniciar Gratis
                </span>
                <v-icon small right>
                    mdi-play-circle
                </v-icon>
            </v-btn>

        </div>
    </div>

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

        cursosList.value = data.data.data;

        cursosResponse.value = data.data;
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

/* --- 1. Tarjeta General --- */
.master-card {
  background: white;
  color: #263238;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Efecto rebote muy sutil */
}

.master-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1) !important;
  border-color: transparent;
}



.course-image {
  transition: transform 0.6s ease;
}

.master-card:hover .course-image {
  transform: scale(1.08); /* Zoom lento */
}

.gradient-overlay {
  background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%);
}

.backdrop-blur {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

/* --- 3. Botón Play con Pulso --- */
.play-pulse-circle {
  width: 56px;
  height: 56px;
  border-radius: 10%;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
}

/* Animación al hacer hover en la tarjeta */
.master-card:hover .play-pulse-circle {
  background: var(--v-primary-base); /* Cambia al color primario */
  border-color: var(--v-primary-base);
  transform: scale(1.1);
  box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.2); /* Efecto de onda */
}

/* --- 4. Texto --- */
.title-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.desc-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.ls-1 {
  letter-spacing: 1px !important;
}

/* --- 5. Botón Glow (Brillo) --- */
.glow-button {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* Brillo interior */
.glow-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: 0.5s;
}

.master-card:hover .glow-button::after {
  left: 100%; /* Efecto de luz pasando por el botón */
}

.dashed-border {
  border-color: rgba(0,0,0,0.08) !important;
  border-style: dashed;
}
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
