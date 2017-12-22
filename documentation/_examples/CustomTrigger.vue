<template>
  <div class="form__field">
    <div class="form__input">
      <swatches v-model="color">
        <input slot="trigger" :value="color" readonly>
      </swatches>
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
      color: '#2ECC70'
    }
  }
}
</script>
