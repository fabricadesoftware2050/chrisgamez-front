<script setup>
import { Notivue, Notification, push } from 'notivue'
</script>
<template>
  <NuxtLayout>
    <v-app>
      <v-main>
        <NuxtPage :key="$route.fullPath"  />
      </v-main>
        <Footer />
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
