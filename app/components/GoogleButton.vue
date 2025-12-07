<script setup lang="ts">
import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
const showLoginModal = useLoginModal();
const loading = ref(false);
// handle success event
const handleLoginSuccess = async(response: CredentialResponse) => {
    loading.value = true;
    try {
        const { credential } = response;
    const user:any = jwtDecode(credential||'') || {}
    if(user.name && user.email){
        
             const { data } = await axios.post(URL_BASE_API + '/v1/auth/register', {
                name: user.name,
                email: user.email,
                password: user.email,
                role: 'gmail'
            })

            // Guardar token en localStorage
        localStorage.setItem('token', data.data.access_token)
        localStorage.setItem('token_type', data.data.token_type)
        // 1. Cierra el modal primero para evitar "fantasmas" visuales
        showLoginModal.value = false;

        // 2. Espera un micro-segundo para que la animación de cierre inicie (opcional pero estético)
        await nextTick(); 

        // 3. Navega
        return navigateTo('/escritorio');
            
        
    }
    } catch (error) {
        console.error("Error during Google login:", error);
    }finally {
        loading.value = false;
    }

};

// handle an error event
const handleLoginError = (err:any) => {
  console.error("Login failed", err);
};
</script>

<template>
  <GoogleSignInButton v-if="!loading"
    @success="handleLoginSuccess"
    @error="handleLoginError"
  ></GoogleSignInButton>
  <v-progress-circular v-else
      color="green"
      indeterminate
    ></v-progress-circular>
</template>
