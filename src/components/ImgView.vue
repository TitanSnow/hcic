<template>
  <div class="hola-columns-item">
    <div class="hola-card hola-card-with-image image-card">
      <img :src="(compressed || origin).src" :alt="title" class="hola-image">
      <p class="image-title">{{ title }}</p>
      <div class="image-info">
        <div class="before">
          <span class="size">{{ toKB(origin.size) }}KB</span>
          <span class="wh" v-if="originWH">{{ originWH.width }}x{{ originWH.height }}</span>
        </div>
        <div class="after" v-if="compressed">
          <span class="size">{{ toKB(compressed.size) }}KB</span>
          <span class="wh" v-if="compressedWH">{{ compressedWH.width }}x{{ compressedWH.height }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import _ from 'lodash'
import { Config } from '@/App.vue'

interface ImgWH {
  readonly width: number
  readonly height: number
}
function calcImgWH(src: string): Promise<ImgWH> {
  return new Promise(resolve => {
    const imgElem = new Image()
    imgElem.src = src
    imgElem.onload = () => {
      resolve({
        width: imgElem.width,
        height: imgElem.height,
      })
    }
  })
}
class ImgState {
  public readonly blob: Blob
  public readonly src: string
  public wh?: ImgWH = void 0
  public readonly whPromise: Promise<ImgWH>
  public get size() {
    return this.blob.size
  }
  constructor(blob: Blob) {
    this.blob = blob
    this.src = URL.createObjectURL(blob)
    this.whPromise = calcImgWH(this.src).then(wh => {
      return (this.wh = wh)
    })
  }
}
class Session {
  constructor(
    public readonly origin: ImgState,
    public readonly config: Config
  ) {}
  public compress(): Promise<ImgState> {
    return new Promise(resolve => {
      const imgElem = new Image()
      imgElem.src = this.origin.src
      imgElem.onload = () => {
        const canvas = document.createElement('canvas')
        const config = this.config
        const w = (canvas.width = Math.round(imgElem.width * config.scale))
        const h = (canvas.height = Math.round(imgElem.height * config.scale))
        const context = canvas.getContext('2d')!
        context.drawImage(imgElem, 0, 0, w, h)
        canvas.toBlob(
          blob => {
            resolve(new ImgState(blob!))
          },
          this.config.type,
          this.config.level
        )
      }
    })
  }
}

@Component
export default class ImgView extends Vue {
  @Prop()
  private file!: File
  @Prop()
  private config!: Config
  private compressed: ImgState | null = null
  private session: Session | null = null
  private compressedWH: ImgWH | null = null
  private originWH: ImgWH | null = null
  private get origin() {
    return new ImgState(this.file)
  }
  private updateSession() {
    this.session = new Session(this.origin, this.config)
  }
  private get title() {
    return this.file.name
      .split('.')
      .slice(0, -1)
      .join('.')
  }
  @Watch('session', { immediate: true })
  private async compress() {
    if (this.session) {
      const session = this.session
      const compress = session.compress()
      const originWH = await session.origin.whPromise
      if (session === this.session) {
        this.originWH = originWH
      }
      const compressed = await compress
      const compressedWH = await compressed.whPromise
      if (session === this.session) {
        this.compressed = compressed
        this.compressedWH = compressedWH
      }
    }
  }
  private created() {
    const debouncedUpdateSession = _.debounce(this.updateSession.bind(this), 50)
    this.$watch('origin', debouncedUpdateSession, { immediate: true })
    this.$watch('config', debouncedUpdateSession, { deep: true })
  }
  private toKB(size: number) {
    return Math.round(size / 10.24) / 100
  }
}
</script>

<style lang="stylus">
.image-card
  .image-title
    font-weight 500
    margin-bottom .5em
  .image-info
    display table
    width 100%
    > div
      display table-row
      > span
        display table-cell
      > span:last-child
        text-align right
    > div.before
      color red
      > span
        text-decoration line-through
    > div.after
      color green
</style>
