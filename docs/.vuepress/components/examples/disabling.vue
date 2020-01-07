<template>
  <div class="form__field">
    <div class="form__label">
      <strong>Please choose a color:</strong>
    </div>
    <div class="form__input">
      <v-swatches
        v-model="color"
        :swatches="swatches"
        popover-x="left"
      ></v-swatches>
    </div>
  </div>
</template>

<script>
export default {
 data () {
    return {
      color: '#27AF60',
      swatches: [
        { color : '#1FBC9C', disabled: true },
          "#1CA085",
        { color : '#2ECC70', disabled: true },
          "#27AF60",
          "#3398DB",
          "#2980B9",
          "#A463BF",
          "#8E43AD",
          "#3D556E",
          "#222F3D",
        { color : '#F2C511', disabled: true }
      ]
    }
  }
}
</script>
