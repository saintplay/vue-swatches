<template>
<div>
  <strong>Color:</strong>
  <swatches v-model="color" :colors="colors" />
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
      colors: ['#F64272', '#F6648B', '#F493A7', '#F891A6', '#FFCCD5', '#FFFFFF' ]
    }
  }
}
</script>
