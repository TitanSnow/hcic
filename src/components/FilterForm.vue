<template>
  <div>
    <details>
      <summary>
        <span>CSS Filters</span>
        <button
          type="button"
          class="hola-button hola-button-primary material-icons"
          @click="addCSSFilter">add</button>
      </summary>
      <ul>
        <li v-if="filters.css" v-for="f in filters.css" :key="f.key" class="css-filter">
          <div>
            <span v-once @input="f.functionName = $event.target.textContent" contenteditable="true">{{ f.functionName }}</span>
            <span>(</span>
            <span v-once @input="f.args = $event.target.textContent" contenteditable="true">{{ f.args }}</span>
            <span>)</span>
          </div>
          <button
            type="button"
            class="hola-button material-icons"
            @click="removeCSSFilter(f)">close</button>
        </li>
      </ul>
    </details>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import nanoid from 'nanoid'

const cssFilterFunctions = [
  'blur',
  'brightness',
  'contrast',
  'drop-shadow',
  'grayscale',
  'hue-rotate',
  'invert',
  'opacity',
  'saturate',
  'sepia',
]
type CSSFilterFunction =
  | 'blur'
  | 'brightness'
  | 'contrast'
  | 'drop-shadow'
  | 'grayscale'
  | 'hue-rotate'
  | 'invert'
  | 'opacity'
  | 'saturate'
  | 'sepia'
class CSSFilter {
  constructor(
    public functionName: CSSFilterFunction,
    public args: string,
    public readonly key = nanoid()
  ) {}
  public cssString() {
    return `${this.functionName}(${this.args})`
  }
  public isValidFunctionName() {
    return cssFilterFunctions.includes(this.functionName)
  }
}
export interface Filters {
  css: CSSFilter[]
}

@Component
export default class FilterForm extends Vue {
  @Prop()
  private filters!: Filters
  private addCSSFilter() {
    this.filters.css.push(
      new CSSFilter(
        prompt('function name')! as CSSFilterFunction,
        prompt('args')!
      )
    )
  }
  private removeCSSFilter(f: CSSFilter) {
    const fs = this.filters.css
    fs.splice(fs.indexOf(f), 1)
  }
}
</script>

<style lang="stylus" scoped>
details > summary
  margin-left -1.5ch
  width calc(100% + 1.5ch)
  display flex
  align-items center
  > span
    flex-grow 99
  > button
    padding 0
    margin 0
.css-filter
  display flex
  justify-content space-between
  align-items center
  border-top solid 1px #eee
  > :first-child
    > span:nth-child(1), span:nth-child(2), span:nth-child(4)
      font-weight 500
    > span:nth-child(2), span:nth-child(4)
      font-family monospace
  > button
    padding 0
    margin 0
</style>
