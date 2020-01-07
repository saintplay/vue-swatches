<template>
  <div class="form__field">
    <div class="form__label">
      <strong>Please choose a color:</strong>
    </div>
    <div class="form__input">
      <v-swatches
        v-model="color"
        popover-x="left"
        swatches="text-advanced"
      ></v-swatches>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      color: '#000000'
    }
  }
}
</script>
