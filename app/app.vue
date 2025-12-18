<script setup>
import { Notivue, Notification, push } from 'notivue'
</script>
<template>
  <NuxtLayout>
    <v-app>
      <v-main class="pb-10">
        <NuxtPage :key="$route.fullPath"  />
        <Footer />
      </v-main>
    </v-app>
  </NuxtLayout>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
</template>
<style>
[v-cloak] {
  display: none !important;
}
.notivue-middle-right {
    top: 50% !important;
    right: 50% !important;
    transform: translate(50%, -50%) !important;
}

</style>
