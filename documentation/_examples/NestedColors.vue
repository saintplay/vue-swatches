<template>
  <div class="form__field">
    <div class="form__label">
      <strong>Please choose a color:</strong>
    </div>
    <div class="form__input">
      <swatches v-model="color" :colors="colors" row-length="5" popover-to="left"></swatches>
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
      color: '#b9f5f1',
      colors: [
        ['#F64272', '#F6648B', '#F493A7', '#F891A6', '#FFCCD5' ],
        ['#8b5aff', '#a27bff', '#b99cff', '#d0bdff', '#e8deff' ],
        ['#51e5db', '#74ebe3', '#96f0ea', '#b9f5f1', '#dcfaf8' ],
        ['#ffa51a', '#ffb748', '#ffc976', '#ffdba3', '#ffedd1' ]
      ]
    }
  }
}
</script>
