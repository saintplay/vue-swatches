<template>
  <div
    class="swatch"
    :class="{ [swatchClass]: true, 'swatch-border': showBorder }"
    :style="{ backgroundColor: swatchColor }"
  >
  </div>
</template>

<script>
export default {
  name: 'swatch',
  props: {
    showBorder: {
      type: Boolean,
      default: false
    },
    swatchColor: {
      type: String,
      default: ''
    },
    swatchClass: {
      type: String,
      default: 'swatch-square'
    }
  }
}
</script>

<style lang="scss">
  .vue-swatches {
    .swatch {
      display: inline-block;
      width: 42px;
      height: 42px;
      margin-bottom: 12px;
      margin-right: 12px;
      cursor: pointer;

      &.swatch-border {
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
      }

      &:hover {
        opacity: 0.75;
      }

      &.swatch-square {
        border-radius: 10px;

      }

      &.swatch-circle {
        border-radius: 50%;
      }
    }
  }
</style>
