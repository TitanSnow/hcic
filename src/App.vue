<template>
  <div class="hola-container">
    <div class="hola-columns hola-card-stack">
      <div class="hola-columns-item">
        <div class="hola-card ctrl-card">
          <form>
            <p>
              <label>
                <span>Quality:</span>
                <input type="range" min="0" max="1" step="0.01" v-model.number="config.level" class="hola-form-ctrl">
                <input type="number" min="0" max="1" step="0.01" v-model.number="config.level" class="hola-form-ctrl">
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
                </select>
              </label>
            </p>
          </form>
        </div>
      </div>
      <div class="hola-columns-item">
        <div class="hola-card select-card">
          <div title="Drop images here" @dblclick="addImageByDialog">
            <button class="hola-button hola-button-primary material-icons"
              type="button"
              @click="addImageByDialog">
              add_photo_alternate
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  private config = {
    level: 0.92,
    scale: 1,
    type: 'image/webp',
  }
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
    console.log(file)
  }
}
</script>

<style lang="stylus">
.ctrl-card > form > p
  > label
    display flex
    > :first-child
      display flex
      align-items center
      width 7ch
      font-weight bold
    > :last-child
      width 5.5ch
    > :nth-child(2)
      flex-grow 99
      flex-shrink 99
      width 0

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
