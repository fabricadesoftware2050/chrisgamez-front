<template>
  <v-app-bar
    flat
    elevation="3"
    color="black"
    class="px-4"
    theme="dark"
  >
    <v-container
      class="d-flex align-center justify-space-between py-0"
      style="max-width: 1200px;"
    >

      <!-- LOGO -->
      <nuxt-link
        to="/"
        class="d-flex align-center text-decoration-none"
        style="gap: 10px;"
      >
        <v-avatar size="40" rounded="0">
          <v-img src="~/assets/img/image.png" contain></v-img>
        </v-avatar>

        <span class="font-weight-bold text-white text-h6 hidden-sm-and-down">
          CHRIS GÁMEZ
        </span>
      </nuxt-link>

      <!-- MENÚ DESKTOP -->
      <div class="hidden-sm-and-down d-flex align-center" style="gap: 16px;">
        <v-btn to="/" variant="text" class="text-white">Inicio</v-btn>
        <v-btn to="/cursos" variant="text" class="text-grey-lighten-1">Cursos</v-btn>
        <v-btn to="/blog" variant="text" class="text-grey-lighten-1">Publicaciones</v-btn>
      </div>

      <!-- ACCIONES DESKTOP -->
      <div class="hidden-sm-and-down d-flex align-center" style="gap: 12px;">
        <!-- NO LOGUEADO -->
        <v-btn
          v-if="!currentSession?.name"
          variant="flat"
          color="white"
          class="text-black px-6"
          rounded="pill"
          @click="toggleLogin"
        >
          <v-icon start size="small">mdi-login</v-icon>
          Ingresar
        </v-btn>

        <!-- LOGUEADO -->
        <v-btn
          v-if="currentSession?.name"
          color="primary-custom"
          variant="flat"
          prepend-icon="mdi-account-circle"
        >
          {{ currentSession?.name }}
        </v-btn>

        <v-btn
          v-if="currentSession?.name"
          @click="logout"
          color="red"
          variant="flat"
          prepend-icon="mdi-logout"
        >
          Salir
        </v-btn>
      </div>

      <!-- BOTÓN HAMBURGUESA (MÓVIL) -->
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = true"
      ></v-app-bar-nav-icon>

    </v-container>
  </v-app-bar>

  <!-- DRAWER MOBILE -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    color="black"
  >
    <v-list-item>
      <v-list-item-title class="text-h6 text-white">Menú</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <!-- Menú -->
    <v-list>
      <v-list-item to="/" title="Inicio" />
      <v-list-item to="/cursos" title="Cursos" />
      <v-list-item to="/blog" title="Publicaciones" />
    </v-list>

    <v-divider></v-divider>

    <div class="pa-4">

      <!-- LOGIN MOBILE -->
      <v-btn
        v-if="!currentSession?.name"
        block
        color="white"
        class="text-black mb-2"
        @click="toggleLogin"
      >
        Ingresar
      </v-btn>

      <!-- USUARIO LOGUEADO -->
      <v-btn
        v-if="currentSession?.name"
        block
        color="primary-custom"
        class="mb-2"
        prepend-icon="mdi-account-circle"
      >
        {{ currentSession?.name }}
      </v-btn>

      <v-btn
        v-if="currentSession?.name"
        block
        color="red"
        prepend-icon="mdi-logout"
        @click="logout"
      >
        Salir
      </v-btn>

    </div>
  </v-navigation-drawer>

  <LoginModal />
</template>

<script setup>
import { useRouter } from 'vue-router'

const drawer = ref(false)
const currentSession = useSession()
const showLoginModal = useLoginModal()
const router = useRouter()

function toggleLogin() {
  showLoginModal.value = true
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('token_type')
  currentSession.value = {}
  router.push('/')
}
</script>
