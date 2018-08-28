<template>
  <div class="hola-columns-item">
    <div class="hola-card hola-card-with-image image-card">
      <img :src="(compressed || origin).src" :alt="title" class="hola-image">
      <div class="image-headline">
        <span class="image-title" contenteditable="true" spellcheck="false" ref="title">{{ title }}</span>
        <span class="image-actions">
          <button
            class="hola-button hola-button-primary"
            type="button"
            v-if="compressing"><progress-circular indeterminate color="white" :size="18" :width="2"/></button>
          <button
            class="hola-button hola-button-primary material-icons"
            type="button"
            v-else
            @click="download">save_alt</button>
          <button
            class="hola-button material-icons"
            type="button"
            @click="close">close</button>
        </span>
      </div>
      <div class="image-info">
        <div :class="{
          'before': true,
          'no-diff': !compressed
        }">
          <span class="size">{{ toKB(origin.size) }}KB</span>
          <span :class="{
            'wh': true,
            'no-diff': whNoChange,
          }" v-if="originWH">{{ originWH.width }}x{{ originWH.height }}</span>
        </div>
        <div class="after" v-if="compressed">
          <span class="size">{{ toKB(compressed.size) }}KB</span>
          <span class="wh" v-if="compressedWH" v-show="!whNoChange">{{ compressedWH.width }}x{{ compressedWH.height }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import debounce from 'lodash/debounce'
import { extension as getExtnameByMime } from 'mime-types'
import { saveAs } from 'file-saver'
import { default as VProgressCircular } from 'vuetify/src/components/VProgressCircular'
import { Config } from '@/App.vue'

interface ImgWH {
  readonly width: number
  readonly height: number
}
class ImgState {
  public readonly blob: Blob
  public readonly src: string
  public readonly whPromise: Promise<ImgWH>
  public readonly bitmapPromise: Promise<ImageBitmap>
  public get size() {
    return this.blob.size
  }
  constructor(blob: Blob) {
    this.blob = blob
    this.src = URL.createObjectURL(blob)
    this.bitmapPromise = createImageBitmap(blob)
    this.whPromise = new Promise(resolve => {
      this.bitmapPromise.then(bitmap => {
        resolve({
          width: bitmap.width,
          height: bitmap.height
        })
        return bitmap
      })
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
      this.origin.bitmapPromise.then(bitmap => {
        const canvas = document.createElement('canvas')
        const config = this.config
        const w = (canvas.width = Math.max(1, Math.round(bitmap.width * config.scale)))
        const h = (canvas.height = Math.max(1, Math.round(bitmap.height * config.scale)))
        const context = canvas.getContext('2d')!
        context.drawImage(bitmap, 0, 0, w, h)
        canvas.toBlob(
          blob => {
            resolve(new ImgState(blob!))
          },
          this.config.type,
          this.config.level
        )
        return bitmap
      })
    })
  }
}

@Component({components: {'progress-circular': VProgressCircular}})
export default class ImgView extends Vue {
  @Prop()
  private file!: File
  @Prop()
  private config!: Config
  private compressed: ImgState | null = null
  private session: Session | null = null
  private compressedWH: ImgWH | null = null
  private originWH: ImgWH | null = null
  private compressing: boolean = true
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
      this.compressing = true
      const session = this.session
      const compress = session.compress()
      const originWH = await session.origin.whPromise
      if (session === this.session) {
        this.originWH = originWH
      } else {
        return
      }
      const compressed = await compress
      const compressedWH = await compressed.whPromise
      if (session === this.session) {
        this.compressed = compressed
        this.compressedWH = compressedWH
        this.compressing = false
      }
    }
  }
  private created() {
    const debouncedUpdateSession = debounce(this.updateSession.bind(this), 50)
    this.$watch('origin', debouncedUpdateSession, { immediate: true })
    this.$watch('config', debouncedUpdateSession, { deep: true })
  }
  private toKB(size: number) {
    return Math.round(size / 10.24) / 100
  }
  private get whNoChange() {
    return (
      this.originWH &&
      this.compressedWH &&
      (this.originWH.width === this.compressedWH.width &&
        this.originWH.height === this.compressedWH.height)
    )
  }
  public getDownloadBlob() {
    if (!this.compressing) {
      return this.compressed!.blob
    }
  }
  public generateFilename() {
    const title = (this.$refs.title as Element).textContent
    const shuffix = '.' + getExtnameByMime(this.compressed!.blob.type)
    if (title) {
      return title + shuffix
    } else {
      return this.$vnode.key + shuffix
    }
  }
  private download() {
    saveAs(this.getDownloadBlob()!, this.generateFilename())
  }
  private close() {
    this.$emit('close')
  }
}
</script>

<style lang="stylus">
.image-card
  .image-headline
    width 100%
    display flex
    justify-content space-between
    align-items center
    margin-bottom .5em
    > .image-title
      font-weight 500
      white-space nowrap
      overflow hidden
      flex-shrink 1
    > .image-actions
      flex-shrink 0
      margin-left 1ch
      display flex
      > button
        padding 5px 10px
        margin 0
        width 44px
        display flex
        justify-content space-around
        align-items center
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
      > span
        text-decoration line-through
        color #EF5350
    > div.after
      > span
        color #66BB6A
    no-diff()
      text-decoration inherit
      color inherit
    > div.before, > div.after
      > span.no-diff
        no-diff()
    > div.before.no-diff, > div.after.no-diff
      > span
        no-diff()
</style>
