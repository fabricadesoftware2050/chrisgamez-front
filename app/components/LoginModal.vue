<template>
  <v-dialog v-model="showLoginModal" theme="dark" max-width="400" persistent>
    <v-card class="rounded-lg">
      <v-card-title class="login-title primary--text d-flex justify-space-between pb-2">
        Inicia tu Aprendizaje
        <v-btn icon color="grey darken-2" @click="toggleLogin">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pt-6">
        <v-btn variant="elevated" color="red" block class="google-btn-modern white--text font-weight-bold mb-4" 
               @click="loginWithGoogle" v-ripple>
          <v-icon left>mdi-google</v-icon>
          Continuar con Google
        </v-btn>

        <div class="d-flex align-center my-3">
          <v-divider></v-divider>
          <span class="mx-3 text-caption grey--text">O</span>
          <v-divider></v-divider>
        </div>

        <v-text-field
          label="Correo electrónico"
          outlined
          dense
          prepend-inner-icon="mdi-email-outline"
          color="primary"
          class="mb-3"
        />

        <v-text-field
          label="Contraseña"
          outlined
          dense
          prepend-inner-icon="mdi-lock-outline"
          color="primary"
          type="password"
        />

        <v-btn block color="primary" class="mt-4 white--text font-weight-bold action-button" v-ripple>
          Acceder
        </v-btn>

        <p class="text-center mt-3 text-caption grey--text">
          ¿No tienes cuenta? <a href="#" class="primary--text">Regístrate aquí</a>
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
const showLoginModal = useLoginModal();

function toggleLogin() {
  showLoginModal.value = !showLoginModal.value;
}

function loginWithGoogle() {
  console.log("login google");
}
</script>
