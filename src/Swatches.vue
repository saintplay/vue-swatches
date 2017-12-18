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
      <div v-show="isOpen" class="swatches-wrapper" :class="{'inline': inline}">

        <!-- for nested distribution -->
        <template v-if="isNested">
          <div
            v-for="(swatchRow, index) in colorSwatches"
            :key="index"
            class="swatchs-row"
          >
            <swatch
              v-for="swatch in swatchRow"
              :key="swatch"
              :swatchColor="swatch"
              :swatchClass="swatchClass"
              @click="updateSwatch(swatch)"
            />
          </div>
        </template>

        <!-- for normal distribution -->
        <template v-else>
          <swatch
            v-for="swatch in colorSwatches"
            :key="swatch"
            :swatchColor="swatch"
            :swatchClass="swatchClass"
            @click="updateSwatch(swatch)"
          />
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import * as presets from 'src/presets'
import Swatch from 'src/Swatch'

export default {
  name: 'swatches',
  components: {
    Swatch
  },
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
        case 'text-simple':
          return presets.textSimple
        case 'text-advanced':
          return presets.textAdvanced
        default:
          return presets.simple
      }
    },
    isNested () {
      if (this.colorSwatches && this.colorSwatches.length > 0 && this.colorSwatches[0] instanceof Array) {
        return true
      }
      return false
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
        border: 2px solid #ccc;
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
      margin-bottom: 12px;
      margin-right: 12px;
      cursor: pointer;

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

  // Transition
  .swatches-enter-active, .swatches-leave-active {
    transition: all 0.15s ease;
  }
  .swatches-enter, .swatches-leave-active {
    opacity: 0;
  }
</style>
