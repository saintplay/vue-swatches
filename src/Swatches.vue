<template>
  <div class="vue-swatches">
    <div v-if="!inline">
      <div
        class="trigger"
        :class="{'is-empty': !value}"
        :style="triggerStyles"
        @click="toggleSwatches"
      ></div>
    </div>

    <transition name="swatches">
      <div
        v-show="isOpen"
        class="swatches-wrapper"
        :class="{'inline': inline}"
        :style="swatchWrapperStyles"
      >

        <!-- for nested distribution -->
        <template v-if="isNested">
          <div
            v-for="(swatchRow, index) in colorSwatches"
            :key="index"
            class="swatches-row"
          >
            <swatch
              v-for="swatch in swatchRow"
              :key="swatch"
              :selected="swatch === internalValue"
              :size="swatchSize"
              :spacing-size="spacingSize"
              :showBorder="swatchShowBorder"
              :swatchColor="swatch"
              :swatchClass="swatchClass"
              @click.native="updateSwatch(swatch)"
            />
          </div>
        </template>

        <!-- for normal distribution -->
        <template v-else>
          <swatch
            v-for="swatch in colorSwatches"
            :key="swatch"
            :selected="swatch === internalValue"
            :size="swatchSize"
            :spacing-size="spacingSize"
            :showBorder="swatchShowBorder"
            :swatchColor="swatch"
            :swatchClass="swatchClass"
            @click.native="updateSwatch(swatch)"
          />
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import * as presets from 'src/presets'
import Swatch from 'src/Swatch'

const DEFAULT_SWATCH_SIZE = 42
const DEFAULT_SHOW_BORDER = false

export default {
  name: 'swatches',
  components: {
    Swatch
  },
  props: {
    showBorder: {
      type: Boolean,
      default: null
    },
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
    size: {
      type: Number | String,
      default: null
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      presetShowBorder: null,
      presetSize: null,
      internalValue: this.value || null,
      internalIsOpen: false
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
          this.presetSize = 24
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
      return this.internalIsOpen
    },
    spacingSize () {
      return Math.round(this.swatchSize * 0.25)
    },
    // Computed value for `size`
    swatchSize () {
      // Priorize user value
      if (this.size !== null) {
        if (!isNaN(this.size)) {
          return Number(this.size)
        }
        // Given size is not a number!
        throw new Error(`${this.size} is not a Number. Size must be a Number`)
      }
      // over preset value
      if (this.presetSize !== null) return this.presetSize
      // Use default value if these two are unset
      return DEFAULT_SWATCH_SIZE
    },
    // Computed value for `showBorder`
    swatchShowBorder () {
      // Priorize user value
      if (this.showBorder !== null) return this.showBorder
      // over preset value
      if (this.presetShowBorder !== null) return this.presetShowBorder
      // Use default value if these two are unset
      return DEFAULT_SHOW_BORDER
    },
    // Computed value for `shapes`
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
        width: '42px',
        height: '42px',
        backgroundColor: this.value ? this.value : '#fff',
        borderRadius: this.shapes === 'circles' ? '50%' : '10px'
      }
    },
    triggerStyles () {
      return [this.triggerStyle]
    },
    swatchWrapperStyle () {
      return {
        paddingTop: `${this.spacingSize}px`,
        paddingLeft: `${this.spacingSize}px`
      }
    },
    swatchWrapperStyles () {
      return [this.swatchWrapperStyle]
    }
  },
  watch: {
    value (newValue) {
      this.internalValue = newValue
    }
  },
  methods: {
    toggleSwatches () {
      this.internalIsOpen = !this.internalIsOpen
    },
    updateSwatch (swatch) {
      this.internalValue = swatch
      this.$emit('input', swatch)
    }
  }
}
</script>

<style lang="scss">
  .vue-swatches {
    .trigger {
      display: inline-block;
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
        max-height: 272px;
        overflow: auto;
        border-radius: 5px;
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.2), 0 0 0 1px rgba(10, 10, 10, 0.2);
        z-index: 50;
      }
    }

  }

  // Transition
  .swatches-enter-active, .swatches-leave-active {
    transition: all 0.3s ease;
  }
  .swatches-enter, .swatches-leave-active {
    opacity: 0;
  }
</style>
