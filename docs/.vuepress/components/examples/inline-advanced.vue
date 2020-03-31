<template>
  <div class="form__field">
    <div class="form__label">
      <button @click="$modal.show('my-custom-ui')">Please choose a color</button>
      <custom-modal name="my-custom-ui" :adaptive="true" height="192">
        <div class="custom-ui-class">
          <v-swatches v-model="color" inline></v-swatches>
        </div>
      </custom-modal>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      color: null
    }
  }
}
</script>

<style scoped>
  .custom-ui-class {
    width: 348px;
    height: 320px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
