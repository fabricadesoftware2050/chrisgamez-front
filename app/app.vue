<script setup>
import { Notivue, Notification, push } from 'notivue'
</script>
<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage :key="$route.fullPath" />
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
</style>
