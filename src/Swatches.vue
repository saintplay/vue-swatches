<template>
  <div class="vue-swatches">
    <div v-if="!inline">
      <div
        class="trigger"
        :class="{'is-empty': !value}"
        :style="[triggerStyle]"
        @click="toggleSwatches"
      ></div>
    </div>

    <transition name="swatches">
      <div v-if="isOpen" class="swatches-wrapper" :class="{'inline': inline}">
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
    </transition>
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
      internalValue: this.value,
      open: false
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
    isOpen () {
      if (this.inline) return true
      return this.open
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
    triggerStyle () {
      return {
        backgroundColor: this.value ? this.value : '#fff',
        borderRadius: this.shapes === 'circles' ? '50%' : '10px'
      }
    }
  },
  methods: {
    toggleSwatches () {
      this.open = !this.open
    },
    updateSwatch (swatch) {
      this.$emit('input', swatch)
    }
  }
}
</script>

<style lang="scss">
  .vue-swatches {
    .trigger {
      display: inline-block;
      width: 42px;
      height: 42px;
      cursor: pointer;

      &.is-empty {
        border: 1px solid #111;
      }
    }

    .swatches-wrapper {
      background-color: #fff;

      &:not(.inline) {
        position: absolute;
        display: block;
        width: 100%;
        max-height: 240px;
        overflow: auto;
        border-radius: 5px;
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
        z-index: 50;
      }
    }

    .swatch {
      display: inline-block;
      width: 42px;
      height: 42px;
      margin: 6px 6px;
      cursor: pointer;

      &.swatch-square {
        border-radius: 10px;
      }

      &.swatch-circle {
        border-radius: 50%;
      }
    }

  }

  // Transition
  .swatches-enter-active, .swatches-leave-active {
    transition: all 0.15s ease;
  }
  .swatches-enter, .swatches-leave-active {
    opacity: 0;
  }
</style>
