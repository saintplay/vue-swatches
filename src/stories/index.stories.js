import { storiesOf } from '@storybook/vue'

import VueSwatches from '../Swatches.vue'

storiesOf('Vue Swatches', module)
  .add('normal', () => ({
    components: { VueSwatches },
    template: '<vue-swatches></vue-swatches>'
  }))
