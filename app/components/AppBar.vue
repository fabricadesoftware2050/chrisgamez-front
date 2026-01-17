<template>
  <v-app-bar
    flat
    elevation="3"
    color="black"
    class="px-2 px-md-4"
    theme="dark"
  >
    <v-container class="d-flex align-center justify-space-between py-0" fluid>

      <nuxt-link
        to="/"
        class="d-flex align-center text-decoration-none"
        style="gap: 10px;"
      >
        <v-avatar size="40" rounded="0">
          <v-img src="~/assets/img/image.png" contain></v-img>
        </v-avatar>

        <span class="font-weight-bold text-white text-h6 hidden-xs">
          CHRIS GÁMEZ
        </span>
      </nuxt-link>

      <v-spacer></v-spacer>

      <div class="hidden-sm-and-down d-flex align-center" style="gap: 8px;">
        <v-btn to="/" variant="text" class="text-white">Inicio</v-btn>
        <v-btn to="/cursos" variant="text" class="text-grey-lighten-1">Cursos</v-btn>
        <v-btn to="/blog" variant="text" class="text-grey-lighten-1">Publicaciones</v-btn>
      </div>

      <div class="hidden-sm-and-down d-flex align-center ml-2" style="gap: 8px;">
        <v-btn
          v-if="!currentSession?.name"
          variant="flat"
          color="white"
          class="text-black px-4"
          rounded="pill"
          size="small"
          @click="toggleLogin"
        >
          <v-icon start size="small">mdi-login</v-icon>
          Ingresar
        </v-btn>

        <template v-else>
          <v-btn
            color="primary-custom"
            variant="flat"
            size="small"
            prepend-icon="mdi-account-circle"
          >
            {{ currentSession?.name }}
          </v-btn>

          <v-btn
            @click="logout"
            color="red"
            variant="flat"
            size="small"
            icon="mdi-logout"
            class="ml-1"
          ></v-btn>
        </template>
      </div>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

    </v-container>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    temporary
    color="black"
    location="right"
  >
    <v-list-item class="pa-4">
      <v-list-item-title class="text-h6 text-white">Menú</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item to="/" prepend-icon="mdi-home" title="Inicio" @click="drawer = false" />
      <v-list-item to="/cursos" prepend-icon="mdi-school" title="Cursos" @click="drawer = false" />
      <v-list-item to="/blog" prepend-icon="mdi-post" title="Publicaciones" @click="drawer = false" />
    </v-list>

    <v-divider></v-divider>

    <div class="pa-4">
      <v-btn
        v-if="!currentSession?.name"
        block
        color="white"
        class="text-black mb-2"
        @click="toggleLogin(); drawer = false"
      >
        Ingresar
      </v-btn>

      <template v-else>
        <v-btn
          block
          color="primary-custom"
          class="mb-2 text-capitalize"
          prepend-icon="mdi-account-circle"
        >
          {{ currentSession?.name }}
        </v-btn>

        <v-btn
          block
          color="red"
          prepend-icon="mdi-logout"
          @click="logout(); drawer = false"
        >
          Salir
        </v-btn>
      </template>
    </div>
  </v-navigation-drawer>

  <LoginModal />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from "jwt-decode";
import { push } from "notivue"; // Descomenta si usas notivue

const drawer = ref(false)
const currentSession = useSession()
const showLoginModal = useLoginModal()
const router = useRouter()
const token = ref('')
const token_type = ref('')
const toggleLogin = () => showLoginModal.value = true

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('token_type')
  currentSession.value = {}
  router.push('/')
}
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
});
</script>