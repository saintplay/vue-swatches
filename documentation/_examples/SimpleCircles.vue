<template>
  <div>
    <swatches v-model="color" shapes="circles" />
  </div>
</template>

<script>
import Swatches from 'vue-swatches'

export default {
  components: {
    Swatches
  },
  data () {
    return {
      color: null
    }
  }
}
</script>
