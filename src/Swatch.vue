<template>
  <div
    class="swatch"
    :class="{ [swatchClass]: true, 'swatch-border': showBorder, 'swatch-selected': selected }"
    :style="[swatchStyle]"
  >
    <check v-show="selected" />
  </div>
</template>

<script>
import Check from 'src/Check'

export default {
  name: 'swatch',
  components: {
    Check
  },
  props: {
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
    swatchColor: {
      type: String,
      default: ''
    },
    swatchClass: {
      type: String
      // default is calculated in `Swatches.vue`
    }
  },
  data () {
    return {
      swatchStyle: {
        width: `${this.size}px`,
        height: `${this.size}px`,
        marginBottom: '12px',
        marginRight: '12px',
        backgroundColor: this.swatchColor
      }
    }
  }
}
</script>

<style lang="scss">
  .vue-swatches {
    .swatch {
      position: relative;
      display: inline-block;
      cursor: pointer;

      &:hover {
        opacity: 0.90;
      }

      &.swatch-border {
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
      }

      &.swatch-selected {
        border: 2px solid #ccc;
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
