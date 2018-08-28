<template>
  <div class="hola-container">
    <div class="hola-columns hola-card-stack">
      <div class="hola-columns-item">
        <div class="hola-card ctrl-card">
          <form>
            <p>
              <label>
                <span>Quality:</span>
                <input type="range" min="0" max="1" step="0.01" v-model.number="config.level" class="hola-form-ctrl" :disabled="!compressableMime.includes(config.type)">
                <input type="number" min="0" max="1" step="0.01" v-model.number="config.level" class="hola-form-ctrl" :disabled="!compressableMime.includes(config.type)">
              </label>
            </p>
            <p>
              <label>
                <span>Scale:</span>
                <input type="range" min="0" max="2" step="0.01" v-model.number="config.scale" class="hola-form-ctrl">
                <input type="number" min="0" max="2" step="0.01" v-model.number="config.scale" class="hola-form-ctrl">
              </label>
            </p>
            <p>
              <label>
                <span>Type:</span>
                <select v-model="config.type" class="hola-form-ctrl">
                  <option value="image/webp">WebP</option>
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                </select>
              </label>
            </p>
          </form>
          <div class="global-actions">
            <button
              class="hola-button hola-button-primary"
              type="button"
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
        :file="img.file"
        :key="img.key"
        v-for="img in images"
        @close="removeImage(img)"
        :ref="`img-views`"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import clone from 'lodash/clone'
import nanoid from 'nanoid'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import ImgView from '@/components/ImgView.vue'

function isSupportWebP() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  return canvas.toDataURL('image/webp').startsWith('data:image/webp;')
}

class Image {
  constructor(public readonly file: File, public readonly key = nanoid()) {}
}

export interface Config {
  level: number
  scale: number
  type: string
}

const defaultConfig: Config = {
  level: 0.92,
  scale: 1,
  type: isSupportWebP() ? 'image/webp' : 'image/jpeg',
}

@Component({ components: { ImgView } })
export default class App extends Vue {
  private config: Config = clone(defaultConfig)
  private readonly compressableMime = ['image/webp', 'image/jpeg']
  private readonly images: Image[] = []

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
    this.config = clone(defaultConfig)
  }
  private clearAll() {
    this.images.splice(0)
    this.resetConfig()
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
}
</script>

<style lang="stylus">
.ctrl-card
  > form
    margin-bottom 1.3em
    > p > label
      display flex
      > :first-child
        display flex
        align-items center
        width 7ch
        font-weight bold
      > :last-child
        width 5ch
      > :nth-child(2)
        flex-grow 99
        flex-shrink 99
        width 0
      > .hola-form-ctrl
        height auto
        font-family inherit
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
</style>
