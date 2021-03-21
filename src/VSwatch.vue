<template>
  <div
    class="vue-swatches__swatch"
    :class="{
      'vue-swatches__swatch--border': showBorder,
      'vue-swatches__swatch--selected': selected,
      'vue-swatches__swatch--is-disabled': disabled
    }"
    :style="swatchStyles"
    :aria-label="swatchAlt"
    role="button"
    tabindex="0"
    @keyup.enter="$emit('click', swatchColor)"
    @blur="e => this.$emit('blur', e.relatedTarget)"
  >
    <div
      v-if="swatchColor === ''"
      class="vue-swatches__diagonal__wrapper vue-swatches--has-children-centered"
    >
      <div class="vue-swatches__diagonal"></div>
    </div>
    <v-check v-show="showCheckbox && selected" />
    <div
      v-if="showLabels"
      class="vue-swatches__swatch__label"
      :style="labelStyles"
    >
      {{ swatchLabel }}
    </div>
  </div>
</template>

<script>
import VCheck from "./VCheck.vue";

export default {
  name: "v-swatch",
  components: {
    VCheck
  },
  props: {
    borderRadius: {
      type: String
      // default is calculated in `Swatches.vue`
    },
    isLast: {
      type: Boolean,
      default: false
    },
    rowLengthSetted: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
      // this prop comes from computed property and always should have a value
    },
    inline: {
      type: Boolean
      // default is calculated in `Swatches.vue`
    },
    selected: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean
      // default is calculated in `Swatches.vue`
    },
    showBorder: {
      type: Boolean
      // default is calculated in `Swatches.vue`
    },
    showLabels: {
      type: Boolean
      // default is especified in `Swatches.vue`
    },
    spacingSize: {
      type: Number
      // this prop comes from computed property and always should have a value
    },
    swatchColor: {
      type: String,
      default: ""
    },
    swatchLabel: {
      type: String
      // this prop comes from computed property and always should have a value
    },
    swatchAlt: {
      type: String
      // this prop comes from computed property and always should have a value
    },
    swatchSize: {
      type: Number
      // default is especified in `Swatches.vue`
    },
    swatchStyle: {
      type: Object
      // default is especified in `Swatches.vue`
    }
  },
  data() {
    return {};
  },
  computed: {
    computedLabelStyle() {
      const offset = 8 + Math.floor(this.spacingSize / 5) * 3;
      return {
        bottom: `-${offset}px`
      };
    },
    computedSwatchStyle() {
      const baseStyles = {
        width: `${this.swatchSize}px`,
        height: `${this.swatchSize}px`,
        borderRadius: this.borderRadius,
        backgroundColor: this.swatchColor !== "" ? this.swatchColor : "#FFFFFF",
        cursor: this.cursorStyle
      };

      if (!this.inline || !this.isLast) {
        baseStyles.marginRight = `${this.spacingSize}px`;
      }

      if (this.inline && !this.rowLengthSetted) return baseStyles;

      return {
        ...baseStyles,
        marginBottom: `${this.spacingSize}px`
      };
    },
    cursorStyle() {
      if (this.disabled) return "not-allowed";
      return "pointer";
    },
    labelStyles() {
      return [this.computedLabelStyle];
    },
    swatchStyles() {
      return [this.computedSwatchStyle, this.swatchStyle];
    }
  }
};
</script>

<style lang="scss">
.vue-swatches__swatch {
  position: relative;
  display: inline-block;
  font-size: 0;

  &:hover,
  &:focus {
    opacity: 0.9;
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
    outline: none;
  }

  &.vue-swatches__swatch--border {
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
  }

  &.vue-swatches__swatch--selected {
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
  }

  &__label {
    position: absolute;
    left: 0;
    right: 0;
    color: #666;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
  }

  .vue-swatches__diagonal__wrapper {
    position: absolute;
  }
}
</style>
