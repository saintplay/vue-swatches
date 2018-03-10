<template>

  <div class="vue-swatches" @blur.self="e => onBlur(e.relatedTarget)" tabindex="0">
    <div v-if="!inline" ref="trigger-wrapper" @click="togglePopover">
      <slot
        name="trigger"
      >
        <div
          class="vue-swatches__trigger"
          :class="{ 'vue-swatches--is-empty': !value, 'vue-swatches--is-disabled': disabled }"
          :style="triggerStyles"
        ></div>
      </slot>
    </div>

    <transition name="vue-swatches-show-hide">
      <!-- The container handles the padding -->
      <div
        v-show="inline || isOpen"
        class="vue-swatches__container"
        :class="{'vue-swatches--inline': inline}"
        :style="containerStyles"
      >
        <!-- The wrapper handles the internal spacing -->
        <div
          class="vue-swatches__wrapper"
          :style="wrapperStyles"
        >

          <!-- for nested distribution -->
          <template v-if="isNested">
            <div
              v-for="(swatchRow, index) in computedColors"
              :key="index"
              class="vue-swatches__row"
            >
              <swatch
                v-for="swatch in swatchRow"
                :key="swatch"
                :border-radius="computedBorderRadius"
                :disabled="disabled"
                :exception-mode="computedExceptionMode"
                :is-exception="checkException(swatch)"
                :selected="checkEquality(swatch, internalValue)"
                :size="computedSwatchSize"
                :spacing-size="computedSpacingSize"
                :show-border="computedShowBorder"
                :show-checkbox="showCheckbox"
                :swatch-color="swatch"
                :swatch-style="swatchStyle"
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
              :disabled="disabled"
              :exception-mode="computedExceptionMode"
              :is-exception="checkException(swatch)"
              :selected="checkEquality(swatch, internalValue)"
              :size="computedSwatchSize"
              :spacing-size="computedSpacingSize"
              :show-border="computedShowBorder"
              :show-checkbox="showCheckbox"
              :swatch-color="swatch"
              :swatch-style="swatchStyle"
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
import * as errorsMessages from './errors'

export const DEFAULT_BACKGROUND_COLOR = '#ffffff'
export const DEFAULT_BORDER_RADIUS = '10px'
export const DEFAULT_MAX_HEIGHT = 300
export const DEFAULT_ROW_LENGTH = 4
export const DEFAULT_SWATCH_SIZE = 42
export const DEFAULT_SHOW_BORDER = false

export default {
  name: 'swatches',
  components: {
    Swatch
  },
  props: {
    backgroundColor: {
      type: String,
      default: DEFAULT_BACKGROUND_COLOR
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    colors: {
      default: 'basic',
      validator (value) {
        if (value instanceof Array) return true
        else if (value instanceof Object && !(value instanceof RegExp)) {
          if (!value.swatches || !(value.swatches instanceof Array)) {
            throw new Error(errorsMessages.presetArray(value))
          }
          return true
        } else if (typeof value === 'string') {
          const preset = presets[value]
          if (!preset) {
            throw new Error(errorsMessages.presetName(value))
          }
          return true
        }
        throw new Error(errorsMessages.typeCheckError('colors', ['Array', 'Object', 'String'], value))
      }
    },
    exceptions: {
      type: Array,
      default: () => []
    },
    exceptionMode: {
      default: 'disabled',
      validator (value) {
        if (typeof value === 'string') {
          if (value === 'disabled' || value === 'hidden') return true
          throw new Error(errorsMessages.exceptionModeValue(value))
        }
        throw new Error(errorsMessages.typeCheckError('exception-mode', ['String'], value))
      }
    },
    inline: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      default: null,
      validator (value) {
        if (typeof value === 'number') return true
        else if (typeof value === 'string') {
          if (isNaN(value)) {
            throw new Error(errorsMessages.stringNotANumber('max-height', value))
          }
          return true
        }
        throw new Error(errorsMessages.typeCheckError('max-height', ['Number', 'String'], value))
      }
    },
    shapes: {
      default: 'squares',
      validator (value) {
        if (typeof value === 'string') {
          if (value === 'squares' || value === 'circles') return true
          throw new Error(errorsMessages.shapesValue(value))
        }
        throw new Error(errorsMessages.typeCheckError('shapes', ['String'], value))
      }
    },
    popoverTo: {
      default: 'right',
      validator (value) {
        if (typeof value === 'string') {
          if (value === 'left' || value === 'right') return true
          throw new Error(errorsMessages.popoverToValue(value))
        }
        throw new Error(errorsMessages.typeCheckError('popover-to', ['String'], value))
      }
    },
    rowLength: {
      default: null,
      validator (value) {
        if (typeof value === 'number') return true
        else if (typeof value === 'string') {
          if (isNaN(value)) {
            throw new Error(errorsMessages.stringNotANumber('row-length', value))
          }
          return true
        }
        throw new Error(errorsMessages.typeCheckError('row-length', ['Number', 'String'], value))
      }
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
      default: null,
      validator (value) {
        if (typeof value === 'number') return true
        else if (typeof value === 'string') {
          if (isNaN(value)) {
            throw new Error(errorsMessages.stringNotANumber('swatch-size', value))
          }
          return true
        }
        throw new Error(errorsMessages.typeCheckError('swatch-size', ['Number', 'String'], value))
      }
    },
    swatchStyle: {
      type: Object,
      default: () => {}
    },
    triggerStyle: {
      type: Object,
      default: () => {}
    },
    wrapperStyle: {
      type: Object,
      default: () => {}
    },
    value: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
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
      if (this.inline) return false
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
      else if (this.exceptionMode === 'disabled') return this.exceptionMode
    },
    // Computed value for `maxHeight`
    computedMaxHeight () {
      // Priorize user value
      if (this.maxHeight !== null) return Number(this.maxHeight)
      // Over preset value
      else if (this.presetMaxHeight !== null) return this.presetMaxHeight
      // Use default value if these two are unset!
      return DEFAULT_MAX_HEIGHT
    },
    // Computed value for `rowLength`
    computedRowLength () {
      // Priorize user value
      if (this.rowLength !== null) return Number(this.rowLength)
      // Over preset value
      else if (this.presetRowLength !== null) return this.presetRowLength
      // Use default value if these two are unset!
      return DEFAULT_ROW_LENGTH
    },
    // Computed value for `swatchSize`
    computedSwatchSize () {
      // Priorize user value
      if (this.swatchSize !== null) return Number(this.swatchSize)
      // over preset value
      else if (this.presetSwatchSize !== null) return this.presetSwatchSize
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

    /** DUMB COMPUTEDS (these use other computed) **/

    borderRadius () {
      if (this.shapes === 'squares') return `${Math.round(this.computedSwatchSize * 0.25)}px`
      else if (this.shapes === 'circles') return `50%`
    },
    spacingSize () {
      return Math.round(this.computedSwatchSize * 0.25)
    },
    wrapperWidth () {
      return this.computedRowLength * (this.computedSwatchSize + this.computedSpacingSize)
    },

    /** COMPUTED STYLES **/

    computedtriggerStyle () {
      return {
        width: '42px',
        height: '42px',
        backgroundColor: this.value ? this.value : '#ffffff',
        borderRadius: this.shapes === 'circles' ? '50%' : DEFAULT_BORDER_RADIUS
      }
    },
    triggerStyles () {
      return [this.computedtriggerStyle, this.triggerStyle]
    },
    containerStyle () {
      const baseStyles = {
        backgroundColor: this.backgroundColor
      }
      let positionStyle = {}

      if (this.inline) return baseStyles

      if (this.popoverTo === 'right') positionStyle = { left: 0 }
      else if (this.popoverTo === 'left') positionStyle = { right: 0 }

      return {
        ...positionStyle,
        ...baseStyles,
        maxHeight: `${this.computedMaxHeight}px`
      }
    },
    containerStyles () {
      return [this.containerStyle]
    },
    computedWrapperStyle () {
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
      return [this.computedWrapperStyle, this.wrapperStyle]
    }
  },
  watch: {
    value (newValue) {
      this.internalValue = newValue
    }
  },
  methods: {
    // Called programmatically
    checkEquality (color1, color2) {
      if (!color1 || !color2) return false
      return (color1.toUpperCase() === color2.toUpperCase())
    },
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
      /* istanbul ignore if */
      if (!this.isOpen) return /* dont hide */

      // We only close the Popover if the relatedTarget came from outside the component
      // Check if the relatedTarget is inside the component
      if (relatedTarget !== null && this.$el.contains(relatedTarget)) return /* dont hide */

      this.internalIsOpen = false
      this.$emit('close', this.internalValue)
    },
    // Called programmatically
    showPopover () {
      /* istanbul ignore if */
      if (this.isOpen || this.inline || this.disabled) return /* dont show */

      this.internalIsOpen = true
      this.$el.focus()
      this.$emit('open')
    },
    togglePopover () {
      this.isOpen ? this.hidePopover() : this.showPopover()
    },
    updateSwatch (swatch) {
      if (this.checkException(swatch) || this.disabled) return

      this.internalValue = swatch
      this.$emit('input', swatch)

      if (this.closeOnSelect && !this.inline) {
        this.hidePopover()
      }
    },
    extractSwatchesFromPreset (presetName) {
      let preset = null
      if (presetName instanceof Object) preset = presetName
      else preset = presets[presetName]

      // Applying the styles if present in the preset
      if (preset.borderRadius) this.presetBorderRadius = preset.borderRadius
      if (preset.maxHeight) this.presetMaxHeight = preset.maxHeight
      if (preset.rowLength) this.presetRowLength = preset.rowLength
      if (preset.showBorder) this.presetShowBorder = preset.showBorder
      if (preset.swatchSize) this.presetSwatchSize = preset.swatchSize
      if (preset.spacingSize === 0 || preset.spacingSize) this.presetSpacingSize = preset.spacingSize

      // Must return the swatches from the preset
      return preset.swatches
    }
  }
}
</script>

<style lang="scss">
  fieldset[disabled] .vue-swatches {
    pointer-events: none;
  }

  .vue-swatches {
    position: relative;
    outline: none;
  }

  .vue-swatches__trigger {
    display: inline-block;
    cursor: pointer;

    &.vue-swatches--is-empty {
      border: 2px solid #ccc;
    }

    &.vue-swatches--is-disabled {
      cursor: not-allowed;
    }
  }

  .vue-swatches__container {
    box-sizing: content-box;
    padding: 5px;

    &:not(.vue-swatches--inline) {
      position: absolute;
      display: block;
      overflow: auto;
      border-radius: 5px;
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.2), 0 0 0 1px rgba(10, 10, 10, 0.2);
      z-index: 50;
    }
  }

  .vue-swatches__wrapper {
    background-color: inherit;
  }

  .vue-swatches__row {
    font-size: 0;
  }

  // Transitions
  .vue-swatches-show-hide-enter-active, .vue-swatches-show-hide-leave-active {
    transition: all 0.3s ease;
  }
  .vue-swatches-show-hide-enter, .vue-swatches-show-hide-leave-active {
    opacity: 0;
  }
</style>
