<template>
  <div class="hola-columns-item" v-if="!editmode">
    <div class="hola-card hola-card-with-image image-card">
      <img :src="(compressed || origin).src" :alt="title" class="hola-image"
        style="cursor: pointer" @click="enterEditor">
      <div class="image-headline">
        <span class="image-title" contenteditable="true" spellcheck="false" ref="title">{{ title }}</span>
        <span class="image-actions">
          <button
            class="hola-button hola-button-primary"
            type="button"
            disabled
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
  <div class="hola-container hola-layout-container hola-layout-container-sidebar-right image-editor" v-else>
    <div class="hola-layout-main">
      <div class="hola-card hola-card-full-image">
        <img :src="(compressed || origin).src" :alt="title" class="hola-image"
          :style="compressing ? {} : {cursor: 'zoom-in'}" @click="compressing ? void 0 : showBig()">
      </div>
    </div>
    <div class="hola-layout-sidebar hola-card-stack">
      <div class="hola-card editor-action-card">
        <div class="image-actions">
          <button
            class="hola-button hola-button-primary"
            type="button"
            disabled
            v-if="compressing"><progress-circular indeterminate color="white" :size="18" :width="2"/></button>
          <button
            class="hola-button hola-button-primary material-icons"
            type="button"
            v-else
            @click="download">save_alt</button>
          <button
            class="hola-button material-icons"
            type="button"
            @click="close">exit_to_app</button>
        </div>
      </div>
      <div class="hola-card editor-detail-card">
        <table>
          <tbody>
            <tr>
              <td>Title:</td>
              <td contenteditable="true" spellcheck="false" ref="title">{{ title }}</td>
            </tr>
            <tr>
              <td>Size:</td>
              <td class="diff"><span :class="{ before: compressed }">{{ toKB(origin.size) }}KB</span>{{' '}}<span v-if="compressed" class="after">{{ toKB(compressed.size) }}KB</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="hola-card editor-ctrl-card">
        <config-form :config="config"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import debounce from 'lodash/debounce'
import { extension as getExtnameByMime } from 'mime-types'
import { saveAs } from 'file-saver'
import VProgressCircular from 'vuetify/src/components/VProgressCircular/VProgressCircular'
import { Config, default as ConfigForm } from '@/components/ConfigForm.vue'

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
          this.config.compress ? this.config.level : void 0
        )
        return bitmap
      })
    })
  }
}

@Component({components: {'progress-circular': VProgressCircular, ConfigForm}})
export default class ImgView extends Vue {
  @Prop()
  private file!: File
  @Prop()
  private config!: Config
  @Prop({ default: false })
  private editmode!: boolean
  private compressed: ImgState | null = null
  private session: Session | null = null
  private compressedWH: ImgWH | null = null
  private originWH: ImgWH | null = null
  private compressing: boolean = true
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
  private download() {
    saveAs(this.getDownloadBlob()!, this.generateFilename())
  }
  private close() {
    this.$emit('close')
  }
  private enterEditor() {
    this.$emit('request-editmode')
  }
  private showBig() {
    window.open(this.compressed!.src, '_blank')
  }
}
</script>

<style lang="stylus">
diff-before()
  text-decoration line-through
  color #EF5350
diff-after()
  color #66BB6A
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
      -webkit-transform translateZ(0)
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
        diff-before()
    > div.after
      > span
        diff-after()
    no-diff()
      text-decoration inherit
      color inherit
    > div.before, > div.after
      > span.no-diff
        no-diff()
    > div.before.no-diff, > div.after.no-diff
      > span
        no-diff()
.hola-button[disabled]
  box-shadow none
.image-editor
  .editor-action-card
    > .image-actions
      display flex
      > button
        margin 0
        display flex
        justify-content space-around
        align-items center
        width 72px
  .editor-detail-card
    > table > tbody > tr
      > td:first-child
        font-weight 600
        width 7ch
      > td.diff
        > span.before
          diff-before()
        > span.after
          diff-after()
      > td
        vertical-align baseline
</style>
