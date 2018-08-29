<template>
  <form ref="form">
    <p>
      <label>
        <span>Quality:</span>
        <input type="range" min="0" max="1" step="0.01" v-model.number="config.level" class="hola-form-ctrl" :disabled="!config.compress" v-if="!compact">
        <input type="number" min="0" max="1" step="0.01" v-model.number="config.level" class="hola-form-ctrl" :disabled="!config.compress">
      </label>
    </p>
    <p>
      <label>
        <span>Scale:</span>
        <input type="range" min="0" max="2" step="0.01" v-model.number="config.scale" class="hola-form-ctrl" v-if="!compact">
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

declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback)
  public observe(target: Element): void
  public unobserve(target: Element): void
  public disconnect(): void
}
declare type ResizeObserverCallback = (entries: ResizeObserverEntry[], observer: ResizeObserver) => void;
declare interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
};

@Component
export default class ConfigForm extends Vue {
  @Prop()
  private config!: Config
  private compact = false
  private mounted() {
    if (ResizeObserver) {
      const rzob = new ResizeObserver(entries => {
        this.compact = entries[0].contentRect.width < 250
      })
      rzob.observe(this.$refs.form as Element)
    }
  }
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
