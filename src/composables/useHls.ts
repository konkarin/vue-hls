// NOTE: https://github.com/video-dev/hls.js/issues/5146
import type HlsType from 'hls.js'
// @ts-expect-error
import HlsMin from 'hls.js/dist/hls.min'
const Hls = HlsMin as typeof HlsType

import { onMounted } from 'vue'
import type { Ref } from 'vue'

export function useHls(
  videoRef: Ref<HTMLVideoElement | null>,
  src: Ref<string>,
  onCanPlay = () => {}
) {
  const hls = new Hls()

  // m3u8の読み込みをする。MSEが使えるブラウザではHlsを使う
  const loadHlsMedia = (video: HTMLVideoElement, src: string) => {
    if (Hls.isSupported()) {
      hls.loadSource(src)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
      // 古いiOSではload()しないと正しく動画が初期化されず、再生できない時がある
      video.load()
    }
  }

  onMounted(() => {
    if (videoRef.value === null) {
      return
    }

    // oncanplayイベントのコールバックを設定
    videoRef.value.oncanplay = onCanPlay
    // Hlsの読み込みを開始
    loadHlsMedia(videoRef.value, src.value)
  })
}
