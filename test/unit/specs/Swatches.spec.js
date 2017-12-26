import { mount } from 'vue-test-utils'
import rgb from 'rgb'

import Swatches from 'src/Swatches'

const DEFAULT_BACKGROUND_COLOR = '#ffffff'

describe('Props', () => {
  describe('background-color', () => {
    const testColor = '#333'

    describe('When Popover mode is enabled', () => {
      test('background color should render default background color if not passed a prop', () => {
        const componentWrapper = mount(Swatches)
        const container = componentWrapper.find('.swatches-container').element
        expect(rgb(container.style.backgroundColor))
        .toEqual(rgb(DEFAULT_BACKGROUND_COLOR))
      })
      test('background color should render color passed as a prop', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            backgroundColor: testColor
          }
        })
        const container = componentWrapper.find('.swatches-container').element
        expect(rgb(container.style.backgroundColor))
        .toEqual(rgb(testColor))
      })
    })

    describe('When Inline mode is enabled', () => {
      test('background color should render default background color if not passed a prop', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: true
          }
        })
        const container = componentWrapper.find('.swatches-container').element
        expect(rgb(container.style.backgroundColor))
        .toEqual(rgb(DEFAULT_BACKGROUND_COLOR))
      })
      test('background color should render color passed as a prop', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: true,
            backgroundColor: testColor
          }
        })
        const container = componentWrapper.find('.swatches-container').element
        expect(rgb(container.style.backgroundColor))
        .toEqual(rgb(testColor))
      })
    })
  })

  describe('close-on-select', () => {
    describe('When Popover mode is enabled', () => {
      test('should close the popover if true', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            closeOnSelect: true
          }
        })
        componentWrapper.vm.showPopover()
        const container = componentWrapper.find('.swatches-container')
        const swatch = componentWrapper.find('.swatch')
        swatch.trigger('click')
        expect(container.hasStyle('display', 'none'))
        .toBeTruthy()
      })
      test('should not close the popover if false', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            closeOnSelect: false
          }
        })
        componentWrapper.vm.showPopover()
        const container = componentWrapper.find('.swatches-container')
        const swatch = componentWrapper.find('.swatch')
        swatch.trigger('click')
        expect(container.hasStyle('display', 'block'))
        .toBeTruthy()
      })
    })
  })
})
