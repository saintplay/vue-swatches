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
      <!-- The container handles the padding -->
      <div
        v-show="isOpen"
        class="swatches-container"
        :class="{'inline': inline}"
      >
        <!-- The wrapper handles the internal spacing -->
        <div
          class="swatches-wrapper"
          :style="swatchWrapperStyles"
        >

          <!-- for nested distribution -->
          <template v-if="isNested">
            <div
              v-for="(swatchRow, index) in swatchColors"
              :key="index"
              class="swatches-row"
            >
              <swatch
                v-for="swatch in swatchRow"
                :key="swatch"
                :border-radius="swatchBorderRadius"
                :selected="swatch === internalValue"
                :size="swatchSize"
                :spacing-size="swatchSpacingSize"
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
              v-for="swatch in swatchColors"
              :key="swatch"
              :border-radius="swatchBorderRadius"
              :selected="swatch === internalValue"
              :size="swatchSize"
              :spacing-size="swatchSpacingSize"
              :showBorder="swatchShowBorder"
              :swatchColor="swatch"
              :swatchClass="swatchClass"
              @click.native="updateSwatch(swatch)"
            />
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import * as presets from './presets'
import Swatch from './Swatch'

const DEFAULT_BORDER_RADIUS = '10px'
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
      presetBorderRadius: null,
      presetShowBorder: null,
      presetSize: null,
      presetSpacingSize: null,
      internalValue: this.value || null,
      internalIsOpen: false
    }
  },
  computed: {
    isNested () {
      if (this.swatchColors && this.swatchColors.length > 0 && this.swatchColors[0] instanceof Array) {
        return true
      }
      return false
    },
    isOpen () {
      if (this.inline) return true
      return this.internalIsOpen
    },
    borderRadius () {
      if (this.shapes === 'squares') return `${Math.round(this.swatchSize * 0.25)}px`
      if (this.shapes === 'circles') return `50%`
      return DEFAULT_BORDER_RADIUS
    },
    spacingSize () {
      return Math.round(this.swatchSize * 0.25)
    },
    // Computed value for `borderRadius`
    swatchBorderRadius () {
      // Priorize preset value
      if (this.presetBorderRadius !== null) return this.presetBorderRadius
      // over computed value
      return this.borderRadius
    },
    // Computed value for `colors`
    swatchColors () {
      if (this.colors instanceof Array) return this.colors

      switch (this.colors) {
        case 'simple':
          return presets.simple
        case 'text-simple':
          return presets.textSimple
        case 'text-advanced':
          this.presetSize = 24
          this.presetSpacingSize = 0
          this.presetBorderRadius = '0'
          return presets.textAdvanced
        default:
          return presets.simple
      }
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
    // Computed value for `spacingSize`
    swatchSpacingSize () {
      // Priorize preset value
      if (this.presetSpacingSize !== null) return this.presetSpacingSize
      // over computed value
      return this.spacingSize
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
      if (this.inline) return {}

      return {
        paddingTop: `${this.swatchSpacingSize}px`,
        paddingLeft: `${this.swatchSpacingSize}px`
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

    .swatches-container {
      background-color: #fff;
      box-sizing: content-box;
      padding: 5px;

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

    .swatches-wrapper {
      background-color: #fff;
    }

    .swatches-row {
      font-size: 0;
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
