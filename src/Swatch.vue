<template>
  <div
    class="swatch"
    :class="{ 'swatch-border': showBorder, 'swatch-selected': selected }"
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
    },
    swatchClass: {
      type: String
      // default is calculated in `Swatches.vue`
    }
  },
  computed: {
    swatchStyle () {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        marginBottom: `${this.spacingSize}px`,
        marginRight: `${this.spacingSize}px`,
        borderRadius: this.borderRadius,
        backgroundColor: this.swatchColor
      }
    },
    swatchStyles () {
      return [this.swatchStyle]
    }
  }
}
</script>

<style lang="scss">
  .vue-swatches {
    .swatch {
      position: relative;
      display: inline-block;
      font-size: 0;
      cursor: pointer;

      &:hover, &:focus {
        opacity: 0.90;
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
        outline: none;
      }

      &.swatch-border {
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
      }

      &.swatch-selected {
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
      }
    }
  }
</style>
