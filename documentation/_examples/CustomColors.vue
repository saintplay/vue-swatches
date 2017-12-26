<template>
  <div class="form__field">
    <div class="form__label">
      <strong>Please choose a color:</strong>
    </div>
    <div class="form__input">
      <swatches v-model="color" :colors="colors" popover-to="left"></swatches>
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
      color: '#F64272',
      colors: ['#F64272', '#F6648B', '#F493A7', '#F891A6', '#FFCCD5' ]
    }
  }
}
</script>
