<template>
  <div>
    <swatches :colors="colors" inline shapes="circles" />
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
    }
  },
  data () {
    return {
      color: null
    }
  }
}
</script>
