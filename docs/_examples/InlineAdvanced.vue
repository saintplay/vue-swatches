<template>
  <div class="form__field">
    <div class="form__label">
      <button @click="$modal.show('my-custom-ui')">Please choose a color</button>
      <modal name="my-custom-ui" :adaptive="true" height="192">
        <div class="custom-ui-class">
          <swatches v-model="color" inline></swatches>
        </div>
      </modal>
    </div>
  </div>
</template>
<script>
import Swatches from 'vue-swatches'

export default {
  components: {
    Swatches,
  },
  data() {
    return {
      color: null,
    }
  },
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
