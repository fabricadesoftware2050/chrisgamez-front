<template>
  <v-dialog v-model="showQuestionModal" max-width="800" persistent>
    <v-card class="rounded-lg">
      <v-card-title class="d-flex justify-space-between align-center">
        Agregar pregunta o comentario
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <!-- Título -->
        <v-text-field
          label="Título "
          v-model="form.title"
          outlined
          dense
          :disabled="loading"
        />

        <!-- Descripción -->
        <div class="mt-4">
          <label class="text-caption grey--text mb-1 d-block">
            Descripción de la pregunta
          </label>

          <ClientOnly>
            <QuillEditor
              v-model:content="form.content"
              content-type="html"
              theme="snow"
              :toolbar="toolbar"
              style="min-height: 200px"
            />
          </ClientOnly>
        </div>

        <v-alert
          v-if="error"
          type="error"
          variant="tonal"
          class="mt-4"
        >
          {{ error }}
        </v-alert>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="outlined" @click="close" :disabled="loading">
          Cancelar
        </v-btn>
        <v-btn color="primary" :loading="loading" @click="saveQuestion">
          Guardar pregunta
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import axios from 'axios'
import { push } from 'notivue'

const showQuestionModal = useQuestionModal()

/* Props */
const props = defineProps({
  lesson_id: {
    type: Number,
    required: true
  },
  lesson_url: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['saved'])

/* State */
const loading = ref(false)
const error = ref('')

const form = reactive({
  title: '',
  content: ''
})

/* Toolbar simple */
const toolbar = [
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
  ['clean']
]

/* Methods */
const close = () => {
  showQuestionModal.value = false
}

const resetForm = () => {
  form.title = ''
  form.content = ''
  error.value = ''
}

const saveQuestion = async () => {
  if (!form.title || !form.content || !props.lesson_url) {
    error.value = 'Completa el título, la descripción y la URL de la lección'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await axios.post(
      `${URL_BASE_API}/v1/questions/${props.lesson_id}`,
      {
        title: form.title,
        content: form.content,
        lesson_url: props.lesson_url
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    push.success({
      title: 'Pregunta creada',
      message: 'La pregunta fue guardada correctamente'
    })

    emit('saved')
    close()
    resetForm()
  } catch (err) {
    error.value =
      err.response?.data?.message || 'Error al guardar la pregunta'
    push.error({
      title: 'Error',
      message: error.value
    })
  } finally {
    loading.value = false
  }
}

/* Reset al cerrar */
watch(showQuestionModal, (val) => {
  if (!val) resetForm()
})

onMounted(() => {
  form.lesson_url = props.lesson_url
})
</script>
