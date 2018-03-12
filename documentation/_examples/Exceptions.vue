<template>
  <div class="form__field">
    <div class="form__label">
      <strong>Please choose a color:</strong>
    </div>
    <div class="form__input">
      <swatches
        v-model="color"
        colors="text-basic"

        :exceptions="exceptions"
        exception-mode="disabled"

        row-length="4"
        show-border
        popover-to="left"
      ></swatches>
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
      color: '#FFCC00',
      exceptions: ['#FFFFFF', '#000000']
    }
  }
}
</script>
