<template>
  <v-app-bar 
    flat 
    elevation="3" 
    color="black" 
    class="px-4"
    :class="{ 'blurred': showLoginModal }"
    theme="dark"
  >
    <v-container class="d-flex align-center py-0" style="max-width: 1200px;">
      
      <nuxt-link to="/" class="d-flex align-center text-decoration-none mr-8" style="gap: 10px;">
        <v-avatar size="40" rounded="0">
          <v-img 
            src="https://agenciacristal.com/wp-content/uploads/2025/01/cropped-logofinal_otro-192x192.png" 
            contain
          ></v-img>
        </v-avatar>
        <span class="font-weight-bold text-white text-h6">
          CHRIS GÁMEZ
        </span>
      </nuxt-link>

      <v-spacer class="hidden-md-and-up"></v-spacer>

      <div class="d-flex justify-center hidden-sm-and-down align-center gap-2">
        <v-btn 
          to="/" 
          variant="text" 
          class="text-capitalize text-body-1 font-weight-regular text-white" 
        >
          Inicio
        </v-btn>

        <v-btn 
          to="/cursos" 
          variant="text" 
          class="text-capitalize text-body-1 font-weight-regular text-grey-lighten-1" 
        >
          Cursos
        </v-btn>

        <v-btn 
          to="/blog" 
          variant="text" 
          class="text-capitalize text-body-1 font-weight-regular text-grey-lighten-1" 
        >
          Publicaciones
        </v-btn>

        <v-btn 
          variant="text" 
          class="text-capitalize text-body-1 font-weight-regular text-grey-lighten-1" 
        >
          Sobre mí
        </v-btn>
      </div>

      <v-spacer class="hidden-sm-and-down"></v-spacer>

      <v-btn 
        variant="flat" 
        color="white"
        class="text-capitalize font-weight-bold ml-4 text-black px-6" 
        rounded="pill"
        @click="toggleLogin" 
      >
        <v-icon start size="small">mdi-login</v-icon>
        Ingresar
      </v-btn>

    </v-container>
  </v-app-bar>

  <LoginModal />
</template>

<script setup>
const showLoginModal = useLoginModal();

function toggleLogin() {
  showLoginModal.value = !showLoginModal.value;
}
</script>

<style scoped>
/* Opcional: Si quieres que el menú se vea 'vidrioso' (glassmorphism) en lugar de transparente total */
/*
.v-app-bar {
  background: rgba(0, 0, 0, 0.2) !important;
  backdrop-filter: blur(10px);
}
*/
</style>