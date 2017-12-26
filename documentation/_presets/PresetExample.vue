<template>
  <div>
    <swatches inline :colors="colors" :shapes="shapes" :show-border="showBorder" ></swatches>
  </div>
</template>

<script>
import Swatches from 'vue-swatches'

export default {
  components: {
    Swatches
  },
  props: {
    colors: {
      type: String,
      default: 'simple'
    },
    shapes: {
      type: String,
      default: 'squares'
    },
    showBorder: {
      type: Boolean,
      default: null
    }
  },
  data () {
    return {
      color: null
    }
  }
}
</script>
