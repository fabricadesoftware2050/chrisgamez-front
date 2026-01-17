<template>
  <div class="video-container-wrapper h-100">
    <video
      ref="videoRef"
      preload="auto"
      playsinline
      autoplay
      controls
      controlsList="nodownload"
      class="w-100 h-100 border-0"
      disablePictureInPicture
      oncontextmenu="return false;"
    ></video>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
})

// Emitir evento para avisar al padre del estado de pantalla completa
const emit = defineEmits(['fullscreen-change'])
const videoRef = ref(null)
const { $plyr } = useNuxtApp()
let player = null

onMounted(() => {
  player = $plyr(videoRef.value, {
    controls: [
      'play-large', 'play', 'progress', 'current-time', 
      'mute', 'volume', 'captions', 'settings', 
      'pip', 'airplay', 'fullscreen'
    ],
    settings: ['quality', 'speed', 'loop'],
    quality: {
      default: 1080,
      options: [1080, 720, 480],
      forced: true
    }
  })

  // Escuchar eventos de Plyr
  player.on('enterfullscreen', () => emit('fullscreen-change', true))
  player.on('exitfullscreen', () => emit('fullscreen-change', false))

  player.source = {
    type: "video",
    sources: [{ src: props.src, type: "video/mp4" }]
  }
})

onBeforeUnmount(() => {
  if (player) player.destroy()
})
</script>

<style>
.plyr {
  --plyr-color-main: #00e6b3;
  height: 100%; /* Asegura que Plyr llene el contenedor */
}
.video-container-wrapper {
  background: black;
}
</style>