<template>
  <div class="form__field">
    <div class="form__label">
      <strong>Please choose a color:</strong>
      <swatches v-model="color" inline />
    </div>
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
