<template>
  <div
    class="vue-swatches__swatch"
    :class="{
      'vue-swatches__swatch--border': showBorder,
      'vue-swatches__swatch--selected': selected,
      'vue-swatches__swatch--is-exception': isException || disabled
    }"
    :style="swatchStyles"
    :aria-label="swatchLabel"
    tabindex="0"
    @blur="e => this.$emit('blur', e.relatedTarget)">
    <div v-if="swatchColor === ''" class="vue-swatches__diagonal__wrapper vue-swatches--has-children-centered">
      <div class="vue-swatches__diagonal"></div>
    </div>
    <v-check v-show="showCheckbox && selected" />
    <div
      v-if="showLabel"
      class="vue-swatches__swatch__label"
      :style="labelStyles">
        {{ swatchLabel }}
    </div>
  </div>
</template>

<script>
import VCheck from './VCheck'

export default {
  name: 'v-swatch',
  components: {
    VCheck,
  },
  props: {
    borderRadius: {
      type: String,
      // default is calculated in `Swatches.vue`
    },
    disabled: {
      type: Boolean,
      // default is especified in `Swatches.vue`
    },
    exceptionMode: {
      type: String,
      // default is especified in `Swatches.vue`
    },
    isException: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    showCheckbox: {
      type: Boolean,
      // default is calculated in `Swatches.vue`
    },
    showBorder: {
      type: Boolean,
      // default is calculated in `Swatches.vue`
    },
    showLabel: {
      type: Boolean,
      // default is especified in `Swatches.vue`
    },
    size: {
      type: Number,
      // default is especified in `Swatches.vue`
    },
    spacingSize: {
      type: Number,
      // this prop comes from computed property and always should have a value
    },
    swatchColor: {
      type: String,
      default: '',
    },
    swatchLabel: {
      type: String,
      // this prop comes from computed property and always should have a value
    },
    swatchStyle: {
      type: Object,
      // default is especified in `Swatches.vue`
    },
  },
  data() {
    return {}
  },
  computed: {
    computedLabelStyle() {
      const offset = 8 + Math.floor(this.spacingSize / 5) * 3
      return {
        bottom: `-${offset}px`,
      }
    },
    computedSwatchStyle() {
      return {
        display:
          this.isException && this.exceptionMode === 'hidden'
            ? 'none'
            : 'inline-block',
        width: `${this.size}px`,
        height: `${this.size}px`,
        marginBottom: `${this.spacingSize}px`,
        marginRight: `${this.spacingSize}px`,
        borderRadius: this.borderRadius,
        backgroundColor: this.swatchColor !== '' ? this.swatchColor : '#FFFFFF',
        cursor: this.cursorStyle,
      }
    },
    cursorStyle() {
      if (this.disabled) return 'not-allowed'
      if (this.isException && this.exceptionMode === 'disabled')
        return 'not-allowed'
      return 'pointer'
    },
    labelStyles() {
      return [this.computedLabelStyle]
    },
    swatchStyles() {
      return [this.computedSwatchStyle, this.swatchStyle]
    },
  },
}
</script>

<style lang="scss">
.vue-swatches__swatch {
  position: relative;
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
