<template>
  <v-dialog v-model="showLoginModal" theme="dark" max-width="400" persistent>
        

    <v-card v-if="!showRegister" class="rounded-lg">
    <form @submit.prevent="submitLogin">
      <v-card-title class="login-title primary--text d-flex justify-space-between pb-2">
        Inicia tu Aprendizaje
        <v-btn icon color="grey darken-2" @click="toggleLogin">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pt-6 text-center">
       
      <GoogleButton :disabled="loading" />

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
           v-model="email"
           :disabled="loading"
        />

        <v-text-field
        :disabled="loading"
          label="Contraseña"
          outlined
          dense
          v-model="password"
          prepend-inner-icon="mdi-lock-outline"
          color="primary"
          type="password"
        />

        <v-btn block :disabled="loading"     type="submit" :loading="loading" color="primary" class="mt-4 white--text font-weight-bold action-button" v-ripple>
          Acceder
        </v-btn>
        <p
          v-if="error"
          class="has-text-centered is-size-7 error"
          style="margin-top: .9rem; color: #dc2626;"
        >
          {{ error }}
        </p>

<p class="mt-5">¿Aún no tienes cuenta?</p>
        <v-btn variant="outlined" block :disabled="loading" @click="showRegister= !showRegister"     type="button" :loading="loading"  class="mt-0" v-ripple>
          Crear una cuenta
        </v-btn>
       
      </v-card-text>
    </form>
    </v-card>
    <v-card v-else class="rounded-lg">
    <form @submit.prevent="submitRegister">
      <v-card-title class="login-title primary--text d-flex justify-space-between pb-2">
        Crear una cuenta
        <v-btn icon color="grey darken-2" @click="toggleLogin">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pt-6 text-center">
       
      <GoogleButton :disabled="loading" />

        <div class="d-flex align-center my-3">
          <v-divider></v-divider>
          <span class="mx-3 text-caption grey--text">O</span>
          <v-divider></v-divider>
        </div>

        <v-text-field
          label="Nombre Completo"
          outlined
          dense
          prepend-inner-icon="mdi-account-outline"
          color="primary"
           v-model="name"
           :disabled="loading"
        />
        <v-text-field
          label="Correo electrónico"
          outlined
          dense
          prepend-inner-icon="mdi-email-outline"
          color="primary"
           v-model="email"
           :disabled="loading"
        />

        <v-text-field
        :disabled="loading"
          label="Contraseña"
          outlined
          dense
          v-model="password"
          prepend-inner-icon="mdi-lock-outline"
          color="primary"
          type="password"
        />
        
        <v-text-field
        :disabled="loading"
          label="Confirmar Contraseña"
          outlined
          dense
          v-model="rePassword"
          prepend-inner-icon="mdi-lock-outline"
          color="primary"
          type="password"
        />

        <v-btn block :disabled="loading"     type="submit" :loading="loading" color="primary" class="mt-4 white--text font-weight-bold action-button" v-ripple>
          Crear Cuenta
        </v-btn>
        <p class="mt-5">¿Ya tienes cuenta?</p>
        <v-btn variant="outlined" block :disabled="loading" @click="showRegister= !showRegister"     type="button" :loading="loading"  class="mt-0" v-ripple>
          Iniciar sesión
        </v-btn>
        <p
          v-if="error"
          class="has-text-centered is-size-7 error"
          style="margin-top: .9rem; color: #dc2626;"
        >
          {{ error }}
        </p>

       
      </v-card-text>
        </form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import axios from 'axios'
import { push } from 'notivue'

const showLoginModal = useLoginModal();

function toggleLogin() {
  showLoginModal.value = !showLoginModal.value;
  showRegister.value= !showRegister.value
}



const showRegister = ref(false)
const email = ref('')
const password = ref('')
const rePassword = ref('')
const name = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

const submitLogin = async () => {
    loading.value = true
    error.value = ''

    const failedAttemptsKey = 'failed_login_attempts'
    const lockoutKey = 'lockout_until'
    const attemptsWindowKey = 'attempts_window'

    try {

        // Verificar si el usuario está bloqueado
        const lockoutUntil = localStorage.getItem(lockoutKey)
        if (lockoutUntil && new Date() < new Date(lockoutUntil)) {
            const remainingTime = Math.ceil((new Date(lockoutUntil) - new Date()) / 1000)
            error.value = `Demasiados intentos fallidos. Intenta nuevamente en ${remainingTime} segundos.`
            push.error({ title: 'Bloqueado', message: error.value, duration: 3000 })
            return
        }

        // Verificar si se excedieron los intentos por minuto
        const attemptsWindow = JSON.parse(localStorage.getItem(attemptsWindowKey)) || []
        const currentTime = new Date().getTime()
        const oneMinuteAgo = currentTime - 60 * 1000

        // Filtrar intentos dentro del último minuto
        const recentAttempts = attemptsWindow.filter(attempt => attempt > oneMinuteAgo)
        if (recentAttempts.length >= 5) {
            error.value = 'Demasiados intentos en un minuto. Intenta nuevamente más tarde.'
            push.error({ title: 'Límite alcanzado', message: error.value, duration: 3000 })
            return
        }

        const { data } = await axios.post(URL_BASE_API + '/v1/auth/login', {
            email: email.value,
            password: password.value
        })

        

        // Restablecer intentos fallidos y ventana de intentos en caso de éxito
        localStorage.removeItem(failedAttemptsKey)
        localStorage.removeItem(lockoutKey)
        localStorage.removeItem(attemptsWindowKey)

        // Guardar token en localStorage
        localStorage.setItem('token', data.data.access_token)
        localStorage.setItem('token_type', data.data.token_type)
        // 1. Cierra el modal primero para evitar "fantasmas" visuales
        showLoginModal.value = false;

        // 2. Espera un micro-segundo para que la animación de cierre inicie (opcional pero estético)
        await nextTick(); 

        // 3. Navega
        return navigateTo('/escritorio');
    } catch (err) {
        // Incrementar intentos fallidos
        const failedAttempts = parseInt(localStorage.getItem(failedAttemptsKey) || '0', 10) + 1
        localStorage.setItem(failedAttemptsKey, failedAttempts)

        // Registrar intento en la ventana de intentos
        const attemptsWindow = JSON.parse(localStorage.getItem(attemptsWindowKey)) || []
        attemptsWindow.push(new Date().getTime())
        localStorage.setItem(attemptsWindowKey, JSON.stringify(attemptsWindow))

        if (failedAttempts >= 3) {
            // Bloquear usuario por 1 minuto
            const lockoutDuration = 60 * 1000 // 1 minuto en milisegundos
            const lockoutUntilTime = new Date(new Date().getTime() + lockoutDuration)
            localStorage.setItem(lockoutKey, lockoutUntilTime)
            error.value = 'Demasiados intentos fallidos. Intenta nuevamente en 60 segundos.'
            push.error({ title: 'Bloqueado', message: error.value, duration: 3000 })
        } else {
            error.value = err.response?.data?.message || 'Intenta nuevamente'
            push.error({ title: 'Upps!', message: error.value, duration: 3000 })
        }
    } finally {
        loading.value = false
    }
}

const submitRegister= async () => {
    loading.value = true
    error.value = ''

    const failedAttemptsKey = 'failed_login_attempts'
    const lockoutKey = 'lockout_until'
    const attemptsWindowKey = 'attempts_window'

    try {

        // Verificar si el usuario está bloqueado
        const lockoutUntil = localStorage.getItem(lockoutKey)
        if (lockoutUntil && new Date() < new Date(lockoutUntil)) {
            const remainingTime = Math.ceil((new Date(lockoutUntil) - new Date()) / 1000)
            error.value = `Demasiados intentos fallidos. Intenta nuevamente en ${remainingTime} segundos.`
            push.error({ title: 'Bloqueado', message: error.value, duration: 3000 })
            return
        }

        // Verificar si se excedieron los intentos por minuto
        const attemptsWindow = JSON.parse(localStorage.getItem(attemptsWindowKey)) || []
        const currentTime = new Date().getTime()
        const oneMinuteAgo = currentTime - 60 * 1000

        // Filtrar intentos dentro del último minuto
        const recentAttempts = attemptsWindow.filter(attempt => attempt > oneMinuteAgo)
        if (recentAttempts.length >= 5) {
            error.value = 'Demasiados intentos en un minuto. Intenta nuevamente más tarde.'
            push.error({ title: 'Límite alcanzado', message: error.value, duration: 3000 })
            return
        }

        if (password.value !== rePassword.value) {
            error.value = 'Las contraseñas no coinciden.'
            push.error({ title: 'Error', message: error.value, duration: 3000 })
            return
        }

        const { data } = await axios.post(URL_BASE_API + '/v1/auth/register', {
            email: email.value,
            password: password.value,
            name: name.value,
            role: 'email'
        })

        

        // Restablecer intentos fallidos y ventana de intentos en caso de éxito
        localStorage.removeItem(failedAttemptsKey)
        localStorage.removeItem(lockoutKey)
        localStorage.removeItem(attemptsWindowKey)

        // Guardar token en localStorage
        localStorage.setItem('token', data.data.access_token)
        localStorage.setItem('token_type', data.data.token_type)
        // 1. Cierra el modal primero para evitar "fantasmas" visuales
        showLoginModal.value = false;

        // 2. Espera un micro-segundo para que la animación de cierre inicie (opcional pero estético)
        await nextTick(); 

        // 3. Navega
        return navigateTo('/escritorio');
    } catch (err) {
        // Incrementar intentos fallidos
        const failedAttempts = parseInt(localStorage.getItem(failedAttemptsKey) || '0', 10) + 1
        localStorage.setItem(failedAttemptsKey, failedAttempts)

        // Registrar intento en la ventana de intentos
        const attemptsWindow = JSON.parse(localStorage.getItem(attemptsWindowKey)) || []
        attemptsWindow.push(new Date().getTime())
        localStorage.setItem(attemptsWindowKey, JSON.stringify(attemptsWindow))

        if (failedAttempts >= 3) {
            // Bloquear usuario por 1 minuto
            const lockoutDuration = 60 * 1000 // 1 minuto en milisegundos
            const lockoutUntilTime = new Date(new Date().getTime() + lockoutDuration)
            localStorage.setItem(lockoutKey, lockoutUntilTime)
            error.value = 'Demasiados intentos fallidos. Intenta nuevamente en 60 segundos.'
            push.error({ title: 'Bloqueado', message: error.value, duration: 3000 })
        } else {
            error.value = err.response?.data?.message || 'Intenta nuevamente'
            push.error({ title: 'Upps!', message: error.value, duration: 3000 })
        }
    } finally {
        loading.value = false
    }
}

</script>
