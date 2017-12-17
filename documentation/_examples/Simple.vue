<template>
<div>
  <strong>Color:</strong>
  <swatches v-model="color" />
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
      color: null,
    }
  }
}
</script>
