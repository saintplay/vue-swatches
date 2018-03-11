import { storiesOf } from '@storybook/vue'

import Swatches from '../Swatches.vue'

storiesOf('Ideal State', module)
  .add('normal', () => ({
    components: { Swatches },
    template: '<swatches></swatches>'
  }))

  .add('input trigger', () => ({
    components: { Swatches },
    data: () => ({
      color: '#2ECC70'
    }),
    template: `
      <swatches v-model="color">
        <input slot="trigger" :value="color" readonly>
      </swatches>
      `
  }))

storiesOf('Disabled State', module)
  .add('inline', () => ({
    components: { Swatches },
    template: '<swatches inline disabled></swatches>'
  }))

  .add('not inline', () => ({
    components: { Swatches },
    template: '<swatches disabled></swatches>'
  }))

  .add('custom trigger', () => ({
    components: { Swatches },
    data: () => ({
      color: '#2ECC70'
    }),
    template: `
      <swatches v-model="color" disabled>
        <button slot="trigger">Hello World</button>'
      </swatches>
      `
  }))
