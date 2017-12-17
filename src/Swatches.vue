<template>
  <div class="vue-swatches">
    <div
      v-for="color in colorSwatches"
      :key="color"
      :class="swatchClass"
      :style="{backgroundColor: color}"
    >
    </div>
  </div>
</template>

<script>
import * as presets from 'src/presets'

export default {
  name: 'swatches',
  props: {
    colors: {
      type: Array | String,
      default: 'simple'
    },
    shapes: {
      type: String,
      default: 'squares'
    }
  },
  computed: {
    colorSwatches () {
      switch (this.colors) {
        case 'simple':
          return presets.simple
        default:
          return presets.simple
      }
    },
    swatchClass () {
      switch (this.shapes) {
        case 'squares':
          return 'swatch-square'
        case 'circles':
          return 'swatch-circle'
        default:
          return 'swatch-square'
      }
    }
  }
}
</script>

<style lang="scss">
  .vue-swatches {
    .swatch-square {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin: 4px 4px;
      border-radius: 4px;
      cursor: pointer;
    }

    .swatch-circle {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin: 4px 4px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
</style>
