<template>
  <div class="hola-columns-item">
    <div class="hola-card hola-card-with-image image-card">
      <img :src="beforeUrl" :alt="beforeName" class="hola-image">
      <p class="image-title">{{ beforeName }}</p>
      <p class="image-info">
        <span class="image-size">{{ beforeSizeInKB }}KB</span>
        <span class="image-wh" v-if="beforeWidth != null && beforeHeight != null">{{ beforeWidth }}x{{ beforeHeight }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class ImgView extends Vue {
  @Prop()
  private level!: number
  @Prop()
  private scale!: number
  @Prop()
  private type!: string
  @Prop()
  private file!: File
  private beforeWidth: number | null = null
  private beforeHeight: number | null = null
  private get beforeSize() {
    return this.file.size
  }
  private get beforeUrl() {
    return URL.createObjectURL(this.file)
  }
  private get beforeName() {
    return this.file.name
  }
  private toKB(size: number) {
    return Math.round(size / 10.24) / 100
  }
  private get beforeSizeInKB() {
    return this.toKB(this.beforeSize)
  }
  @Watch('beforeUrl', { immediate: true })
  private onBeforeUrlChange(url: string) {
    const imgElem = new Image()
    imgElem.src = url
    imgElem.onload = () => {
      this.beforeWidth = imgElem.width
      this.beforeHeight = imgElem.height
    }
  }
}
</script>

<style lang="stylus">
.image-card
  p
    margin-bottom .5em
  .image-title
    font-weight 500
  .image-info
    display flex
    justify-content space-between
</style>
