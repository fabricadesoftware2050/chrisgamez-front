<template>
  
    <v-container class="d-flex flex-column align-center justify-center text-center" style="height:100vh;">
          <AppBar />

      <v-icon size="140" color="primary">mdi-emoticon-dead-outline</v-icon>

      <h1 class="text-h3 font-weight-bold mt-6">
        {{ error.statusCode === 404 ? 'Página no encontrada' : 'Error inesperado' }}
      </h1>

      <p class="text-subtitle-1 mt-3 mb-8">
        {{ error.message }}
      </p>

      <v-btn color="primary" @click="goHome">
        Volver al inicio
      </v-btn>

    </v-container>
 
</template>

<script setup>
const props = defineProps(['error'])
const goHome = () => navigateTo('/')
</script>
