<template>
  <div class="hola-container">
    <div class="hola-columns hola-card-stack">
      <div class="hola-columns-item">
        <div class="hola-card">
          <form>
            <p>
              <label>
                <span>Quality:</span>
                <input type="range" min="0" max="1" step="0.01" v-model.number="level" class="hola-form-ctrl">
                <input type="number" min="0" max="1" step="0.01" v-model.number="level" class="hola-form-ctrl">
              </label>
            </p>
            <p>
              <label>
                <span>Scale:</span>
                <input type="range" min="0" max="2" step="0.01" v-model.number="scale" class="hola-form-ctrl">
                <input type="number" min="0" max="2" step="0.01" v-model.number="scale" class="hola-form-ctrl">
              </label>
            </p>
            <p>
              <label>
                <span>Type:</span>
                <select v-model="type" class="hola-form-ctrl">
                  <option value="image/webp">WebP</option>
                  <option value="image/jpeg">JPEG</option>
                </select>
              </label>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  level = 0.92
  scale = 1
  type = 'image/webp'
}
</script>

<style lang="stylus" scoped>
form
  > p
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
</style>
