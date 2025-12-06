<template>
  <video
    ref="videoRef"
    preload="auto"
    playsinline
    autoplay
    controls
    controlsList="nodownload"
    class="w-100 h-100 border-0 video-js"
    disablePictureInPicture
  oncontextmenu="return false;"
  ></video>
</template>

<script setup>
const props = defineProps({
  src: { type: String, required: true },

})
const videoRef = ref(null)
const { $plyr } = useNuxtApp()
const isYoutube = ref(null)


onMounted(() => {
  isYoutube.value = props.src.includes('embed')
  const player = $plyr(videoRef.value, {
    src: props.src,
    controls: [
    'play-large',
    'play',
    'progress',
    'current-time',
    'mute',
    'volume',
    'captions',
    'settings',
    'pip',
    'airplay',
    'fullscreen',
    'preload'
  ],
  settings: ['quality', 'speed', 'loop'],
  quality: {
    default: 1080,
    options: [1080, 720, 480],
    forced: true
  }
  })

  player.source = {
    type: "video",
    sources: [
      {
        src: props.src,
        type: "video/mp4",
      },
    ],
  }
  
})
</script>

<style>
.plyr {
  --plyr-color-main: #00e6b3; /* Color del tema */
}

</style>