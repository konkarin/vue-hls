<script setup lang="ts">
import { ref } from 'vue'
import { useHls } from './composables/useHls'

const videoRef = ref<HTMLVideoElement | null>(null)
const src = ref('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')
const play = () => {
  if (videoRef.value === null) {
    return
  }

  videoRef.value.play()
}

useHls(videoRef, src, play)
</script>

<template>
  <main>
    <video ref="videoRef" muted playsinline></video>
  </main>
</template>

<style>
video {
  width: 100%;
}
</style>
