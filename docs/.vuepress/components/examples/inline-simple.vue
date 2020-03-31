<template>
  <div class="form__field">
    <div class="form__label">
      <strong>Please choose a color:</strong>
      <v-swatches v-model="color" inline></v-swatches>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: null
    }
  }
}
</script>
