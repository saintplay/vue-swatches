<template>
  <v-swatches :swatches="preset" inline />
</template>

<script>
import basic from '../../../src/presets/basic'
import textBasic from '../../../src/presets/text-basic'
import textAdvanced from '../../../src/presets/text-advanced'
import materialBasic from '../../../src/presets/material-basic'
import materialLight from '../../../src/presets/material-light'
import materialDark from '../../../src/presets/material-dark'

export default {
  name: 'v-preset',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    preset() {
      switch (this.name) {
        case 'basic':
          return basic
        case 'text-basic':
          return textBasic
        case 'text-advanced':
          return textAdvanced
        case 'material-basic':
          return materialBasic
        case 'material-light':
          return materialLight
        case 'material-dark':
          return materialDark
      }
    },
  },
}
</script>
