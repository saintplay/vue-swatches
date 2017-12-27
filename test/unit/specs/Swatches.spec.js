import { mount } from 'vue-test-utils'
import rgb from 'rgb'

import Swatches from 'src/Swatches'
import presets from 'src/presets'

const DEFAULT_BACKGROUND_COLOR = '#ffffff'

describe('Props', () => {
  describe('background-color', () => {
    const testColor = '#333'

    describe('When Popover mode is enabled', () => {
      test('background color should render default background color if not passed a prop', () => {
        const componentWrapper = mount(Swatches)
        const container = componentWrapper.find('.vue-swatches__container').element
        expect(rgb(container.style.backgroundColor))
        .toEqual(rgb(DEFAULT_BACKGROUND_COLOR))
      })
      test('background color should render color passed as a prop', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            backgroundColor: testColor
          }
        })
        const container = componentWrapper.find('.vue-swatches__container').element
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
        const container = componentWrapper.find('.vue-swatches__container').element
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
        const container = componentWrapper.find('.vue-swatches__container').element
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
        const container = componentWrapper.find('.vue-swatches__container')
        const swatch = componentWrapper.find('.vue-swatches__swatch')
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
        const container = componentWrapper.find('.vue-swatches__container')
        const swatch = componentWrapper.find('.vue-swatches__swatch')
        swatch.trigger('click')
        expect(container.hasStyle('display', 'block'))
        .toBeTruthy()
      })
    })
  })

  describe('colors', () => {
    test('default swatches are shown', () => {
      const defaultPresetName = 'simple'
      const rgbColors = presets[defaultPresetName].swatches.map(c => rgb(c))
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: defaultPresetName
        }
      })
      const swatches = Array.from(componentWrapper.element.querySelectorAll('.vue-swatches__swatch'))
      const swatchesColors = swatches.map(s => rgb(s.style.backgroundColor))
      expect(swatchesColors)
      .toEqual(rgbColors)
    })
    describe('When custom colors are passed as a prop', () => {
      test('given array colors are shown', () => {
        const colors = ['#e31432', '#a156e2', '#eca23e']
        const rgbColors = colors.map(c => rgb(c))
        const componentWrapper = mount(Swatches, {
          propsData: {
            colors
          }
        })
        const swatches = Array.from(componentWrapper.element.querySelectorAll('.vue-swatches__swatch'))
        const swatchesColors = swatches.map(s => rgb(s.style.backgroundColor))
        expect(swatchesColors)
        .toEqual(rgbColors)
      })
      test('given nested array colors are shown', () => {
        const colors = [
          ['#e31432', '#a156e2', '#eca23e'],
          ['#a2341e', '$ef86ff', '#eiaea3'],
          ['#eec451', '$3321de', '#166002']
        ]
        const rgbColors = colors.map(row => {
          return row.map(s => rgb(s))
        })
        const componentWrapper = mount(Swatches, {
          propsData: {
            colors
          }
        })
        const swatchesRows = componentWrapper.element.querySelectorAll('.vue-swatches__row')
        const swatchesColors = []

        swatchesRows.forEach(swatchElement => {
          const swatchesNodeList = Array.from(swatchElement.querySelectorAll('.vue-swatches__swatch'))
          const rgbSwatches = swatchesNodeList.map(s => rgb(s.style.backgroundColor))
          swatchesColors.push(rgbSwatches)
        })

        expect(swatchesColors)
        .toEqual(rgbColors)
      })
    })
    describe('When preset name is passed as a prop', () => {
      test('preset colors are shown', () => {
        const presetNameTest = 'material-simple'
        const rgbColors = presets[presetNameTest].swatches.map(c => rgb(c))
        const componentWrapper = mount(Swatches, {
          propsData: {
            colors: presetNameTest
          }
        })
        const swatches = Array.from(componentWrapper.element.querySelectorAll('.vue-swatches__swatch'))
        const swatchesColors = swatches.map(s => rgb(s.style.backgroundColor))
        expect(swatchesColors)
        .toEqual(rgbColors)
      })
    })
  })

  describe('exceptions && exception-mode', () => {
    describe('When swatches array is simple', () => {
      test('exceptions should be hidden if exception-mode is hidden', () => {
        const colors = ['#a23e41', '#e31432', '#a156e2', '#aeccea', '#5f0f2a', '#eca23e', '#12313a']
        const rgbColors = colors.map(c => rgb(c))
        const exceptions = ['#e31432', '#a156e2', '#eca23e']
        const rgbExceptions = exceptions.map(e => rgb(e))
        const trueRgbExceptions = rgbColors.filter(c => rgbExceptions.indexOf(c) !== -1)
        const componentWrapper = mount(Swatches, {
          propsData: {
            exceptionMode: 'hidden',
            colors,
            exceptions
          }
        })
        const exceptionSwatches = Array.from(componentWrapper.element.querySelectorAll('.vue-swatches__swatch--is-exception'))
        const hiddenSwatches = exceptionSwatches.filter(s => s.style.display === 'none')
        const hiddenSwatchesColors = hiddenSwatches.map(s => rgb(s.style.backgroundColor))

        expect(hiddenSwatchesColors)
        .toEqual(trueRgbExceptions)
      })
      test('exceptions should be disabled if exception-mode is disabled', () => {
        const colors = ['#a23e41', '#e31432', '#a156e2', '#aeccea', '#5f0f2a', '#eca23e', '#12313a']
        const rgbColors = colors.map(c => rgb(c))
        const exceptions = ['#e31432', '#a156e2', '#eca23e']
        const rgbExceptions = exceptions.map(e => rgb(e))
        const trueRgbExceptions = rgbColors.filter(c => rgbExceptions.indexOf(c) !== -1)
        const componentWrapper = mount(Swatches, {
          propsData: {
            exceptionMode: 'disabled',
            colors,
            exceptions
          }
        })
        const exceptionSwatches = Array.from(componentWrapper.element.querySelectorAll('.vue-swatches__swatch--is-exception'))
        const disabledSwatches = exceptionSwatches.filter(s => s.style.cursor === 'not-allowed')
        const disabledSwatchesColors = disabledSwatches.map(s => rgb(s.style.backgroundColor))

        expect(disabledSwatchesColors)
        .toEqual(trueRgbExceptions)
      })
    })
    describe('When swatches array is nested', () => {
      test('exceptions should be hidden if exception-mode is hidden', () => {
        const colors = [
          ['#e31432', '#ef86ff', '#166002'],
          ['#a2341e', '$a156e2', '#eiaea3'],
          ['#eec451', '$3321de', '#eca23e']
        ]
        const rgbColors = colors.map(row => {
          return row.map(s => rgb(s))
        })
        const flattenedRgbColors = [].concat(...rgbColors)
        const exceptions = ['#e31432', '#a156e2', '#eca23e']
        const rgbExceptions = exceptions.map(e => rgb(e))
        const trueRgbExceptions = flattenedRgbColors.filter(c => rgbExceptions.indexOf(c) !== -1)
        const componentWrapper = mount(Swatches, {
          propsData: {
            exceptionMode: 'hidden',
            colors,
            exceptions
          }
        })
        const exceptionSwatches = Array.from(componentWrapper.element.querySelectorAll('.vue-swatches__swatch--is-exception'))
        const hiddenSwatches = exceptionSwatches.filter(s => s.style.display === 'none')
        const hiddenSwatchesColors = hiddenSwatches.map(s => rgb(s.style.backgroundColor))

        expect(hiddenSwatchesColors)
        .toEqual(trueRgbExceptions)
      })
      test('exceptions should be disabled if exception-mode is disabled', () => {
        const colors = [
          ['#e31432', '#ef86ff', '#166002'],
          ['#a2341e', '$a156e2', '#eiaea3'],
          ['#eec451', '$3321de', '#eca23e']
        ]
        const rgbColors = colors.map(row => {
          return row.map(s => rgb(s))
        })
        const flattenedRgbColors = [].concat(...rgbColors)
        const exceptions = ['#e31432', '#a156e2', '#eca23e']
        const rgbExceptions = exceptions.map(e => rgb(e))
        const trueRgbExceptions = flattenedRgbColors.filter(c => rgbExceptions.indexOf(c) !== -1)
        const componentWrapper = mount(Swatches, {
          propsData: {
            exceptionMode: 'disabled',
            colors,
            exceptions
          }
        })
        const exceptionSwatches = Array.from(componentWrapper.element.querySelectorAll('.vue-swatches__swatch--is-exception'))
        const disabledSwatches = exceptionSwatches.filter(s => s.style.cursor === 'not-allowed')
        const disabledSwatchesColors = disabledSwatches.map(s => rgb(s.style.backgroundColor))

        expect(disabledSwatchesColors)
        .toEqual(trueRgbExceptions)
      })
    })
  })
})
