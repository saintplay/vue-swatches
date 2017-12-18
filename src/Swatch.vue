<template>
  <div
    class="swatch"
    :class="swatchClass"
    :style="{backgroundColor: swatchColor}"
  >
  </div>
</template>

<script>
export default {
  name: 'swatch',
  props: {
    swatchColor: {
      type: String,
      default: ''
    },
    swatchClass: {
      type: String,
      default: 'swatch-square'
    }
  }
}
</script>
