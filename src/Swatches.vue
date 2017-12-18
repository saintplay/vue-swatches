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
            class="swatches-row"
          >
            <swatch
              v-for="swatch in swatchRow"
              :key="swatch"
              :selected="swatch === internalValue"
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
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      presetShowBorder: null,
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
          this.presetShowBorder = true
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
    // Computed value for `showBorder`
    swatchShowBorder () {
      // Priorize user value
      if (this.showBorder !== null) return this.showBorder
      // over preset value
      if (this.presetShowBorder !== null) return this.presetShowBorder
      // Use `false` as default if these two are unset
      return false
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
        backgroundColor: this.value ? this.value : '#fff',
        borderRadius: this.shapes === 'circles' ? '50%' : '10px'
      }
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
        padding-top: 12px;
        padding-left: 12px;
        border-radius: 5px;
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
        z-index: 50;
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
