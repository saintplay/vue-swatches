<template>
  <div
    class="vue-swatches__swatch"
    :class="{
      'vue-swatches__swatch--border': showBorder,
      'vue-swatches__swatch--selected': selected,
      'vue-swatches__swatch--is-exception': isException || disabled
    }"
    :style="swatchStyles"
  >
    <div v-if="swatchColor === ''" class="vue-swatches__diagonal--wrapper vue-swatches--has-children-centered">
      <div class="vue-swatches__diagonal"></div>
    </div>
    <check v-show="showCheckbox && selected" />
  </div>
</template>

<script>
import Check from './Check'

export default {
  name: 'swatch',
  components: {
    Check
  },
  props: {
    borderRadius: {
      type: String
      // default is calculated in `Swatches.vue`
    },
    disabled: {
      type: Boolean
      // default is especified in `Swatches.vue`
    },
    exceptionMode: {
      type: String
      // default is especified in `Swatches.vue`
    },
    isException: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean
      // default is calculated in `Swatches.vue`
    },
    showBorder: {
      type: Boolean
      // default is calculated in `Swatches.vue`
    },
    size: {
      type: Number
      // default is especified in `Swatches.vue`
    },
    spacingSize: {
      type: Number
      // this prop comes from computed property and always should have a value
    },
    swatchColor: {
      type: String,
      default: ''
    },
    swatchStyle: {
      type: Object
      // default is especified in `Swatches.vue`
    }
  },
  data () {
    return { }
  },
  computed: {
    computedSwatchStyle () {
      return {
        display: (this.isException && this.exceptionMode === 'hidden') ? 'none' : 'inline-block',
        width: `${this.size}px`,
        height: `${this.size}px`,
        marginBottom: `${this.spacingSize}px`,
        marginRight: `${this.spacingSize}px`,
        borderRadius: this.borderRadius,
        backgroundColor: this.swatchColor !== '' ? this.swatchColor : '#FFFFFF',
        cursor: this.cursorStyle
      }
    },
    cursorStyle () {
      if (this.disabled) return 'not-allowed'
      if (this.isException && this.exceptionMode === 'disabled') return 'not-allowed'
      return 'pointer'
    },
    swatchStyles () {
      return [this.computedSwatchStyle, this.swatchStyle]
    }
  }
}
</script>

<style lang="scss">
  .vue-swatches__swatch {
    position: relative;
    font-size: 0;

    &:hover, &:focus {
      opacity: 0.90;
      box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
      outline: none;
    }

    &.vue-swatches__swatch--border {
      box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
    }

    &.vue-swatches__swatch--selected {
      box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
    }

    .vue-swatches__diagonal--wrapper {
      position: absolute;
    }
  }
</style>
