<template>
  <form>
    <p>
      <label>
        <span>Quality:</span>
        <input type="range" min="0" max="1" step="0.01" v-model.number="config.level" class="hola-form-ctrl" :disabled="!config.compress">
        <input type="number" min="0" max="1" step="0.01" v-model.number="config.level" class="hola-form-ctrl" :disabled="!config.compress">
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

export interface Config {
  level: number
  scale: number
  type: string
  compress: boolean
}

@Component
export default class ConfigForm extends Vue {
  @Prop()
  private config!: Config
}
</script>

<style lang="stylus" scoped>
label
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
</style>
