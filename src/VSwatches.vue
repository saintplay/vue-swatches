<template>
  <div class="vue-swatches" tabindex="-1" @blur="e => onBlur(e.relatedTarget)">
    <!-- Trigger -->
    <div
      v-if="!inline"
      ref="triggerWrapper"
      class="vue-swatches__trigger__wrapper"
      @click="togglePopover"
    >
      <slot name="trigger">
        <div
          class="vue-swatches__trigger"
          :class="{
            'vue-swatches--is-empty': !value,
            'vue-swatches--is-disabled': disabled
          }"
          :style="triggerStyles"
        >
          <div
            v-show="isNoColor"
            class="vue-swatches__diagonal__wrapper vue-swatches--has-children-centered"
          >
            <div class="vue-swatches__diagonal"></div>
          </div>
        </div>
      </slot>
    </div>

    <transition name="vue-swatches-show-hide">
      <!-- The container handles the padding -->
      <div
        ref="containerWrapper"
        v-show="inline || isOpen"
        class="vue-swatches__container"
        :class="{ 'vue-swatches--inline': inline }"
        :style="containerStyles"
      >
        <!-- The wrapper handles the internal spacing -->
        <div class="vue-swatches__wrapper" :style="wrapperStyles">
          <!-- for nested distribution -->
          <template v-if="isNested">
            <div
              v-for="(swatchRow, index) in computedSwatches"
              :key="index"
              class="vue-swatches__row"
            >
              <v-swatch
                v-for="(swatch, swatchIndex) in swatchRow"
                :key="swatchIndex"
                :is-last="
                  index === computedSwatches.length - 1 &&
                    swatchIndex === swatchRow.length
                "
                :row-length-setted="
                  rowLength !== null || presetRowLength !== null
                "
                :border-radius="computedBorderRadius"
                :disabled="getSwatchDisabled(swatch)"
                :inline="inline"
                :selected="checkEquality(getSwatchColor(swatch), value)"
                :swatch-size="computedSwatchSize"
                :spacing-size="computedSpacingSize"
                :show-border="getSwatchShowBorder(swatch)"
                :show-checkbox="showCheckbox"
                :show-labels="showLabels"
                :swatch-color="getSwatchColor(swatch)"
                :swatch-label="getSwatchLabel(swatch)"
                :swatch-alt="getSwatchAlt(swatch)"
                :swatch-style="swatchStyle"
                @blur="relatedTarget => onBlur(relatedTarget)"
                @click.native="updateSwatch(swatch)"
                @click="updateSwatch(swatch)"
              />
            </div>
          </template>

          <!-- for normal distribution -->
          <template v-else>
            <v-swatch
              v-for="(swatch, swatchIndex) in computedSwatches"
              :key="swatchIndex"
              :is-last="swatchIndex === computedSwatches.length - 1"
              :row-length-setted="
                rowLength !== null || presetRowLength !== null
              "
              :border-radius="computedBorderRadius"
              :disabled="getSwatchDisabled(swatch)"
              :inline="inline"
              :selected="checkEquality(getSwatchColor(swatch), value)"
              :swatch-size="computedSwatchSize"
              :spacing-size="computedSpacingSize"
              :show-border="getSwatchShowBorder(swatch)"
              :show-checkbox="showCheckbox"
              :show-labels="showLabels"
              :swatch-color="getSwatchColor(swatch)"
              :swatch-label="getSwatchLabel(swatch)"
              :swatch-alt="getSwatchAlt(swatch)"
              :swatch-style="swatchStyle"
              @blur="relatedTarget => onBlur(relatedTarget)"
              @click.native="updateSwatch(swatch)"
              @click="updateSwatch(swatch)"
            />
          </template>
        </div>
        <div
          v-if="showFallback"
          class="vue-swatches__fallback__wrapper"
          :style="computedFallbackWrapperStyles"
        >
          <span class="vue-swatches__fallback__input--wrapper">
            <input
              ref="fallbackInput"
              class="vue-swatches__fallback__input"
              :class="fallbackInputClass"
              :value="internalValue"
              :type="fallbackInputType"
              @input="
                e => updateSwatch(e.target.value, { fromFallbackInput: true })
              "
            />
          </span>
          <button
            v-if="showFallbackOk"
            class="vue-swatches__fallback__button"
            :class="fallbackOkClass"
            @click.prevent="onFallbackButtonClick"
          >
            {{ fallbackOkText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import basicPreset from "./presets/basic";
import textBasicPreset from "./presets/text-basic";
import textAdvancedPreset from "./presets/text-advanced";

import VSwatch from "./VSwatch.vue";

export const DEFAULT_BACKGROUND_COLOR = "#ffffff";
export const DEFAULT_BORDER_RADIUS = "10px";
export const DEFAULT_ROW_LENGTH = 4;
export const DEFAULT_TRIGGER_CONTAINER_SPACE = 5;
export const DEFAULT_SWATCH_SIZE = 42;
export const DEFAULT_SHOW_BORDER = false;

export const extractPropertyFromPreset = (
  presetName,
  property,
  alwaysReturn
) => {
  if (typeof presetName !== "string") return null;
  else if (presetName === "text-basic")
    return textBasicPreset[property] === undefined
      ? null
      : textBasicPreset[property];
  else if (presetName === "text-advanced")
    return textAdvancedPreset[property] === undefined
      ? null
      : textAdvancedPreset[property];
  else if (presetName === "basic")
    return basicPreset[property] === undefined ? null : basicPreset[property];
  else if (alwaysReturn)
    return basicPreset[property] === undefined ? null : basicPreset[property];
  else return null;
};

export default {
  name: "v-swatches",
  components: {
    VSwatch
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
    swatches: {
      type: [Array, String],
      default: () => "basic"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fallbackInputClass: {
      type: [Array, Object, String],
      default: null
    },
    fallbackInputType: {
      type: String,
      default: () => "text",
      validator(value) {
        return ["text", "color"].indexOf(value) !== -1;
      }
    },
    fallbackOkClass: {
      type: [Array, Object, String],
      default: null
    },
    fallbackOkText: {
      type: String,
      default: "Ok"
    },
    inline: {
      type: Boolean,
      default: false
    },
    shapes: {
      type: String,
      default: "squares"
    },
    popoverX: {
      type: String,
      default: "right"
    },
    popoverY: {
      type: String,
      default: "bottom"
    },
    rowLength: {
      type: [Number, String],
      default: null // The default is especified as DEFAULT_ROW_LENGTH
    },
    showBorder: {
      type: Boolean,
      default: null // The default is especified as DEFAULT_SHOW_BORDER
    },
    showFallback: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    showLabels: {
      type: Boolean,
      default: false
    },
    spacingSize: {
      type: Number,
      default: null // The default depends on swatch size
    },
    swatchSize: {
      type: [Number, String],
      default: null // The default is especified as DEFAULT_SWATCH_SIZE
    },
    swatchStyle: {
      type: [Object, Array],
      default: () => {}
    },
    triggerStyle: {
      type: [Object, Array],
      default: () => {}
    },
    wrapperStyle: {
      type: [Object, Array],
      default: () => {}
    },
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      alwaysOnScreenStyle: {},
      componentMounted: false,
      internalValue: this.value,
      internalIsOpen: false
    };
  },
  computed: {
    isNested() {
      if (
        this.computedSwatches &&
        this.computedSwatches.length &&
        this.computedSwatches[0] instanceof Array
      ) {
        return true;
      }
      return false;
    },
    isOpen() {
      if (this.inline) return false;
      return this.internalIsOpen;
    },
    isNoColor() {
      return this.checkEquality("", this.value);
    },

    /** REAL COMPUTEDS (depends on user's props and preset's values, these have 'computed' prefix) **/

    // Preset Computeds
    presetBorderRadius() {
      return extractPropertyFromPreset(this.swatches, "borderRadius");
    },
    presetRowLength() {
      return extractPropertyFromPreset(this.swatches, "rowLength");
    },
    presetShowBorder() {
      return extractPropertyFromPreset(this.swatches, "showBorder");
    },
    presetSwatchSize() {
      return extractPropertyFromPreset(this.swatches, "swatchSize");
    },
    presetSpacingSize() {
      return extractPropertyFromPreset(this.swatches, "spacingSize");
    },

    // Computed value for `swatches`
    computedSwatches() {
      if (this.swatches instanceof Array) return this.swatches;

      /* istanbul ignore else */
      if (typeof this.swatches === "string") {
        return extractPropertyFromPreset(this.swatches, "colors", true);
      } else {
        return [];
      }
    },
    // Computed value for `borderRadius`
    computedBorderRadius() {
      // Priorize preset value
      if (this.presetBorderRadius !== null) return this.presetBorderRadius;
      // over computed value
      return this.borderRadius;
    },

    // Computed value for `rowLength`
    computedRowLength() {
      // Priorize user value
      if (this.rowLength !== null) return Number(this.rowLength);
      // Over preset value
      else if (this.presetRowLength !== null) return this.presetRowLength;
      // If there are less swatches than the default
      else if (
        this.computedSwatches.length < DEFAULT_ROW_LENGTH &&
        !this.isNested
      )
        return this.computedSwatches.length;
      // Use default otherwise
      return DEFAULT_ROW_LENGTH;
    },
    // Computed value for `swatchSize`
    computedSwatchSize() {
      // Priorize user value
      if (this.swatchSize !== null) return Number(this.swatchSize);
      else if (this.presetSwatchSize !== null)
        // over preset value
        return this.presetSwatchSize;
      // Use default value if these two are unset
      return DEFAULT_SWATCH_SIZE;
    },
    // Computed value for `spacingSize`
    computedSpacingSize() {
      // Priorize user value
      if (this.spacingSize !== null) return this.spacingSize;
      // Priorize preset value
      if (this.presetSpacingSize !== null) return this.presetSpacingSize;
      // over computed value
      return Math.round(this.computedSwatchSize * 0.25);
    },
    // Computed value for `showBorder`
    computedShowBorder() {
      // Priorize user value
      if (this.showBorder !== null) return this.showBorder;
      // over preset value
      if (this.presetShowBorder !== null) return this.presetShowBorder;
      // Use default value if these two are unset
      return DEFAULT_SHOW_BORDER;
    },

    showFallbackOk() {
      return !this.inline;
    },

    /** DUMB COMPUTEDS (these only mutate props) **/

    borderRadius() {
      if (this.shapes === "squares")
        return `${Math.round(this.computedSwatchSize * 0.25)}px`;
      else if (this.shapes === "circles") return `50%`;
      /* istanbul ignore next */
      return "";
    },
    wrapperWidth() {
      return (
        this.computedRowLength *
        (this.computedSwatchSize + this.computedSpacingSize)
      );
    },

    /** COMPUTED STYLES **/

    computedtriggerStyle() {
      return {
        width: "42px",
        height: "42px",
        backgroundColor: this.value ? this.value : "#ffffff",
        borderRadius: this.shapes === "circles" ? "50%" : DEFAULT_BORDER_RADIUS
      };
    },
    triggerStyles() {
      return [this.computedtriggerStyle, this.triggerStyle];
    },
    containerStyles() {
      const baseStyles = [
        {
          backgroundColor: this.backgroundColor
        },
        this.alwaysOnScreenStyle
      ];

      if (this.inline) return baseStyles;

      return [
        ...baseStyles,
        {
          padding: "5px",
          marginBottom: "5px"
        }
      ];
    },
    computedWrapperStyle() {
      if (this.inline) return {};

      return {
        paddingTop: `${this.computedSpacingSize}px`,
        paddingLeft: `${this.computedSpacingSize}px`,
        width: `${this.wrapperWidth}px`
      };
    },
    wrapperStyles() {
      return [this.computedWrapperStyle, this.wrapperStyle];
    },
    computedFallbackWrapperStyle() {
      const baseStyles = {
        marginLeft: `${this.computedSpacingSize}px`,
        paddingBottom: `${this.computedSpacingSize}px`
      };

      if (this.inline) return baseStyles;

      return {
        ...baseStyles,
        width: `${this.wrapperWidth - this.computedSpacingSize}px`
      };
    },
    computedFallbackWrapperStyles() {
      return [this.computedFallbackWrapperStyle];
    }
  },
  watch: {
    value(newValue) {
      this.internalValue = newValue;
    }
  },
  mounted() {
    this.componentMounted = true;
  },
  methods: {
    // Called programmatically
    checkEquality(color1, color2) {
      if ((!color1 && color1 !== "") || (!color2 && color2 !== ""))
        return false;
      return color1.toUpperCase() === color2.toUpperCase();
    },
    hidePopover() {
      this.internalIsOpen = false;
      this.$el.blur();
      this.$emit("close", this.internalValue);
    },
    getAlwaysOnScreenStyle() {
      const styles = {};
      const triggerEl = this.$refs.triggerWrapper;
      const containerEl = this.$refs.containerWrapper;

      /* istanbul ignore if */
      if (
        !this.componentMounted ||
        this.inline ||
        !triggerEl ||
        !window ||
        !document
      )
        return styles;

      const triggerRect = triggerEl.getBoundingClientRect();
      const leftMin = 5;
      const rightMax =
        (document.documentElement.clientWidth || window.innerWidth) - 5;
      const topMin = 5;
      const bottomMax =
        (document.documentElement.clientHeight || window.innerHeight) - 5;

      containerEl.style.visibility = "hidden";
      containerEl.style.display = "block";
      const containerRect = containerEl.getBoundingClientRect();
      containerEl.style.display = "none";
      containerEl.style.visibility = "visible";

      if (this.popoverY === "top") {
        if (triggerRect.top - containerRect.height < topMin) {
          // Showing bellow
          styles.top = `${triggerRect.height +
            DEFAULT_TRIGGER_CONTAINER_SPACE}px`;
          styles.bottom = "auto";
        } else {
          // Showing above
          styles.bottom = `${triggerRect.height +
            DEFAULT_TRIGGER_CONTAINER_SPACE}px`;
          styles.top = "auto";
        }
      } else {
        /* istanbul ignore else */
        if (this.popoverY === "bottom") {
          if (triggerRect.bottom + containerRect.height > bottomMax) {
            // Showing above
            styles.bottom = `${triggerRect.height +
              DEFAULT_TRIGGER_CONTAINER_SPACE}px`;
            styles.top = "auto";
          } else {
            // Showing bellow
            styles.top = `${triggerRect.height +
              DEFAULT_TRIGGER_CONTAINER_SPACE}px`;
            styles.bottom = "auto";
          }
        }
      }

      if (this.popoverX === "left") {
        if (triggerRect.right - containerRect.width < leftMin) {
          // Showing at the right
          styles.left = 0;
          styles.right = "auto";
        } else {
          // Showing at the left
          styles.right = 0;
          styles.left = "auto";
        }
      } else {
        /* istanbul ignore else */
        if (this.popoverX === "right") {
          if (triggerRect.left + containerRect.width > rightMax) {
            // Showing at the left
            styles.right = 0;
            styles.left = "auto";
          } else {
            // Showing at the right
            styles.left = 0;
            styles.right = "auto";
          }
        }
      }

      return styles;
    },
    getSwatchShowBorder(swatch) {
      if (typeof swatch === "string") return this.computedShowBorder;
      else if (typeof swatch === "object")
        return swatch.showBorder !== undefined
          ? swatch.showBorder
          : this.computedShowBorder;
    },
    getSwatchColor(swatch) {
      if (typeof swatch === "string") return swatch;
      else if (typeof swatch === "object") return swatch.color;
    },
    getSwatchDisabled(swatch) {
      if (typeof swatch === "string") return this.disabled;
      else if (typeof swatch === "object")
        return swatch.disabled !== undefined ? swatch.disabled : this.disabled;
    },
    getSwatchLabel(swatch) {
      if (typeof swatch === "string") return swatch;
      else if (typeof swatch === "object") return swatch.label || swatch.color;
    },
    getSwatchAlt(swatch) {
      if (typeof swatch === "string") return swatch;
      else if (typeof swatch === "object")
        return swatch.alt || this.getSwatchLabel(swatch);
    },
    // Called by user action
    onBlur(relatedTarget) {
      /* istanbul ignore if */
      if (!this.isOpen) return; /* dont hide */

      // We only close the Popover if the relatedTarget came from outside the component
      // Check if the relatedTarget is inside the component
      if (relatedTarget !== null && this.$el.contains(relatedTarget))
        return; /* dont hide */

      this.internalIsOpen = false;
      this.$emit("close", this.internalValue);
    },
    onFallbackButtonClick() {
      this.hidePopover();
    },
    // Called programmatically
    showPopover() {
      /* istanbul ignore if */
      if (this.isOpen || this.inline || this.disabled) return; /* dont show */

      this.alwaysOnScreenStyle = this.getAlwaysOnScreenStyle();
      this.internalIsOpen = true;
      this.$el.focus();
      this.$emit("open");
    },
    togglePopover() {
      this.isOpen ? this.hidePopover() : this.showPopover();
    },
    updateSwatch(swatch, { fromFallbackInput } = {}) {
      if (this.getSwatchDisabled(swatch)) return;

      const color = this.getSwatchColor(swatch);

      this.internalValue = color;
      this.$emit("input", color);

      if (this.closeOnSelect && !this.inline && !fromFallbackInput) {
        this.hidePopover();
      }
    }
  }
};
</script>

<style lang="scss">
fieldset[disabled] .vue-swatches {
  pointer-events: none;
}

.vue-swatches {
  position: relative;
  display: inline-block;
  outline: none;
}

.vue-swatches__trigger__wrapper {
  display: inline-block;
  cursor: pointer;
}

.vue-swatches__trigger {
  &.vue-swatches--is-empty {
    border: 2px solid #ccc;
  }

  &.vue-swatches--is-disabled {
    cursor: not-allowed;
  }
}

.vue-swatches__container {
  box-sizing: content-box;

  &.vue-swatches--inline {
    font-size: 0;
  }

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
  box-sizing: content-box;
}

.vue-swatches__row {
  font-size: 0;
}

.vue-swatches__fallback__wrapper {
  display: table;
  // justify-content: space-between;
}
.vue-swatches__fallback__input--wrapper {
  display: table-cell;
  padding-right: 10px;
  width: 100%;
  font-size: 14px;
}
.vue-swatches__fallback__input {
  width: 100%;
  padding-top: 6px;
  padding-bottom: 6px;
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  color: #35495e;
  background: #ffffff;
}
.vue-swatches__fallback__button {
  display: table-cell;
  padding: 6px 15px;
  border: 0;
  cursor: pointer;
  font-weight: bold;
  color: #ffffff;
  background-color: #3571c8;
  border-radius: 5px;
}

// Transitions
.vue-swatches-show-hide-enter-active,
.vue-swatches-show-hide-leave-active {
  transition: all 0.3s ease;
}
.vue-swatches-show-hide-enter,
.vue-swatches-show-hide-leave-active {
  opacity: 0;
}

// Shared Styles (Swatch.vue, Check.vue)
.vue-swatches--has-children-centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vue-swatches__diagonal__wrapper {
  width: 100%;
  height: 100%;
}
.vue-swatches__diagonal {
  width: 75%;
  height: 75%;
  background: linear-gradient(
    to top right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) calc(50% - 2.4px),
    rgba(222, 8, 10, 1) 50%,
    rgba(0, 0, 0, 0) calc(50% + 2.4px),
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
