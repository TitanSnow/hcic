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
            v-if="compressing"><progress-circular color="white" :size="18"/></button>
          <button
            class="hola-button hola-button-primary material-icons"
            type="button"
            v-else
            @click="download">save_alt</button>
          <button
            class="hola-button hola-button-normal material-icons"
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
          }" v-if="originWH">{{ toReso(originWH) }}</span>
        </div>
        <div class="after" v-if="compressed">
          <span class="size">{{ toKB(compressed.size) }}KB</span>
          <span class="wh" v-if="compressedWH" v-show="!whNoChange">{{ toReso(compressedWH) }}</span>
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
            v-if="compressing"><progress-circular color="white" :size="18"/></button>
          <button
            class="hola-button hola-button-primary material-icons"
            type="button"
            v-else
            @click="download">save_alt</button>
          <button
            class="hola-button hola-button-normal material-icons"
            type="button"
            @click="close">exit_to_app</button>
          <button
            class="hola-button hola-button-normal material-icons"
            type="button"
            :disabled="currentConfigHistoryIdx == 0"
            @click="undo">undo</button>
          <button
            class="hola-button hola-button-normal material-icons"
            type="button"
            :disabled="currentConfigHistoryIdx == configHistory.length - 1"
            @click="redo">redo</button>
        </div>
      </div>
      <div class="hola-card editor-ctrl-card">
        <config-form :config="config"/>
      </div>
      <div class="hola-card editor-detail-card">
        <div class="hola-infosheet">
          <div class="hola-infosheet-row">
            <span class="hola-infosheet-key">Title</span>
            <p class="hola-infosheet-value" contenteditable="true" spellcheck="false" ref="title">{{ title }}</p>
          </div>
          <div class="hola-infosheet-row">
            <span class="hola-infosheet-key">Size</span>
            <p class="hola-infosheet-value diff">
              <span :class="{ before: compressed }">{{ toKB(origin.size) }}KB</span>{{' '}}
              <span v-if="compressed" class="after">{{ toKB(compressed.size) }}KB</span>
            </p>
          </div>
          <div class="hola-infosheet-row" v-if="originWH">
            <span class="hola-infosheet-key">Reso</span>
            <p class="hola-infosheet-value diff">
              <span :class="{ before: compressedWH && !whNoChange }">{{ toReso(originWH) }}</span>{{' '}}
              <span v-if="compressedWH && !whNoChange" class="after">{{ toReso(compressedWH )}}</span>
            </p>
          </div>
          <div class="hola-infosheet-row">
            <span class="hola-infosheet-key">Date</span>
            <p class="hola-infosheet-value">{{ toDate(origin.blob.lastModified) }}</p>
          </div>
        </div>
      </div>
      <filter-form class="hola-card editor-filter-card" :filters="filters"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import debounce from 'lodash/debounce'
import { saveAs } from 'file-saver'
import ProgressCircular from '@/components/ProgressCircular.vue'
import { Config, default as ConfigForm } from '@/components/ConfigForm.vue'
import { Filters, default as FilterForm } from '@/components/FilterForm.vue'
import { shallowClone, shallowEqual } from '@/utils'

const CompressWorker = require('worker-loader!@/worker/compress')

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
          height: bitmap.height,
        })
        return bitmap
      })
    })
  }
}
class Session {
  constructor(
    public readonly origin: ImgState,
    public readonly config: Config,
    public readonly filters: Filters
  ) {}
  public compress(): Promise<ImgState> {
    return new Promise(resolve => {
      this.origin.bitmapPromise.then(bitmap => {
        if ('OffscreenCanvas' in (window as any)) {
          const worker = new CompressWorker()
          worker.postMessage({
            config: this.config,
            filters: this.filters,
            bitmap: bitmap
          })
          worker.onmessage = (e: any) => {
            resolve(new ImgState(e.data as Blob))
          }
        } else {
          const canvas = document.createElement('canvas')
          const config = this.config
          const w = (canvas.width = Math.max(
            1,
            Math.round(bitmap.width * config.scale)
          ))
          const h = (canvas.height = Math.max(
            1,
            Math.round(bitmap.height * config.scale)
          ))
          const context = canvas.getContext('2d')!
          if (
            (context.imageSmoothingEnabled = config.smooth !== 'disabled') &&
            'imageSmoothingQuality' in (context as any)
          ) {
            ;(context as any).imageSmoothingQuality = config.smooth
          }
          ;(context as any).filter = this.filters.css
            .map(f => f.toCssString())
            .join(' ')
          context.drawImage(bitmap, 0, 0, w, h)
          canvas.toBlob(
            blob => {
              resolve(new ImgState(blob!))
            },
            this.config.type,
            this.config.compress ? this.config.level : void 0
          )
        }
        return bitmap
      })
    })
  }
}

function getExtnameByMime(mime: string) {
  switch(mime) {
    case 'image/webp':
      return 'webp'
    case 'image/jpeg':
      return 'jpg'
    case 'image/png':
      return 'png'
    default:
      throw 'Unknown mime'
  }
}

@Component({
  components: {
    ProgressCircular,
    ConfigForm,
    FilterForm,
  },
})
export default class ImgView extends Vue {
  @Prop()
  private file!: File
  @Prop()
  private config!: Config
  @Prop({ default: false })
  private editmode!: boolean
  @Prop()
  private filters!: Filters
  private compressed: ImgState | null = null
  private session: Session | null = null
  private compressedWH: ImgWH | null = null
  private originWH: ImgWH | null = null
  private compressing: boolean = true
  private configHistory: Config[] = []
  private currentConfigHistoryIdx: number = NaN
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
    this.session = new Session(this.origin, this.config, this.filters)
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
    const debouncedRecordConfigHistory = debounce(
      this.recordConfigHistory.bind(this),
      50
    )
    this.$watch('origin', debouncedUpdateSession, { immediate: true })
    this.$watch(
      'config',
      () => {
        debouncedUpdateSession()
        debouncedRecordConfigHistory()
      },
      { deep: true }
    )
    this.$watch('filters', debouncedUpdateSession, { deep: true })
    this.configHistory.push(shallowClone(this.config))
    this.currentConfigHistoryIdx = 0
  }
  private toKB(size: number) {
    return Math.round(size / 10.24) / 100
  }
  private toReso(wh: ImgWH) {
    return `${wh.width}x${wh.height}`
  }
  private toDate(time: number) {
    return new Date(time).toLocaleString()
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
  private recordConfigHistory() {
    if (
      !shallowEqual(
        this.config,
        this.configHistory[this.currentConfigHistoryIdx]
      )
    ) {
      this.configHistory.splice(this.currentConfigHistoryIdx + 1)
      this.configHistory.push(shallowClone(this.config))
      ++this.currentConfigHistoryIdx
    }
  }
  private undo() {
    Object.assign(
      this.config,
      this.configHistory[--this.currentConfigHistoryIdx]
    )
  }
  private redo() {
    Object.assign(
      this.config,
      this.configHistory[++this.currentConfigHistoryIdx]
    )
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
      > button
        padding 0
        margin 0
        width 44px
        height 34px
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
  cursor not-allowed
.image-editor
  .editor-action-card
    padding 0
    > .image-actions
      display flex
      width 100%
      > button
        margin 0
        display flex
        justify-content space-around
        align-items center
        width 25%
  .editor-detail-card
    .diff
      > .before
        diff-before()
      > .after
        diff-after()
  .editor-filter-card
    font-size .9em
</style>
