<template>
  <div
    class="vue-swatches__swatch"
    :class="{
      'vue-swatches__swatch__border': showBorder,
      'vue-swatches__swatch--selected': selected,
      'vue-swatches__swatch--is-exception': isException
    }"
    :style="swatchStyles"
  >
    <check v-show="selected" />
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
    exceptionMode: {
      type: String
      // default is especified in `Swatches.vue`
    },
    isException: {
      tyoe: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
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
      // this prop comes from computed propertie and always should have a value
    },
    swatchColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    swatchStyle () {
      return {
        display: (this.isException && this.exceptionMode === 'hidden') ? 'none' : 'inline-block',
        width: `${this.size}px`,
        height: `${this.size}px`,
        marginBottom: `${this.spacingSize}px`,
        marginRight: `${this.spacingSize}px`,
        borderRadius: this.borderRadius,
        backgroundColor: this.swatchColor,
        cursor: (this.isException && this.exceptionMode === 'disabled') ? 'not-allowed' : 'pointer'
      }
    },
    swatchStyles () {
      return [this.swatchStyle]
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

    &.vue-swatches__swatch__border {
      box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
    }

    &.vue-swatches__swatch--selected {
      box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
    }
  }
</style>
