<template>
  <div class="form__field">
    <div class="form__label">
      <strong>Please choose a color:</strong>
    </div>
    <div class="form__input">
      <swatches v-model="color" popover-to="left" shapes="circles" swatch-size="24"></swatches>
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
      color: null,
    }
  }
}
</script>
