<template>
  <div>
    <swatches v-model="color" inline />
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
