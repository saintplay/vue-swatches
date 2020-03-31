<template>
 <div class="form__field">
    <div class="form__input">
      <v-swatches v-model="color">
        <input slot="trigger" :value="color" class="form__input__element" readonly>
      </v-swatches>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      color: '#2ECC70'
    }
  }
}
</script>
