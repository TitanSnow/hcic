<template>
  <div class="filter-form">
    <details>
      <summary>CSS Filters</summary>
      <ul class="css-filter-list">
        <li v-for="f in filters.css" :key="f.key">
          <div>
            <select :value="f.functionName" @input="changeCSSFilterFunction(f, $event.target.value)" class="hola-form-ctrl">
              <option v-for="name in Object.keys(filterInfo.css)" :key="name">{{ name }}</option>
            </select>
            <div class="actions">
              <button
                type="button"
                class="material-icons hola-button"
                @click="removeCSSFilter(f)">close</button>
              <button
                type="button"
                class="material-icons hola-button"
                @click="moveUpCSSFilter(f)">arrow_upward</button>
              <button
                type="button"
                class="material-icons hola-button"
                @click="moveDownCSSFilter(f)">arrow_downward</button>
            </div>
          </div>
          <div v-if="getCSSFilterFunctionArgInfo(f.functionName).type === 'number'">
            <input
              type="range"
              :min="getCSSFilterFunctionArgInfo(f.functionName).min"
              :max="getCSSFilterFunctionArgInfo(f.functionName).max"
              step="0.01"
              class="hola-form-ctrl"
              v-model="f.args">
            <input
              type="number"
              :min="getCSSFilterFunctionArgInfo(f.functionName).min"
              :max="getCSSFilterFunctionArgInfo(f.functionName).max"
              step="0.01"
              class="hola-form-ctrl"
              v-model="f.args">
          </div>
          <div v-else-if="getCSSFilterFunctionArgInfo(f.functionName).type === 'length'">
            <input
              type="range"
              :min="getCSSFilterFunctionArgInfo(f.functionName).min"
              :max="getCSSFilterFunctionArgInfo(f.functionName).max"
              step="0.01"
              class="hola-form-ctrl"
              :value="parseFloat(f.args)"
              @input="f.args = $event.target.value + 'px'">
            <input
              type="text"
              class="hola-form-ctrl"
              v-model="f.args">
          </div>
          <div v-else-if="getCSSFilterFunctionArgInfo(f.functionName).type === 'angle'">
            <input
              type="range"
              :min="getCSSFilterFunctionArgInfo(f.functionName).min"
              :max="getCSSFilterFunctionArgInfo(f.functionName).max"
              step="0.01"
              class="hola-form-ctrl"
              :value="parseFloat(f.args)"
              @input="f.args = $event.target.value + 'deg'">
            <input
              type="text"
              class="hola-form-ctrl"
              v-model="f.args">
          </div>
        </li>
      </ul>
      <button
        type="button"
        class="hola-button font-inherit"
        @click="addCSSFilter">Add Filter</button>
    </details>
    <details @toggle="void ++jsFilterListKey">
      <summary>JS Filters</summary>
      <ul class="js-filter-list" :key="jsFilterListKey">
        <li v-for="f in filters.js" :key="f.key">
          <div>
            <div>'{{ f.type === 'before' ? 'Before' : 'After'}}' Filter</div>
            <div class="actions">
              <button
                type="button"
                class="material-icons hola-button"
                @click="updateJSFilterCode(f)">check</button>
              <button
                type="button"
                class="material-icons hola-button"
                @click="removeJSFilter(f)">close</button>
              <button
                type="button"
                class="material-icons hola-button"
                @click="moveUpJSFilter(f)">arrow_upward</button>
              <button
                type="button"
                class="material-icons hola-button"
                @click="moveDownJSFilter(f)">arrow_downward</button>
            </div>
          </div>
          <monaco :ref="`textarea-${f.key}`" :value="f.code" language="javascript" :options="{ lineNumbers: 'off', minimap: { enabled: false } }" class="js-filter-editor"/>
        </li>
      </ul>
      <button
        type="button"
        class="hola-button font-inherit"
        @click="addJSFilter('before')">Add 'Before' Filter</button>
      <button
        type="button"
        class="hola-button font-inherit"
        @click="addJSFilter('after')">Add 'After' Filter</button>
    </details>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import nanoid from 'nanoid'
import { languages as MonacoLanguages } from 'monaco-editor'
// fuck typescript
const Monaco = require('vue-monaco')
const filterInfo = require('json-loader!yaml-loader!@/data/filters.yml')

MonacoLanguages.typescript.javascriptDefaults.addExtraLib(
  `declare var $canvas: HTMLCanvasElement
declare var $context: CanvasRenderingContext2D
`,
  'hcic.d.ts'
)

class CSSFilter {
  constructor(
    public functionName: string,
    public args: string,
    public readonly key = nanoid()
  ) {}
  public toCssString() {
    return `${this.functionName}(${this.args})`
  }
}
class JSFilter {
  constructor(
    public code: string,
    public type: 'before' | 'after',
    public readonly key = nanoid()
  ) {}
  public toFunction() {
    return Function('$canvas', '$context', this.code)
  }
}
export interface Filters {
  css: CSSFilter[]
  js: JSFilter[]
}

@Component({ components: { Monaco } })
export default class FilterForm extends Vue {
  @Prop()
  private filters!: Filters
  private readonly filterInfo = filterInfo
  private jsFilterListKey = 0
  private addCSSFilter() {
    const argInfo = this.getCSSFilterFunctionArgInfo('blur')
    this.filters.css.push(
      new CSSFilter(
        'blur',
        this.addCSSFilterFunctionArgUnit(argInfo.default, argInfo.type)
      )
    )
  }
  private removeCSSFilter(f: CSSFilter) {
    const fs = this.filters.css
    fs.splice(fs.indexOf(f), 1)
  }
  private moveUpCSSFilter(f: CSSFilter) {
    const fs = this.filters.css
    const idx = fs.indexOf(f)
    if (idx > 0) {
      fs.splice(idx, 1)
      fs.splice(idx - 1, 0, f)
    }
  }
  private moveDownCSSFilter(f: CSSFilter) {
    const fs = this.filters.css
    const idx = fs.indexOf(f)
    if (idx < fs.length - 1) {
      fs.splice(idx, 1)
      fs.splice(idx + 1, 0, f)
    }
  }
  private getCSSFilterFunctionArgInfo(fn: string) {
    return this.filterInfo.css[fn].args[0]
  }
  private addCSSFilterFunctionArgUnit(x: number | string, type: string) {
    switch (type) {
      case 'length':
        return x + 'px'
      case 'angle':
        return x + 'deg'
      case 'number':
      default:
        return x + ''
    }
  }
  private changeCSSFilterFunction(f: CSSFilter, fn: string) {
    if (f.functionName !== fn) {
      f.functionName = fn
      const argInfo = this.getCSSFilterFunctionArgInfo(fn)
      f.args = this.addCSSFilterFunctionArgUnit(argInfo.default, argInfo.type)
    }
  }
  private addJSFilter(type: 'before' | 'after') {
    this.filters.js.push(new JSFilter('', type))
  }
  private removeJSFilter(f: JSFilter) {
    const fs = this.filters.js
    fs.splice(fs.indexOf(f), 1)
  }
  private moveUpJSFilter(f: JSFilter) {
    const fs = this.filters.js
    const idx = fs.indexOf(f)
    if (idx > 0) {
      fs.splice(idx, 1)
      fs.splice(idx - 1, 0, f)
    }
  }
  private moveDownJSFilter(f: JSFilter) {
    const fs = this.filters.js
    const idx = fs.indexOf(f)
    if (idx < fs.length - 1) {
      fs.splice(idx, 1)
      fs.splice(idx + 1, 0, f)
    }
  }
  private updateJSFilterCode(f: JSFilter) {
    f.code = (this.$refs[`textarea-${f.key}`] as any[])[0]
      .getMonaco()
      .getValue()
  }
}
</script>

<style lang="stylus">
.filter-form
  details > summary
    margin-left -1.5ch
    font-weight bold
  ul.css-filter-list
    margin-bottom 1em
    > li
      display flex
      width 100%
      margin-top 1em
      .hola-form-ctrl
        font-family inherit
        font-size inherit
      > :first-child
        width 11ch
        display flex
        flex-direction column
        > .hola-form-ctrl:first-child
          border-right none
      > :last-child
        width calc(100% - 11ch)
        display flex
        flex-direction column
        > .hola-form-ctrl:first-child
          border-bottom none
  ul.js-filter-list
    margin-bottom 1em
    > li
      display block
      margin-top 1em
      > div:first-child
        display flex
        align-items center
        justify-content space-between
        > :first-child
          font-weight 500
      > .js-filter-editor
        height 200px
        width 100%
  .actions > button
    padding .1em
    background transparent
    color #999
  button.hola-button.font-inherit
    font-family inherit
    font-size inherit
</style>
