<template>
  <div class="vue-swatches">
    <div v-if="!inline">
      <div
        class="color-input"
        :class="{'is-empty': !value}"
        :style="[colorInputStyle]"
      ></div>
    </div>
    <div
      v-for="swatch in colorSwatches"
      :key="swatch"
      class="swatch"
      :class="swatchClass"
      :style="{backgroundColor: swatch}"
      @click="updateSwatch(swatch)"
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
    inline: {
      type: Boolean,
      default: false
    },
    shapes: {
      type: String,
      default: 'squares'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      internalValue: this.value
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
    },
    // Styles
    colorInputStyle () {
      return {
        backgroundColor: this.value ? this.value : '#fff',
        borderRadius: this.shapes === 'circles' ? '50%' : '10px'
      }
    }
  },
  methods: {
    updateSwatch (swatch) {
      this.$emit('input', swatch)
    }
  }
}
</script>

<style lang="scss">
  .vue-swatches {
    .color-input {
      display: inline-block;
      width: 42px;
      height: 42px;
      cursor: pointer;

      &.is-empty {
        border: 1px solid #111;
      }
    }

    .swatch {
      display: inline-block;
      width: 42px;
      height: 42px;
      margin: 6px 6px;
      cursor: pointer;
    }

    .swatch-square {
      border-radius: 10px;
    }

    .swatch-circle {
      border-radius: 50%;
    }
  }
</style>
