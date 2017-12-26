import { mount } from 'vue-test-utils'

import Swatches from 'src/Swatches'

describe('Swatches.vue', () => {
  describe('background-color', () => {
    it('render default background color if not passed a prop', () => {
      const defaultBackgroundColor = '#ffffff'
      const wrapper = mount(Swatches)
      expect(wrapper.element.style.backgroundColor).to.equal(defaultBackgroundColor)
    })
  })
})
