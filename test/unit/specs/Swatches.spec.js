import Vue from 'vue'
import { mount } from 'vue-test-utils'
import rgb from 'rgb'
import isHexColor from 'is-hex-color'

import Swatches from 'src/Swatches'
import Swatch from 'src/Swatch'
import presets, { supportedProperties } from 'src/presets'

import * as errorsMessages from 'src/errors'

const DEFAULT_BACKGROUND_COLOR = '#FFFFFF'
const DEFAULT_MAX_HEIGHT = 300
const DEFAULT_ROW_LENGTH = 5
const DEFAULT_SWATCH_SIZE = 42

const completPresetExample = {
  swatches: ['#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0'],
  borderRadius: '0',
  rowLength: 6,
  swatchSize: 18,
  spacingSize: 90,
  maxHeight: 80,
  showBorder: true
}

const defaultComponent = mount(Swatches)

describe('Props', () => {
  describe('background-color', () => {
    const testColor = '#333'
    test('default background-color are shown', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          backgroundColor: DEFAULT_BACKGROUND_COLOR
        }
      })
      expect(componentWrapper.html())
      .toEqual(defaultComponent.html())
    })
    describe('When Popover mode is enabled', () => {
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
    test('default close-on-select is set to true', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          closeOnSelect: true
        }
      })
      expect(componentWrapper.html())
      .toEqual(defaultComponent.html())
    })
    describe('When Popover mode is enabled', () => {
      test('should close the popover if true', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            closeOnSelect: true,
            inline: false
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
            closeOnSelect: false,
            inline: false
          }
        })
        componentWrapper.vm.showPopover()
        const container = componentWrapper.find('.vue-swatches__container')
        const swatch = componentWrapper.find('.vue-swatches__swatch')
        swatch.trigger('click')
        expect(container.hasStyle('display', 'none'))
        .not.toBeTruthy()
      })
    })
  })

  describe('colors', () => {
    test('default swatches are shown', () => {
      const presetComponent = mount(Swatches, {
        propsData: {
          colors: 'basic'
        }
      })
      return Vue.nextTick()
      .then(() => {
        expect(presetComponent.html())
        .toEqual(defaultComponent.html())
      })
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
        return Vue.nextTick()
        .then(() => {
          expect(swatchesColors)
          .toEqual(rgbColors)
        })
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
        return Vue.nextTick()
        .then(() => {
          expect(swatchesColors)
          .toEqual(rgbColors)
        })
      })
    })
    describe('When preset name is passed as a prop', () => {
      test('preset colors are shown', () => {
        const presetNameTest = 'material-basic'
        const rgbColors = presets[presetNameTest].swatches.map(c => rgb(c))
        const componentWrapper = mount(Swatches, {
          propsData: {
            colors: presetNameTest
          }
        })
        const swatches = Array.from(componentWrapper.element.querySelectorAll('.vue-swatches__swatch'))
        const swatchesColors = swatches.map(s => rgb(s.style.backgroundColor))

        return Vue.nextTick()
        .then(() => {
          expect(swatchesColors)
          .toEqual(rgbColors)
        })
      })
    })
    describe('When preset object is passed as a pop', () => {
      test('preset colors are shown', () => {
        const rgbColors = completPresetExample.swatches.map(c => rgb(c))
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
            colors: completPresetExample
          }
        })
        const swatches = Array.from(componentWrapper.element.querySelectorAll('.vue-swatches__swatch'))
        const swatchesColors = swatches.map(s => rgb(s.style.backgroundColor))

        return Vue.nextTick()
        .then(() => {
          expect(swatchesColors)
          .toEqual(rgbColors)
        })
      })
    })
  })

  describe('exceptions && exception-mode', () => {
    test('default exceptions are set to []', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          exceptions: []
        }
      })
      expect(componentWrapper.html())
      .toEqual(defaultComponent.html())
    })
    test('default exception-mode are set to disabled', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          exceptionMode: 'disabled'
        }
      })
      expect(componentWrapper.html())
      .toEqual(defaultComponent.html())
    })
    test('should not update value if clicked', () => {
      const colors = ['#e31432', '#a156e2', '#eca23e']
      const componentWrapper = mount(Swatches, {
        propsData: {
          value: '#eca23e',
          colors,
          exceptions: ['#e31432']
        }
      })

      const swatch = componentWrapper.find('.vue-swatches__swatch')
      swatch.trigger('click')
      const selectedSwatch = componentWrapper.findAll(Swatch).wrappers.filter(s => s.vm.selected)[0]

      return Vue.nextTick()
      .then(() => {
        expect(selectedSwatch.vm.swatchColor)
        .toEqual('#eca23e')
      })
    })
    describe('When swatches array is simple', () => {
      test('exceptions should be hidden if exception-mode is hidden', () => {
        const colors = ['#a23e41', '#e31432', '#a156e2', '#aeccea', '#5f0f2a', '#eca23e', '#12313a']
        const rgbColors = colors.map(c => rgb(c))
        const exceptions = ['#E31432', '#A156E2', '#ECA23E'] // Also the case shouldn't matter
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

        return Vue.nextTick()
        .then(() => {
          expect(hiddenSwatchesColors)
          .toEqual(trueRgbExceptions)
        })
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

        return Vue.nextTick()
        .then(() => {
          expect(disabledSwatchesColors)
          .toEqual(trueRgbExceptions)
        })
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

        return Vue.nextTick()
        .then(() => {
          expect(hiddenSwatchesColors)
          .toEqual(trueRgbExceptions)
        })
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

        return Vue.nextTick()
        .then(() => {
          expect(disabledSwatchesColors)
          .toEqual(trueRgbExceptions)
        })
      })
    })
  })

  describe('inline', () => {
    test('inline default is set to false', () => {
      const noInlineComponent = mount(Swatches, {
        propsData: {
          inline: false
        }
      })
      expect(noInlineComponent.html())
      .toEqual(defaultComponent.html())
    })
    describe('When inline prop is true', () => {
      test('should not render the trigger', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: true
          }
        })
        const trigger = componentWrapper.find({ ref: 'trigger-wrapper' })
        expect(trigger.exists())
        .not.toBeTruthy()
      })
      test('should render swatches visible', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: true
          }
        })
        const container = componentWrapper.find('.vue-swatches__container')
        expect(container.hasStyle('display', 'none'))
        .not.toBeTruthy()
      })
    })
    describe('When inline prop is fale (Popover)', () => {
      test('should render the trigger', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false
          }
        })
        const trigger = componentWrapper.find({ ref: 'trigger-wrapper' })
        expect(trigger.exists())
        .toBeTruthy()
      })
      test('shoukd render swatches not visible', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false
          }
        })
        const container = componentWrapper.find('.vue-swatches__container')
        expect(container.hasStyle('display', 'none'))
        .toBeTruthy()
      })
    })
  })

  describe('max-height', () => {
    test(`default max-height is set to ${DEFAULT_MAX_HEIGHT}`, () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          maxHeight: DEFAULT_MAX_HEIGHT
        }
      })
      return Vue.nextTick()
      .then(() => {
        expect(componentWrapper.html())
        .toEqual(defaultComponent.html())
      })
    })
    describe('When Inline mode is enabled', () => {
      test('should not have a max-height value especified', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: true
          }
        })
        const container = componentWrapper.find('.vue-swatches__container')
        expect(container.element.style.maxHeight)
        .toEqual('')
      })
    })
    describe('When Popover mode is enabled', () => {
      test('should update the max-height if prop is passed', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
            maxHeight: 120
          }
        })
        const container = componentWrapper.find('.vue-swatches__container')

        return Vue.nextTick()
        .then(() => {
          expect(container.element.style.maxHeight)
          .toEqual('120px')
        })
      })
      test('should accept string number', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
            maxHeight: '110'
          }
        })
        const container = componentWrapper.find('.vue-swatches__container')

        return Vue.nextTick()
        .then(() => {
          expect(container.element.style.maxHeight)
          .toEqual('110px')
        })
      })
      test('should update the max-height if preset specify one', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
            colors: completPresetExample
          }
        })
        const container = componentWrapper.find('.vue-swatches__container')

        return Vue.nextTick()
        .then(() => {
          expect(container.element.style.maxHeight)
          .toEqual(`${completPresetExample.maxHeight}px`)
        })
      })
      test('should priorize the max-height from the prop over the preset one', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
            colors: completPresetExample,
            maxHeight: 250
          }
        })
        const container = componentWrapper.find('.vue-swatches__container')

        return Vue.nextTick()
        .then(() => {
          expect(container.element.style.maxHeight)
          .toEqual(`250px`)
        })
      })
    })
  })

  describe('shapes', () => {
    test('default shape is set to squares', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          shape: 'squares'
        }
      })
      expect(componentWrapper.html())
      .toEqual(defaultComponent.html())
    })
    test('trigger should render as circle if prop is circles', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          shapes: 'circles',
          inline: false
        }
      })
      const trigger = componentWrapper.find('.vue-swatches__trigger')

      return Vue.nextTick()
      .then(() => {
        expect(trigger.element.style.borderRadius)
        .toEqual('50%')
      })
    })
  })

  describe('popover-to', () => {
    test('default popover-to is set to right', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          popoverTo: 'right'
        }
      })
      return Vue.nextTick()
      .then(() => {
        expect(componentWrapper.html())
        .toEqual(defaultComponent.html())
      })
    })
    test('container should posisionate at right if prop is left', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          inline: false,
          popoverTo: 'left'
        }
      })
      const container = componentWrapper.find('.vue-swatches__container')
      expect(container.element.style.right)
      .toEqual('0px')
    })
    test('container should posisionate at left if prop is right', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          inline: false,
          popoverTo: 'right'
        }
      })
      const container = componentWrapper.find('.vue-swatches__container')
      expect(container.element.style.left)
      .toEqual('0px')
    })
  })

  describe('row-length', () => {
    test(`default row-length is set to ${DEFAULT_ROW_LENGTH}`, () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          rowLength: DEFAULT_ROW_LENGTH
        }
      })

      return Vue.nextTick()
      .then(() => {
        expect(componentWrapper.html())
        .toEqual(defaultComponent.html())
      })
    })
    test('should update the row-length if prop is passed', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          rowLength: 8
        }
      })

      return Vue.nextTick()
      .then(() => {
        expect(componentWrapper.vm.computedRowLength)
        .toEqual(8)
      })
    })
    test('should accept string number', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          rowLength: '6'
        }
      })

      return Vue.nextTick()
      .then(() => {
        expect(componentWrapper.vm.computedRowLength)
        .toEqual(6)
      })
    })
    test('should update the row-length if preset especify one', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: completPresetExample
        }
      })

      return Vue.nextTick()
      .then(() => {
        expect(componentWrapper.vm.computedRowLength)
        .toEqual(completPresetExample.rowLength)
      })
    })
    test('should priorize the row-length from the prop over the preset one', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: completPresetExample,
          rowLength: 10
        }
      })

      return Vue.nextTick()
      .then(() => {
        expect(componentWrapper.vm.computedRowLength)
        .toEqual(10)
      })
    })
  })

  describe('show-border', () => {
    test('default show-border is set to false', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          showBorder: false
        }
      })

      return Vue.nextTick()
      .then(() => {
        expect(componentWrapper.html())
        .toEqual(defaultComponent.html())
      })
    })
    test('should update the show-border if prop is passed', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          showBorder: true
        }
      })
      const borderedSwatches = componentWrapper.findAll('.vue-swatches__swatch--border')

      return Vue.nextTick()
      .then(() => {
        expect(borderedSwatches.length)
        .toEqual(componentWrapper.vm.computedColors.length)
      })
    })
    test('should update the show-border if preset especify one', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: completPresetExample
        }
      })
      const borderedSwatches = componentWrapper.findAll('.vue-swatches__swatch--border')

      return Vue.nextTick()
      .then(() => {
        expect(borderedSwatches.length)
        .toEqual(componentWrapper.vm.computedColors.length)
      })
    })
    test('should priorize the show-border from the prop over the preset one', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: completPresetExample,
          showBorder: false
        }
      })
      const borderedSwatches = componentWrapper.findAll('.vue-swatches__swatch--border')

      return Vue.nextTick()
      .then(() => {
        expect(borderedSwatches.length)
        .toEqual(0)
      })
    })
  })

  describe('show-checkbox', () => {
    test('default show-checkbox is set to true', () => {
      const defaultComponent = mount(Swatches, {
        propsData: {
          inline: false
        }
      })
      const componentWrapper = mount(Swatches, {
        propsData: {
          showCheckbox: true,
          inline: false
        }
      })

      const defaultSwatch = defaultComponent.find('.vue-swatches__swatch')
      const componentSwatch = componentWrapper.find('.vue-swatches__swatch')

      defaultSwatch.trigger('click')
      componentSwatch.trigger('click')

      return Vue.nextTick()
      .then(() => {
        expect(componentSwatch.html())
        .toEqual(defaultSwatch.html())
      })
    })
    test('should render the checkbox if true', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          showCheckbox: true,
          inline: false
        }
      })
      const swatch = componentWrapper.find('.vue-swatches__swatch')
      swatch.trigger('click')

      const check = swatch.find('.vue-swatches__check__wrapper ')

      expect(check.hasStyle('display', 'none'))
      .not.toBeTruthy()
    })
    test('should not render the checkbox if true', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          showCheckbox: false,
          inline: false
        }
      })
      const swatch = componentWrapper.find('.vue-swatches__swatch')
      swatch.trigger('click')

      const check = swatch.find('.vue-swatches__check__wrapper ')

      expect(check.hasStyle('display', 'none'))
      .toBeTruthy()
    })
  })

  describe('swatch-size', () => {
    test(`default swatch-size is set to ${DEFAULT_SWATCH_SIZE}`, () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          swatchSize: DEFAULT_SWATCH_SIZE
        }
      })

      return Vue.nextTick()
      .then(() => {
        expect(componentWrapper.html())
        .toEqual(defaultComponent.html())
      })
    })
    test('should accept string number', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          swatchSize: '16'
        }
      })
      const expectedDimensions = {
        width: '16px',
        height: '16px'
      }
      const swatch = componentWrapper.find('.vue-swatches__swatch')
      const swatchDimensions = {
        width: swatch.element.style.width,
        height: swatch.element.style.height
      }

      return Vue.nextTick()
      .then(() => {
        expect(swatchDimensions)
        .toEqual(expectedDimensions)
      })
    })
    test('should update the swatch-size if prop is passed', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          swatchSize: 24
        }
      })
      const expectedDimensions = {
        width: '24px',
        height: '24px'
      }
      const swatch = componentWrapper.find('.vue-swatches__swatch')
      const swatchDimensions = {
        width: swatch.element.style.width,
        height: swatch.element.style.height
      }

      return Vue.nextTick()
      .then(() => {
        expect(swatchDimensions)
        .toEqual(expectedDimensions)
      })
    })
    test('should update the swatch-size if preset especify one', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: completPresetExample
        }
      })
      const expectedDimensions = {
        width: `${completPresetExample.swatchSize}px`,
        height: `${completPresetExample.swatchSize}px`
      }
      const swatch = componentWrapper.find('.vue-swatches__swatch')
      const swatchDimensions = {
        width: swatch.element.style.width,
        height: swatch.element.style.height
      }

      return Vue.nextTick()
      .then(() => {
        expect(swatchDimensions)
        .toEqual(expectedDimensions)
      })
    })
    test('should priorize the swatch-size from the prop over the preset one', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: completPresetExample,
          swatchSize: 34
        }
      })
      const expectedDimensions = {
        width: '34px',
        height: '34px'
      }
      const swatch = componentWrapper.find('.vue-swatches__swatch')
      const swatchDimensions = {
        width: swatch.element.style.width,
        height: swatch.element.style.height
      }

      return Vue.nextTick()
      .then(() => {
        expect(swatchDimensions)
        .toEqual(expectedDimensions)
      })
    })
  })

  describe('value', () => {
    test('should select value', () => {
      const colors = ['#e31432', '#a156e2', '#eca23e']
      const componentWrapper = mount(Swatches, {
        propsData: {
          value: '#e31432',
          colors
        }
      })
      const selectedSwatch = componentWrapper.findAll(Swatch).wrappers.filter(s => s.vm.selected)[0]

      return Vue.nextTick()
      .then(() => {
        expect(selectedSwatch.vm.swatchColor)
        .toEqual('#e31432')
      })
    })
    test('should update the value', () => {
      const colors = ['#e31432', '#a156e2', '#eca23e']
      const componentWrapper = mount(Swatches, {
        propsData: {
          value: '#eca23e',
          colors
        }
      })
      componentWrapper.setProps({ value: '#a156e2' })

      return Vue.nextTick()
      .then(() => {
        const selectedSwatch = componentWrapper.findAll(Swatch).wrappers.filter(s => s.vm.selected)[0]
        expect(selectedSwatch.vm.swatchColor)
        .toEqual('#a156e2')
      })
    })
    test('should select value with diferent case', () => {
      const colors = ['#e31432', '#a156e2', '#eca23e']
      const componentWrapper = mount(Swatches, {
        propsData: {
          value: '#ECa23E',
          colors
        }
      })
      const selectedSwatch = componentWrapper.findAll(Swatch).wrappers.filter(s => s.vm.selected)[0]

      return Vue.nextTick()
      .then(() => {
        expect(selectedSwatch.vm.swatchColor)
        .toEqual('#eca23e')
      })
    })
    test('should not select any swatch when null', () => {
      const colors = ['#e31432', '#a156e2', '#eca23e']
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors
        }
      })
      const selectedSwatchList = componentWrapper.findAll(Swatch).wrappers.filter(s => s.vm.selected)

      return Vue.nextTick()
      .then(() => {
        expect(selectedSwatchList.length)
        .toEqual(0)
      })
    })
  })
})

describe('Events', () => {
  describe('@input', () => {
    test('should be emited whenever user pick a swatch', () => {
      const componentWrapper = mount(Swatches)
      const swatch = componentWrapper.find(Swatch)
      swatch.trigger('click')

      return Vue.nextTick()
      .then(() => {
        expect(componentWrapper.emitted().input.length).toEqual(1)
      })
    })
    test('should payload the value', () => {
      const componentWrapper = mount(Swatches)
      const swatch = componentWrapper.find(Swatch)
      swatch.trigger('click')
      const color = swatch.vm.swatchColor

      return Vue.nextTick()
      .then(() => {
        expect(componentWrapper.emitted().input[0][0])
        .toEqual(color)
      })
    })
  })
  describe('@close', () => {
    test('should not be emited when Inline mode is activated', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          inline: true,
          closeOnSelect: true
        }
      })
      componentWrapper.vm.onBlur(null)

      return Vue.nextTick()
      .then(() => {
        expect(componentWrapper.emitted().close)
        .not.toBeTruthy()
      })
    })
    describe('When legacy trigger is used', () => {
      test('should be emited whenever user close the Popover by clicking outside', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false
          }
        })
        componentWrapper.vm.showPopover()
        componentWrapper.vm.onBlur(null)

        return Vue.nextTick()
        .then(() => {
          expect(componentWrapper.emitted().close.length).toEqual(1)
        })
      })
      test('should be emited whenever user close the Popover by clicking the trigger', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false
          }
        })
        const trigger = componentWrapper.find({ ref: 'trigger-wrapper' })
        trigger.trigger('click')
        trigger.trigger('click')

        return Vue.nextTick()
        .then(() => {
          expect(componentWrapper.emitted().close.length).toEqual(1)
        })
      })
      test('should be emited whenever user close the Popover by clicking a Swatch', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
            closeOnSelect: true
          }
        })
        componentWrapper.vm.showPopover()
        const swatch = componentWrapper.find(Swatch)
        swatch.trigger('click')

        return Vue.nextTick()
        .then(() => {
          expect(componentWrapper.emitted().close.length).toEqual(1)
        })
      })
    })
    describe('When trigger slot is used', () => {
      test('should be emited whenever user close the Popover by clicking outside', () => {
        const buttonTest = '<button id="button-test">Hello World</button>'
        const componentWrapper = mount(Swatches, {
          slots: {
            trigger: buttonTest
          },
          propsData: {
            inline: false
          }
        })
        componentWrapper.vm.showPopover()
        componentWrapper.vm.onBlur(null)

        return Vue.nextTick()
        .then(() => {
          expect(componentWrapper.emitted().close.length).toEqual(1)
        })
      })
      test('should be emited whenever user close the Popover by clicking the trigger', () => {
        const buttonTest = '<button id="button-test">Hello World</button>'
        const componentWrapper = mount(Swatches, {
          slots: {
            trigger: buttonTest
          },
          propsData: {
            inline: false
          }
        })
        const trigger = componentWrapper.find({ ref: 'trigger-wrapper' })
        trigger.trigger('click')
        trigger.trigger('click')

        return Vue.nextTick()
        .then(() => {
          expect(componentWrapper.emitted().close.length).toEqual(1)
        })
      })
      test('should be emited whenever user close the Popover by clicking a Swatch', () => {
        const buttonTest = '<button id="button-test">Hello World</button>'
        const componentWrapper = mount(Swatches, {
          slots: {
            trigger: buttonTest
          },
          propsData: {
            inline: false
          }
        })
        componentWrapper.vm.showPopover()
        const swatch = componentWrapper.find(Swatch)
        swatch.trigger('click')

        return Vue.nextTick()
        .then(() => {
          expect(componentWrapper.emitted().close.length).toEqual(1)
        })
      })
    })
    test('should payload the value', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          inline: false,
          closeOnSelect: true
        }
      })
      componentWrapper.vm.showPopover()
      const swatch = componentWrapper.find(Swatch)
      swatch.trigger('click')
      const color = swatch.vm.swatchColor

      return Vue.nextTick()
      .then(() => {
        expect(componentWrapper.emitted().close[0][0])
        .toEqual(color)
      })
    })
  })
})

describe('Slots', () => {
  describe('trigger', () => {
    test('should replace the trigger node', () => {
      const spanTest = '<span id="span-test">Hello World</span>'
      const componentWrapper = mount(Swatches, {
        slots: {
          trigger: spanTest
        },
        propsData: {
          inline: false
        }
      })
      const trigger = componentWrapper.find('#span-test')

      return Vue.nextTick()
      .then(() => {
        expect(trigger.html())
        .toEqual(spanTest)
      })
    })
  })
})

describe('Exceptions', () => {
  describe('colors Prop', () => {
    test('should throw if swatches property is not present on preset', () => {
      const incorrectPreset = {
        borderRadius: '15%',
        spacingSize: 20
      }
      const mountComponent = () => mount(Swatches, {
        propsData: {
          colors: incorrectPreset
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.presetArray())
    })
    test('should throw if swatches property is not an array on preset', () => {
      const incorrectPreset = {
        swatches: 189,
        borderRadius: '15%',
        spacingSize: 20
      }
      const mountComponent = () => mount(Swatches, {
        propsData: {
          colors: incorrectPreset
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.presetArray())
    })
    test('should throw if preset name doesn\'t match any preset', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          colors: 'fancy-preset-name-that-doesnt-exists'
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.presetName('fancy-preset-name-that-doesnt-exists'))
    })
    test('should throw if prop is not a valid type', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          colors: /regular-expression/
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.typeCheckError('colors', ['Array', 'Object', 'String'], /regular-expression/))
    })
  })
  describe('exception-mode Prop', () => {
    test('should throw if prop doesn\'t match any valid value', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          exceptionMode: 'value-that-doesnt-match'
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.exceptionModeValue('value-that-doesnt-match'))
    })
    test('should throw if prop is not a valid type', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          exceptionMode: 158.18
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.typeCheckError('exception-mode', ['String'], 158.18))
    })
  })
  describe('max-height Prop', () => {
    test('should throw if prop is a String but can\'t be parsed as Number', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          maxHeight: 'not-a-number'
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.stringNotANumber('max-height'))
    })
    test('should throw if prop is not a valid type', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          maxHeight: { data: 'Hello' }
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.typeCheckError('max-height', ['Number', 'String'], { data: 'Hello' }))
    })
  })
  describe('shapes Prop', () => {
    test('should throw if prop doesn\'t match any valid value', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          shapes: 'value-that-doesnt-match'
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.shapesValue('value-that-doesnt-match'))
    })
    test('should throw if prop is not a valid type', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          shapes: ['fancy', 'array']
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.typeCheckError('shapes', ['String'], ['fancy', 'array']))
    })
  })
  describe('popover-to Prop', () => {
    test('should throw if prop doesn\'t match any valid value', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          popoverTo: 'value-that-doesnt-match'
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.popoverToValue('value-that-doesnt-match'))
    })
    test('should throw if prop is not a valid type', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          popoverTo: 158.18
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.typeCheckError('popover-to', ['String'], 158.18))
    })
  })
  describe('row-length Prop', () => {
    test('should throw if prop is a String but can\'t be parsed as Number', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          rowLength: 'not-a-number'
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.stringNotANumber('row-length'))
    })
    test('should throw if prop is not a valid type', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          rowLength: ['fancy', 'array']
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.typeCheckError('row-length', ['Number', 'String'], ['fancy', 'array']))
    })
  })
  describe('swatch-size Prop', () => {
    test('should throw if prop is a String but can\'t be parsed as Number', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          swatchSize: 'not-a-number'
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.stringNotANumber('swatch-size'))
    })
    test('should throw if prop is not a valid type', () => {
      const mountComponent = () => mount(Swatches, {
        propsData: {
          swatchSize: /regular-expression/
        }
      })
      expect(mountComponent)
      .toThrow(errorsMessages.typeCheckError('swatch-size', ['Number', 'String'], /regular-expression/))
    })
  })
})

describe('Presets', () => {
  let presetsTested = 0
  const testPreset = (presetName) => {
    describe(`"${presetName}"`, () => {
      test('should have swatches property', () => {
        const preset = presets[presetName]
        const swatches = preset.swatches

        expect(swatches)
        .toBeTruthy()
      })
      test('preset should have a valid colors', () => {
        let isNested = false
        let validSwatches = 0
        let swatchesCount = 0
        const preset = presets[presetName]
        const swatches = preset.swatches

        if (swatches instanceof Array && swatches.length > 0 && swatches[0] instanceof Array) {
          isNested = true
        }
        if (isNested) {
          swatches.forEach(r => {
            if (!(r instanceof Array)) return swatchesCount++
            r.forEach(s => {
              if (isHexColor(s)) validSwatches++
              return swatchesCount++
            })
          })
        } else {
          swatches.forEach(s => {
            if (isHexColor(s)) validSwatches++
            return swatchesCount++
          })
        }

        expect(`${validSwatches} valid colors`)
        .toEqual(`${swatchesCount} valid colors`)
      })
      test('preset should have a valid borderRadius', () => {
        let valid = false
        const preset = presets[presetName]
        const borderRadius = preset.borderRadius
        if (typeof borderRadius === 'undefined') valid = true // borderRadius is not required
        if (typeof borderRadius === 'string') valid = true

        expect(valid)
        .toBeTruthy()
      })
      test('preset should have a valid rowLength', () => {
        let valid = false
        const preset = presets[presetName]
        const rowLength = preset.rowLength
        if (typeof rowLength === 'undefined') valid = true // rowLength is not required
        if (typeof rowLength === 'number' && rowLength > 0 && Number.isInteger(rowLength)) valid = true

        expect(valid)
        .toBeTruthy()
      })
      test('preset should have a valid spacingSize', () => {
        let valid = false
        const preset = presets[presetName]
        const spacingSize = preset.spacingSize
        if (typeof spacingSize === 'undefined') valid = true // spacingSize is not required
        if (typeof spacingSize === 'number' && spacingSize >= 0) valid = true

        expect(valid)
        .toBeTruthy()
      })
      test('preset should have a valid swatchSize', () => {
        let valid = false
        const preset = presets[presetName]
        const swatchSize = preset.swatchSize
        if (typeof swatchSize === 'undefined') valid = true // swatchSize is not required
        if (typeof swatchSize === 'number' && swatchSize > 0) valid = true

        expect(valid)
        .toBeTruthy()
      })
      test('preset should have a valid maxHeight', () => {
        let valid = false
        const preset = presets[presetName]
        const maxHeight = preset.maxHeight
        if (typeof maxHeight === 'undefined') valid = true // maxHeight is not required
        if (typeof maxHeight === 'number' && maxHeight > 0) valid = true

        expect(valid)
        .toBeTruthy()
      })
      test('preset should have a valid showBorder', () => {
        let valid = false
        const preset = presets[presetName]
        const showBorder = preset.showBorder
        if (typeof showBorder === 'undefined') valid = true // showBorder is not required
        if (typeof showBorder === 'boolean') valid = true

        expect(valid)
        .toBeTruthy()
      })
      test('preset should only have a supported properties', () => {
        let validProperties = 0
        const preset = presets[presetName]
        const keys = Object.keys(preset)

        keys.forEach(k => {
          if (supportedProperties.indexOf(k) !== -1) validProperties++
        })

        expect(`${keys.length} valid properties`)
        .toEqual(`${validProperties} valid properties`)
      })
      presetsTested++
    })
  }

  testPreset('basic')
  testPreset('material-basic')
  testPreset('material-dark')
  testPreset('material-light')
  testPreset('text-basic')
  testPreset('text-advanced')

  test('all presets should be tested', () => {
    expect(presetsTested)
    .toEqual(Object.keys(presets).length)
  })
})
