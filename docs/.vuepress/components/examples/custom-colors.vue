<template>
  <div class="form__field">
    <div class="form__label">
      <strong>Please choose a color:</strong>
    </div>
    <div class="form__input">
      <v-swatches
        v-model="color"

        :swatches="swatches"

        row-length="6"
        shapes="circles"
        show-border
        popover-x="left"
      ></v-swatches>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      color: '#F64272',
      swatches: ['#F64272', '#F6648B', '#F493A7', '#F891A6', '#FFCCD5', '']
    }
  }
}
</script>
