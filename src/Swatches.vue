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

const materialSimple = [
  '#1FBC9C',
  '#1CA085',
  '#2ECC70',
  '#27AF60',
  '#3398DB',
  '#2980B9',
  '#9B59B6',
  '#8E43AD',
  '#34485E',
  '#2C3D4F',
  '#F2C511',
  '#F39C19',
  '#E67E22',
  '#D35313',
  '#E84B3C',
  '#C0382B',
  '#ECF1F2',
  '#BDC3C8',
  '#95A5A6',
  '#7E8C8D'
]

export default {
  name: 'swatches',
  props: {
    colors: {
      type: Array | String,
      default: 'material-simple'
    },
    shapes: {
      type: String,
      default: 'squares'
    }
  },
  computed: {
    colorSwatches () {
      switch (this.colors) {
        case 'material-simple':
          return materialSimple
        default:
          return materialSimple
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
