<template>
  <div class="hola-container" v-if="editingImage === null">
    <div class="hola-columns hola-card-stack">
      <div class="hola-columns-item">
        <div class="hola-card ctrl-card">
          <config-form :config="config"/>
          <div class="global-actions">
            <button
              class="hola-button hola-button-primary"
              type="button"
              :disabled="images.length === 0"
              @click="downloadAll">Download All</button>
            <button
              class="hola-button"
              type="button"
              @click="clearAll">Clear All</button>
          </div>
        </div>
      </div>
      <div class="hola-columns-item">
        <div class="hola-card select-card">
          <div title="Drop images here"
            @dblclick="addImageByDialog"
            @dragover.prevent="void 0"
            @drop.prevent="addImageFiles($event.dataTransfer.files)">
            <button class="hola-button hola-button-primary material-icons"
              type="button"
              @click="addImageByDialog">
              add_photo_alternate
            </button>
          </div>
        </div>
      </div>
      <img-view
        :config="config"
        :filters="filters"
        :file="img.file"
        :key="img.key"
        v-for="img in images"
        @close="removeImage(img)"
        @request-editmode="editingImage = img"
        :ref="`img-views`"/>
    </div>
  </div>
  <img-view
    :config="config"
    :filters="filters"
    :file="editingImage.file"
    :key="editingImage.key"
    :editmode="true"
    @close="editingImage = null"
    v-else/>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import nanoid from 'nanoid'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import ImgView from '@/components/ImgView.vue'
import { Config, default as ConfigForm } from '@/components/ConfigForm.vue'
import { Filters } from '@/components/FilterForm.vue'
import { shallowClone, deepClone } from '@/utils'

function isSupportWebP() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  return canvas.toDataURL('image/webp').startsWith('data:image/webp;')
}

class Image {
  constructor(public readonly file: File, public readonly key = nanoid()) {}
}

const defaultConfig: Config = {
  level: 0.92,
  scale: 1,
  type: isSupportWebP() ? 'image/webp' : 'image/jpeg',
  compress: true,
  smooth: 'high',
}
const defaultFilters: Filters = {
  css: [],
}

const compressableMime = ['image/webp', 'image/jpeg']

@Component({ components: { ImgView, ConfigForm } })
export default class App extends Vue {
  private config: Config = shallowClone(defaultConfig)
  private readonly images: Image[] = []
  private editingImage: Image | null = null
  private filters: Filters = deepClone(defaultFilters)

  private createFileInputElement() {
    const elem = document.createElement('input')
    elem.type = 'file'
    elem.multiple = true
    elem.accept = 'image/*'
    return elem
  }
  private addImageByDialog() {
    const fileinput = this.createFileInputElement()
    fileinput.onchange = () => {
      if (fileinput.files) {
        this.addImageFiles(fileinput.files)
      }
    }
    fileinput.click()
  }
  private addImageFiles(files: FileList | File[]) {
    for (const file of files) {
      this.addImageFile(file)
    }
  }
  private addImageFile(file: File) {
    this.images.push(new Image(file))
  }
  private removeImage(img: Image) {
    this.images.splice(this.images.indexOf(img), 1)
  }
  private resetConfig() {
    this.config = shallowClone(defaultConfig)
  }
  private resetFilters() {
    this.filters = deepClone(defaultFilters)
  }
  private clearAll() {
    this.images.splice(0)
    this.resetConfig()
    this.resetFilters()
  }
  private async downloadAll() {
    const zip = new JSZip()
    for (const imgView of this.$refs['img-views'] as ImgView[]) {
      const blob = imgView.getDownloadBlob()
      if (blob) {
        const filename = imgView.generateFilename()
        zip.file(filename, blob)
      }
    }
    saveAs(await zip.generateAsync({ type: 'blob' }))
  }
  @Watch('config.type')
  private onTypeChange(type: string) {
    this.config.compress = compressableMime.includes(type)
  }
}
</script>

<style lang="stylus">
.ctrl-card
  > form
    margin-bottom 1.3em
  > .global-actions
    display flex
    width 100%
    > button
      width 50%
      font-family inherit

.select-card > div
  border var(--hola-primary-color) 7px dashed
  box-sizing border-box
  width 100%
  height 150px
  display flex
  align-items center
  user-select none
  > button
    margin auto

slider-thumb()
  appearance none
  height 1.5em
  width 12px
  background-color buttonface
  box-shadow inset 0 0 0 0 #fff
  transition box-shadow .3s ease
  border-radius 0
  border 1px solid #ddd
  box-sizing border-box
  &:hover, &:active
    box-shadow inset 0 0 0 1.5em hsla(0, 0%, 100%, .5)
input[type=range].hola-form-ctrl
  &::-webkit-slider-thumb
    slider-thumb()
  &::-moz-range-thumb
    slider-thumb()
    background var(--hola-primary-color)
    border none
  &::-moz-range-track
    appearance none
    background transparent
  &::-moz-range-progress
    background buttonface
    appearance none
    height 1.5em
    border none
    border-radius 0
</style>
