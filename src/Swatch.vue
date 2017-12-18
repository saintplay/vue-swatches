<template>
  <div
    class="swatch"
    :class="{ 'swatch-border': showBorder, 'swatch-selected': selected }"
    :style="swatchStyles"
  >
    <check v-show="selected" />
  </div>
</template>

<script>
import Check from 'src/Check'

export default {
  name: 'swatch',
  components: {
    Check
  },
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    showBorder: {
      type: Boolean
      // default is calculated in `Swatches.vue`
    },
    size: {
      type: Number
      // default is especified in `Swatches.vue`
    },
    spacingSize: {
      type: Number
      // this prop comes from computed propertie and always should have a value
    },
    swatchColor: {
      type: String,
      default: ''
    },
    swatchClass: {
      type: String
      // default is calculated in `Swatches.vue`
    }
  },
  data () {
    return {
      swatchStyle: {
        width: `${this.size}px`,
        height: `${this.size}px`,
        marginBottom: `${this.spacingSize}px`,
        marginRight: `${this.spacingSize}px`,
        backgroundColor: this.swatchColor
      }
    }
  },
  computed: {
    swatchStyles () {
      const styles = [this.swatchStyle]

      if (this.swatchClass === 'swatch-square') {
        styles.push({
          borderRadius: `${Math.round(this.size * 0.25)}px`
        })
      } else if (this.swatchClass === 'swatch-circle') {
        styles.push({
          borderRadius: '50%'
        })
      }

      return styles
    }
  }
}
</script>

<style lang="scss">
  .vue-swatches {
    .swatch {
      position: relative;
      display: inline-block;
      cursor: pointer;

      &:hover {
        opacity: 0.90;
      }

      &.swatch-border {
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
      }

      &.swatch-selected {
        border: 2px solid #ccc;
      }
    }
  }
</style>
