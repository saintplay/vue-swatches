<template>
  <div class="vue-swatches" @blur.self="e => onBlur(e.relatedTarget)" tabindex="0">
    <div v-if="!inline" @click="togglePopover">
      <slot
        name="trigger"
      >
        <div
          class="trigger"
          :class="{'is-empty': !value}"
          :style="triggerStyles"
        ></div>
      </slot>
    </div>

    <transition name="swatches">
      <!-- The container handles the padding -->
      <div
        v-show="isOpen"
        class="swatches-container"
        :class="{'inline': inline}"
        :style="containerStyles"
      >
        <!-- The wrapper handles the internal spacing -->
        <div
          class="swatches-wrapper"
          :style="wrapperStyles"
        >

          <!-- for nested distribution -->
          <template v-if="isNested">
            <div
              v-for="(swatchRow, index) in computedColors"
              :key="index"
              class="swatches-row"
            >
              <swatch
                v-for="swatch in swatchRow"
                :key="swatch"
                :border-radius="computedBorderRadius"
                :exception-mode="computedExceptionMode"
                :is-exception="checkException(swatch)"
                :selected="swatch === internalValue"
                :size="computedSwatchSize"
                :spacing-size="computedSpacingSize"
                :showBorder="computedShowBorder"
                :swatchColor="swatch"
                :computedClass="computedClass"
                @click.native="updateSwatch(swatch)"
              />
            </div>
          </template>

          <!-- for normal distribution -->
          <template v-else>
            <swatch
              v-for="swatch in computedColors"
              :key="swatch"
              :border-radius="computedBorderRadius"
              :exception-mode="computedExceptionMode"
              :is-exception="checkException(swatch)"
              :selected="swatch === internalValue"
              :size="computedSwatchSize"
              :spacing-size="computedSpacingSize"
              :showBorder="computedShowBorder"
              :swatchColor="swatch"
              :computedClass="computedClass"
              @click.native="updateSwatch(swatch)"
            />
          </template>
        </div>
        <input
          ref="fallbackInput"
          v-model="internalValue"
          type="hidden"
          style="width: 0"
        >
      </div>
    </transition>
  </div>
</template>

<script>
import presets from './presets'
import Swatch from './Swatch'

const DEFAULT_BORDER_RADIUS = '10px'
const DEFAULT_MAX_HEIGHT = 300
const DEFAULT_ROW_LENGTH = 5
const DEFAULT_SWATCH_SIZE = 42
const DEFAULT_SHOW_BORDER = false

export default {
  name: 'swatches',
  components: {
    Swatch
  },
  props: {
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    colors: {
      type: Array | String,
      default: 'simple'
    },
    exceptions: {
      type: Array,
      default: () => []
    },
    exceptionMode: {
      type: String,
      default: 'disabled'
    },
    inline: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: Number | String,
      default: null
    },
    shapes: {
      type: String,
      default: 'squares'
    },
    popoverTo: {
      type: String,
      default: 'right'
    },
    rowLength: {
      type: Number | String,
      default: null
    },
    showBorder: {
      type: Boolean,
      default: null
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    swatchSize: {
      type: Number | String,
      default: null
    },
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      presetBorderRadius: null,
      presetMaxHeight: null,
      presetRowLength: null,
      presetShowBorder: null,
      presetSwatchSize: null,
      presetSpacingSize: null,
      internalValue: this.value,
      internalIsOpen: false
    }
  },
  computed: {
    isNested () {
      if (this.computedColors && this.computedColors.length > 0 && this.computedColors[0] instanceof Array) {
        return true
      }
      return false
    },
    isOpen () {
      if (this.inline) return true
      return this.internalIsOpen
    },

    /** REAL COMPUTEDS (depends on user's props and preset's values, these have 'computed' prefix) **/

    // Computed value for `colors`
    computedColors () {
      if (this.colors instanceof Array) return this.colors

      return this.extractSwatchesFromPreset(this.colors)
    },
    // Computed value for `borderRadius`
    computedBorderRadius () {
      // Priorize preset value
      if (this.presetBorderRadius !== null) return this.presetBorderRadius
      // over computed value
      return this.borderRadius
    },
    // Computed value for `exceptionMode`
    computedExceptionMode () {
      if (this.exceptionMode === 'hidden') return this.exceptionMode
      if (this.exceptionMode === 'disabled') return this.exceptionMode
      throw new Error(`[vue-swatches] ${this.exceptionMode} is not a valid value for 'exception-mode'. Please use 'hidden' or 'disabled'`)
    },
    // Computed value for `maxHeight`
    computedMaxheight () {
      // Priorize user value
      if (this.maxHeight !== null) {
        if (!isNaN(this.maxHeight)) {
          return Number(this.maxHeight)
        }
        // Given maxHeight is not a number!
        throw new Error(`[vue-swatches] ${this.maxHeight} is not a Number value for 'maxHeight'. max-height prop must be a Number`)
      }
      // Over preset value
      if (this.presetMaxHeight !== null) return this.presetMaxHeight
      // Use default value if these two are unset!
      return DEFAULT_MAX_HEIGHT
    },
    // Computed value for `rowLength`
    computedRowLength () {
      // Priorize user value
      if (this.rowLength !== null) {
        if (!isNaN(this.rowLength)) {
          return Number(this.rowLength)
        }
        // Given rowLength is not a number!
        throw new Error(`[vue-swatches] ${this.rowLength} is not a Number value for 'rowLength'. row-length prop must be a Number`)
      }
      // Over preset value
      if (this.presetRowLength !== null) return this.presetRowLength
      // Use default value if these two are unset!
      return DEFAULT_ROW_LENGTH
    },
    // Computed value for `swatchSize`
    computedSwatchSize () {
      // Priorize user value
      if (this.swatchSize !== null) {
        if (!isNaN(this.swatchSize)) {
          return Number(this.swatchSize)
        }
        // Given swatchSize is not a number!
        throw new Error(`[vue-swatches] ${this.swatchSize} is not a Number value for 'swatchSize'. swatch-size prop must be a Number`)
      }
      // over preset value
      if (this.presetSwatchSize !== null) return this.presetSwatchSize
      // Use default value if these two are unset
      return DEFAULT_SWATCH_SIZE
    },
    // Computed value for `spacingSize`
    computedSpacingSize () {
      // Priorize preset value
      if (this.presetSpacingSize !== null) return this.presetSpacingSize
      // over computed value
      return this.spacingSize
    },
    // Computed value for `showBorder`
    computedShowBorder () {
      // Priorize user value
      if (this.showBorder !== null) return this.showBorder
      // over preset value
      if (this.presetShowBorder !== null) return this.presetShowBorder
      // Use default value if these two are unset
      return DEFAULT_SHOW_BORDER
    },
    // Computed value for `shapes`
    computedClass () {
      switch (this.shapes) {
        case 'squares':
          return 'swatch-square'
        case 'circles':
          return 'swatch-circle'
        default:
          return 'swatch-square'
      }
    },

    /** DUMB COMPUTEDS (these use others computed) **/

    borderRadius () {
      if (this.shapes === 'squares') return `${Math.round(this.computedSwatchSize * 0.25)}px`
      if (this.shapes === 'circles') return `50%`
      return DEFAULT_BORDER_RADIUS
    },
    spacingSize () {
      return Math.round(this.computedSwatchSize * 0.25)
    },
    wrapperWidth () {
      return this.computedRowLength * (this.computedSwatchSize + this.computedSpacingSize)
    },

    /** COMPUTED STYLES **/

    triggerStyle () {
      return {
        width: '42px',
        height: '42px',
        backgroundColor: this.value ? this.value : '#ffffff',
        borderRadius: this.shapes === 'circles' ? '50%' : '10px'
      }
    },
    triggerStyles () {
      return [this.triggerStyle]
    },
    containerStyle () {
      const baseStyles = {
        backgroundColor: this.backgroundColor
      }
      let positionStyle = {}

      if (this.inline) return baseStyles

      if (this.popoverTo === 'right') {
        positionStyle = { left: 0 }
      } else if (this.popoverTo === 'left') {
        positionStyle = { right: 0 }
      } else {
        throw new Error(`[vue-swatches] ${this.popoverTo} is not a valid value for 'popover-to'. Please use 'left' or 'right'`)
      }

      return {
        ...positionStyle,
        ...baseStyles,
        maxHeight: `${this.computedMaxheight}px`
      }
    },
    containerStyles () {
      return [this.containerStyle]
    },
    wrapperStyle () {
      const baseStyles = {
        paddingTop: `${this.computedSpacingSize}px`,
        paddingLeft: `${this.computedSpacingSize}px`
      }

      if (this.inline) return baseStyles

      return {
        ...baseStyles,
        width: `${this.wrapperWidth}px`
      }
    },
    wrapperStyles () {
      return [this.wrapperStyle]
    }
  },
  watch: {
    value (newValue) {
      this.internalValue = newValue
    }
  },
  methods: {
    // Called programmatically
    checkException (swatch) {
      const uppercaseExceptions = this.exceptions.map(s => s.toUpperCase())
      return uppercaseExceptions.indexOf(swatch.toUpperCase()) !== -1
    },
    hidePopover () {
      this.internalIsOpen = false
      this.$el.blur()
      this.$emit('close', this.internalValue)
    },
    // Called by user action
    onBlur (relatedTarget) {
      if (!this.internalIsOpen) return /* dont hide */

      // We only close the Popover if the relatedTarget came from outside the component
      // Check if the relatedTarget is inside the component
      if (relatedTarget !== null && this.$el.contains(relatedTarget)) return /* dont hide */

      this.internalIsOpen = false
      this.$emit('close', this.internalValue)
    },
    // Called programmatically
    showPopover () {
      if (this.internalIsOpen) return /* dont show */

      this.internalIsOpen = true
      this.$el.focus()
    },
    togglePopover () {
      this.internalIsOpen ? this.hidePopover() : this.showPopover()
    },
    updateSwatch (swatch) {
      if (this.checkException(swatch)) return

      this.internalValue = swatch
      this.$emit('input', swatch)

      if (this.closeOnSelect && !this.inline) {
        this.hidePopover()
      }
    },
    extractSwatchesFromPreset (presetName) {
      const preset = presets[presetName]

      if (!preset) {
        throw new Error(`[vue-swatches] ${presetName} doesn't match any preset. Please refer to the documentation.`)
      }

      // Applying the styles if present in the preset
      if (preset.borderRadius) this.presetBorderRadius = preset.borderRadius
      if (preset.maxHeight) this.presetMaxHeight = preset.maxHeight
      if (preset.rowLength) this.presetRowLength = preset.rowLength
      if (preset.swatchSize) this.presetSwatchSize = preset.swatchSize
      if (preset.spacingSize === 0 || preset.spacingSize) this.presetSpacingSize = preset.spacingSize

      // Must return the swatches from the preset
      return preset.swatches
    }
  }
}
</script>

<style lang="scss">
  .vue-swatches {
    position: relative;
    outline: none;

    .trigger {
      display: inline-block;
      cursor: pointer;

      &.is-empty {
        border: 2px solid #ccc;
      }
    }

    .swatches-container {
      box-sizing: content-box;
      padding: 5px;

      &:not(.inline) {
        position: absolute;
        display: block;
        overflow: auto;
        border-radius: 5px;
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.2), 0 0 0 1px rgba(10, 10, 10, 0.2);
        z-index: 50;
      }
    }

    .swatches-wrapper {
      background-color: inherit;
    }

    .swatches-row {
      font-size: 0;
    }
  }

  // Transitions
  .swatches-enter-active, .swatches-leave-active {
    transition: all 0.3s ease;
  }
  .swatches-enter, .swatches-leave-active {
    opacity: 0;
  }
</style>
