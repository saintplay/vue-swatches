import Vue from 'vue'
import { mount } from '@vue/test-utils'
import rgb from 'rgb'

import Swatches, {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_MAX_HEIGHT,
  DEFAULT_ROW_LENGTH,
  DEFAULT_SWATCH_SIZE,
} from '@/Swatches'
import Swatch from '@/Swatch'
import presets from '@/presets'

const completPresetExample = {
  swatches: [
    '#cc4125',
    '#e06666',
    '#f6b26b',
    '#ffd966',
    '#93c47d',
    '#76a5af',
    '#6d9eeb',
    '#6fa8dc',
    '#8e7cc3',
    '#c27ba0',
  ],
  borderRadius: '0',
  rowLength: 6,
  swatchSize: 18,
  spacingSize: 90,
  maxHeight: 80,
  showBorder: true,
}

const defaultComponent = mount(Swatches)
const defaultComponentWithFallback = mount(Swatches, {
  propsData: {
    showFallback: true,
  },
})

describe('Props', () => {
  describe('background-color', () => {
    const testColor = '#333'
    test('default background-color are shown', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          backgroundColor: DEFAULT_BACKGROUND_COLOR,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })
    describe('When Popover mode is enabled', () => {
      test('background color should render color passed as a prop', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            backgroundColor: testColor,
          },
        })
        const container = componentWrapper.find('.vue-swatches__container')
          .element

        return Vue.nextTick().then(() => {
          expect(rgb(container.style.backgroundColor)).toEqual(rgb(testColor))
        })
      })
    })

    describe('When Inline mode is enabled', () => {
      test('background color should render color passed as a prop', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: true,
            backgroundColor: testColor,
          },
        })
        const container = componentWrapper.find('.vue-swatches__container')
          .element

        return Vue.nextTick().then(() => {
          expect(rgb(container.style.backgroundColor)).toEqual(rgb(testColor))
        })
      })
    })
  })

  describe('close-on-select', () => {
    test('default close-on-select is set to true', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          closeOnSelect: true,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })
    describe('When Popover mode is enabled', () => {
      test('should close the popover if true', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            closeOnSelect: true,
            inline: false,
          },
        })
        componentWrapper.vm.showPopover()
        const container = componentWrapper.find('.vue-swatches__container')
        const swatch = componentWrapper.find('.vue-swatches__swatch')
        swatch.trigger('click')

        return Vue.nextTick().then(() => {
          expect(container.isVisible()).toBe(false)
        })
      })
      test('should not close the popover if false', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            closeOnSelect: false,
            inline: false,
          },
        })
        componentWrapper.vm.showPopover()
        const container = componentWrapper.find('.vue-swatches__container')
        const swatch = componentWrapper.find('.vue-swatches__swatch')
        swatch.trigger('click')

        return Vue.nextTick().then(() => {
          expect(container.isVisible()).toBe(true)
        })
      })
    })
  })

  describe('colors', () => {
    test('default swatches are shown', () => {
      const presetComponent = mount(Swatches, {
        propsData: {
          colors: 'basic',
        },
      })
      return Vue.nextTick().then(() => {
        expect(presetComponent.html()).toEqual(defaultComponent.html())
      })
    })
    describe('When custom colors are passed as a prop', () => {
      test('given array colors are shown', () => {
        const colors = ['#e31432', '#a156e2', '#eca23e']
        const rgbColors = colors.map(c => rgb(c))
        const componentWrapper = mount(Swatches, {
          propsData: {
            colors,
          },
        })
        const swatches = Array.from(
          componentWrapper.element.querySelectorAll('.vue-swatches__swatch')
        )
        const swatchesColors = swatches.map(s => rgb(s.style.backgroundColor))
        return Vue.nextTick().then(() => {
          expect(swatchesColors).toEqual(rgbColors)
        })
      })
      test('given nested array colors are shown', () => {
        const colors = [
          ['#e31432', '#a156e2', '#eca23e'],
          ['#a2341e', '$ef86ff', '#eiaea3'],
          ['#eec451', '$3321de', '#166002'],
        ]
        const rgbColors = colors.map(row => {
          return row.map(s => rgb(s))
        })
        const componentWrapper = mount(Swatches, {
          propsData: {
            colors,
          },
        })
        const swatchesRows = componentWrapper.element.querySelectorAll(
          '.vue-swatches__row'
        )
        const swatchesColors = []

        swatchesRows.forEach(swatchElement => {
          const swatchesNodeList = Array.from(
            swatchElement.querySelectorAll('.vue-swatches__swatch')
          )
          const rgbSwatches = swatchesNodeList.map(s =>
            rgb(s.style.backgroundColor)
          )
          swatchesColors.push(rgbSwatches)
        })
        return Vue.nextTick().then(() => {
          expect(swatchesColors).toEqual(rgbColors)
        })
      })
      describe('When empty string are passed as a color', () => {
        test('it should render the swatch diagonal', () => {
          const colors = ['', '#a156e2', '#eca23e']
          const componentWrapper = mount(Swatches, {
            propsData: {
              colors,
            },
          })
          const diagonal = componentWrapper.find(
            '.vue-swatches__swatch .vue-swatches__diagonal--wrapper'
          )
          return Vue.nextTick().then(() => {
            expect(diagonal.exists()).toBeTruthy()
          })
        })
        test('it should render a diagonal in the trigger if value match', () => {
          const colors = ['', '#a156e2', '#eca23e']
          const componentWrapper = mount(Swatches, {
            propsData: {
              colors,
              value: '',
            },
          })
          const diagonal = componentWrapper
            .find('.vue-swatches__trigger')
            .find('.vue-swatches__diagonal--wrapper')
          return Vue.nextTick().then(() => {
            expect(diagonal.isVisible()).toBeTruthy()
          })
        })
        test("it should not render a diagonal in the trigger if value doesn't match", () => {
          const colors = ['', '#a156e2', '#eca23e']
          const componentWrapper = mount(Swatches, {
            propsData: {
              colors,
              value: '#a156e2',
            },
          })
          const diagonal = componentWrapper
            .find('.vue-swatches__trigger')
            .find('.vue-swatches__diagonal--wrapper')
          return Vue.nextTick().then(() => {
            expect(diagonal.isVisible()).not.toBeTruthy()
          })
        })
        test('it should update the value', () => {
          const colors = ['', '#a156e2', '#eca23e']
          const componentWrapper = mount(Swatches, {
            propsData: {
              colors,
            },
          })
          const swatch = componentWrapper.find('.vue-swatches__swatch')
          swatch.trigger('click')
          return Vue.nextTick().then(() => {
            expect(componentWrapper.vm.internalValue).toEqual('')
          })
        })
        test('it should render the check if the value is empty string', () => {
          const colors = ['', '#a156e2', '#eca23e']
          const componentWrapper = mount(Swatches, {
            propsData: {
              colors,
              value: '',
            },
          })
          const swatch = componentWrapper.find('.vue-swatches__swatch')
          const check = swatch.find('.vue-swatches__check__wrapper')
          swatch.trigger('click')

          return Vue.nextTick().then(() => {
            expect(check.element.style.display).not.toBe('none')
          })
        })
      })
      test('given array colors are shown', () => {
        const colors = ['#e31432', '#a156e2', '#eca23e']
        const rgbColors = colors.map(c => rgb(c))
        const componentWrapper = mount(Swatches, {
          propsData: {
            colors,
          },
        })
        const swatches = Array.from(
          componentWrapper.element.querySelectorAll('.vue-swatches__swatch')
        )
        const swatchesColors = swatches.map(s => rgb(s.style.backgroundColor))
        return Vue.nextTick().then(() => {
          expect(swatchesColors).toEqual(rgbColors)
        })
      })
    })
    describe('When preset name is passed as a prop', () => {
      test('preset colors are shown', () => {
        const presetNameTest = 'material-basic'
        const rgbColors = presets[presetNameTest].swatches.map(c => rgb(c))
        const componentWrapper = mount(Swatches, {
          propsData: {
            colors: presetNameTest,
          },
        })
        const swatches = Array.from(
          componentWrapper.element.querySelectorAll('.vue-swatches__swatch')
        )
        const swatchesColors = swatches.map(s => rgb(s.style.backgroundColor))

        return Vue.nextTick().then(() => {
          expect(swatchesColors).toEqual(rgbColors)
        })
      })
    })
    describe('When preset object is passed as a pop', () => {
      test('preset colors are shown', () => {
        const rgbColors = completPresetExample.swatches.map(c => rgb(c))
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
            colors: completPresetExample,
          },
        })
        const swatches = Array.from(
          componentWrapper.element.querySelectorAll('.vue-swatches__swatch')
        )
        const swatchesColors = swatches.map(s => rgb(s.style.backgroundColor))

        return Vue.nextTick().then(() => {
          expect(swatchesColors).toEqual(rgbColors)
        })
      })
    })
  })

  describe('exceptions && exception-mode', () => {
    test('default exceptions are set to []', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          exceptions: [],
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })
    test('default exception-mode are set to disabled', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          exceptionMode: 'disabled',
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })
    test('should not update value if clicked', () => {
      const colors = ['#e31432', '#a156e2', '#eca23e']
      const componentWrapper = mount(Swatches, {
        propsData: {
          value: '#eca23e',
          colors,
          exceptions: ['#e31432'],
        },
      })

      const swatch = componentWrapper.find('.vue-swatches__swatch')
      swatch.trigger('click')
      const selectedSwatch = componentWrapper
        .findAll(Swatch)
        .wrappers.filter(s => s.vm.selected)[0]

      return Vue.nextTick().then(() => {
        expect(selectedSwatch.vm.swatchColor).toEqual('#eca23e')
      })
    })
    describe('When swatches array is simple', () => {
      test('exceptions should be hidden if exception-mode is hidden', () => {
        const colors = [
          '#a23e41',
          '#e31432',
          '#a156e2',
          '#aeccea',
          '#5f0f2a',
          '#eca23e',
          '#12313a',
        ]
        const rgbColors = colors.map(c => rgb(c))
        const exceptions = ['#E31432', '#A156E2', '#ECA23E'] // Also the case shouldn't matter
        const rgbExceptions = exceptions.map(e => rgb(e))
        const trueRgbExceptions = rgbColors.filter(
          c => rgbExceptions.indexOf(c) !== -1
        )
        const componentWrapper = mount(Swatches, {
          propsData: {
            exceptionMode: 'hidden',
            colors,
            exceptions,
          },
        })
        const exceptionSwatches = Array.from(
          componentWrapper.element.querySelectorAll(
            '.vue-swatches__swatch--is-exception'
          )
        )
        const hiddenSwatches = exceptionSwatches.filter(
          s => s.style.display === 'none'
        )
        const hiddenSwatchesColors = hiddenSwatches.map(s =>
          rgb(s.style.backgroundColor)
        )

        return Vue.nextTick().then(() => {
          expect(hiddenSwatchesColors).toEqual(trueRgbExceptions)
        })
      })
      test('exceptions should be disabled if exception-mode is disabled', () => {
        const colors = [
          '#a23e41',
          '#e31432',
          '#a156e2',
          '#aeccea',
          '#5f0f2a',
          '#eca23e',
          '#12313a',
        ]
        const rgbColors = colors.map(c => rgb(c))
        const exceptions = ['#e31432', '#a156e2', '#eca23e']
        const rgbExceptions = exceptions.map(e => rgb(e))
        const trueRgbExceptions = rgbColors.filter(
          c => rgbExceptions.indexOf(c) !== -1
        )
        const componentWrapper = mount(Swatches, {
          propsData: {
            exceptionMode: 'disabled',
            colors,
            exceptions,
          },
        })
        const exceptionSwatches = Array.from(
          componentWrapper.element.querySelectorAll(
            '.vue-swatches__swatch--is-exception'
          )
        )
        const disabledSwatches = exceptionSwatches.filter(
          s => s.style.cursor === 'not-allowed'
        )
        const disabledSwatchesColors = disabledSwatches.map(s =>
          rgb(s.style.backgroundColor)
        )

        return Vue.nextTick().then(() => {
          expect(disabledSwatchesColors).toEqual(trueRgbExceptions)
        })
      })
    })
    describe('When swatches array is nested', () => {
      test('exceptions should be hidden if exception-mode is hidden', () => {
        const colors = [
          ['#e31432', '#ef86ff', '#166002'],
          ['#a2341e', '$a156e2', '#eiaea3'],
          ['#eec451', '$3321de', '#eca23e'],
        ]
        const rgbColors = colors.map(row => {
          return row.map(s => rgb(s))
        })
        const flattenedRgbColors = [].concat(...rgbColors)
        const exceptions = ['#e31432', '#a156e2', '#eca23e']
        const rgbExceptions = exceptions.map(e => rgb(e))
        const trueRgbExceptions = flattenedRgbColors.filter(
          c => rgbExceptions.indexOf(c) !== -1
        )
        const componentWrapper = mount(Swatches, {
          propsData: {
            exceptionMode: 'hidden',
            colors,
            exceptions,
          },
        })
        const exceptionSwatches = Array.from(
          componentWrapper.element.querySelectorAll(
            '.vue-swatches__swatch--is-exception'
          )
        )
        const hiddenSwatches = exceptionSwatches.filter(
          s => s.style.display === 'none'
        )
        const hiddenSwatchesColors = hiddenSwatches.map(s =>
          rgb(s.style.backgroundColor)
        )

        return Vue.nextTick().then(() => {
          expect(hiddenSwatchesColors).toEqual(trueRgbExceptions)
        })
      })
      test('exceptions should be disabled if exception-mode is disabled', () => {
        const colors = [
          ['#e31432', '#ef86ff', '#166002'],
          ['#a2341e', '$a156e2', '#eiaea3'],
          ['#eec451', '$3321de', '#eca23e'],
        ]
        const rgbColors = colors.map(row => {
          return row.map(s => rgb(s))
        })
        const flattenedRgbColors = [].concat(...rgbColors)
        const exceptions = ['#e31432', '#a156e2', '#eca23e']
        const rgbExceptions = exceptions.map(e => rgb(e))
        const trueRgbExceptions = flattenedRgbColors.filter(
          c => rgbExceptions.indexOf(c) !== -1
        )
        const componentWrapper = mount(Swatches, {
          propsData: {
            exceptionMode: 'disabled',
            colors,
            exceptions,
          },
        })
        const exceptionSwatches = Array.from(
          componentWrapper.element.querySelectorAll(
            '.vue-swatches__swatch--is-exception'
          )
        )
        const disabledSwatches = exceptionSwatches.filter(
          s => s.style.cursor === 'not-allowed'
        )
        const disabledSwatchesColors = disabledSwatches.map(s =>
          rgb(s.style.backgroundColor)
        )

        return Vue.nextTick().then(() => {
          expect(disabledSwatchesColors).toEqual(trueRgbExceptions)
        })
      })
    })
  })

  describe('disabled', () => {
    test('default disabled is set to false', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          disabled: false,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })

    describe('When Inline mode is enabled', () => {
      test("value won't change when cliking a swatch", () => {
        const colors = ['#e31432', '#a156e2', '#eca23e']
        const componentWrapper = mount(Swatches, {
          propsData: {
            value: '#eca23e',
            colors,
            disabled: true,
            inline: true,
          },
        })

        const swatch = componentWrapper.find('.vue-swatches__swatch')
        swatch.trigger('click')
        const selectedSwatch = componentWrapper
          .findAll(Swatch)
          .wrappers.filter(s => s.vm.selected)[0]

        return Vue.nextTick().then(() => {
          expect(selectedSwatch.vm.swatchColor).toEqual('#eca23e')
        })
      })
    })

    describe('When Inline mode is not enabled', () => {
      test("default trigger won't open the Popover", () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            disabled: true,
            inline: false,
          },
        })
        const trigger = componentWrapper.find({ ref: 'triggerWrapper' })
        const container = componentWrapper.find('.vue-swatches__container')
        trigger.trigger('click')

        return Vue.nextTick().then(() => {
          expect(container.isVisible()).toBe(false)
        })
      })
      test("custom trigger won't open the Popover", () => {
        const buttonTest = '<button id="button-test">Hello World</button>'
        const componentWrapper = mount(Swatches, {
          slots: {
            trigger: buttonTest,
          },
          propsData: {
            disabled: true,
            inline: false,
          },
        })
        const trigger = componentWrapper.find('#button-test')
        const container = componentWrapper.find('.vue-swatches__container')
        trigger.trigger('click')

        return Vue.nextTick().then(() => {
          expect(container.isVisible()).toBe(false)
        })
      })
    })
  })

  describe('fallback-input-class', () => {
    test('default fallback-input-class is set to null', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          fallbackInputClass: null,
          showFallback: true,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(
          defaultComponentWithFallback.html()
        )
      })
    })

    test('fallback-input-class should be applied', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          fallbackInputClass: 'class-example',
          showFallback: true,
          inline: true, // or false, doesn't matter
        },
      })
      const input = componentWrapper.find('.vue-swatches__fallback__input')

      return Vue.nextTick().then(() => {
        expect(input.classes().indexOf('class-example') !== -1).toBeTruthy()
      })
    })
  })

  describe('fallback-ok-class', () => {
    test('default fallback-ok-class is set to null', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          fallbackOkClass: null,
          showFallback: true,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(
          defaultComponentWithFallback.html()
        )
      })
    })

    test('fallback-ok-class should be applied', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          fallbackOkClass: 'class-example',
          showFallback: true,
        },
      })
      const button = componentWrapper.find('.vue-swatches__fallback__button')

      return Vue.nextTick().then(() => {
        expect(button.classes().indexOf('class-example') !== -1).toBeTruthy()
      })
    })
  })

  describe('fallback-ok-text', () => {
    test('default fallback-text-class is set to Ok', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          fallbackOkText: 'Ok',
          showFallback: true,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(
          defaultComponentWithFallback.html()
        )
      })
    })

    test('fallback-ok-text should be applied', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          fallbackOkText: 'click me',
          showFallback: true,
        },
      })
      const button = componentWrapper.find('.vue-swatches__fallback__button')

      return Vue.nextTick().then(() => {
        expect(button.text()).toEqual('click me')
      })
    })
  })

  describe('inline', () => {
    test('inline default is set to false', () => {
      const noInlineComponent = mount(Swatches, {
        propsData: {
          inline: false,
        },
      })

      return Vue.nextTick().then(() => {
        expect(noInlineComponent.html()).toEqual(defaultComponent.html())
      })
    })
    describe('When inline prop is true', () => {
      test('should not render the trigger', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: true,
          },
        })
        const trigger = componentWrapper.find({ ref: 'triggerWrapper' })
        expect(trigger.exists()).not.toBeTruthy()
      })
      test('should render swatches visible', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: true,
          },
        })
        const container = componentWrapper.find('.vue-swatches__container')

        return Vue.nextTick().then(() => {
          expect(container.isVisible()).toBe(true)
        })
      })
    })
    describe('When inline prop is false (Popover)', () => {
      test('should render the trigger', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
          },
        })
        const trigger = componentWrapper.find({ ref: 'triggerWrapper' })
        expect(trigger.exists()).toBeTruthy()
      })
      test('should render swatches not visible', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
          },
        })
        const container = componentWrapper.find('.vue-swatches__container')

        return Vue.nextTick().then(() => {
          expect(container.isVisible()).toBe(false)
        })
      })
    })
  })

  describe('max-height', () => {
    test(`default max-height is set to ${DEFAULT_MAX_HEIGHT}`, () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          maxHeight: DEFAULT_MAX_HEIGHT,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })
    describe('When Inline mode is enabled', () => {
      test('should not have a max-height value especified', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: true,
          },
        })
        const container = componentWrapper.find('.vue-swatches__container')

        return Vue.nextTick().then(() => {
          expect(container.element.style.maxHeight).toEqual('')
        })
      })
    })
    describe('When Popover mode is enabled', () => {
      test('should update the max-height if prop is passed', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
            maxHeight: 120,
          },
        })
        const container = componentWrapper.find('.vue-swatches__container')

        return Vue.nextTick().then(() => {
          expect(container.element.style.maxHeight).toEqual('120px')
        })
      })
      test('should accept string number', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
            maxHeight: '110',
          },
        })
        const container = componentWrapper.find('.vue-swatches__container')

        return Vue.nextTick().then(() => {
          expect(container.element.style.maxHeight).toEqual('110px')
        })
      })
      test('should update the max-height if preset specify one', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
            colors: completPresetExample,
          },
        })
        const container = componentWrapper.find('.vue-swatches__container')

        return Vue.nextTick().then(() => {
          expect(container.element.style.maxHeight).toEqual(
            `${completPresetExample.maxHeight}px`
          )
        })
      })
      test('should priorize the max-height from the prop over the preset one', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
            colors: completPresetExample,
            maxHeight: 250,
          },
        })
        const container = componentWrapper.find('.vue-swatches__container')

        return Vue.nextTick().then(() => {
          expect(container.element.style.maxHeight).toEqual(`250px`)
        })
      })
    })
  })

  describe('shapes', () => {
    test('default shape is set to squares', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          shapes: 'squares',
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })
    test('trigger should render as circle if prop is circles', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          shapes: 'circles',
          inline: false,
        },
      })
      const trigger = componentWrapper.find('.vue-swatches__trigger')

      return Vue.nextTick().then(() => {
        expect(trigger.element.style.borderRadius).toEqual('50%')
      })
    })
  })

  // describe('popover-to', () => {
  //   test('default popover-to is set to right', () => {
  //     const componentWrapper = mount(Swatches, {
  //       propsData: {
  //         popoverTo: 'right',
  //       },
  //     })

  //     return Vue.nextTick().then(() => {
  //       expect(componentWrapper.html()).toEqual(defaultComponent.html())
  //     })
  //   })
  //   test('container should posisionate at right if prop is left', () => {
  //     const componentWrapper = mount(Swatches, {
  //       propsData: {
  //         inline: false,
  //         popoverTo: 'left',
  //       },
  //     })
  //     const container = componentWrapper.find('.vue-swatches__container')
  //     expect(container.element.style.right).toEqual('0px')
  //   })
  //   test('container should posisionate at left if prop is right', () => {
  //     const componentWrapper = mount(Swatches, {
  //       propsData: {
  //         inline: false,
  //         popoverTo: 'right',
  //       },
  //     })
  //     const container = componentWrapper.find('.vue-swatches__container')
  //     expect(container.element.style.left).toEqual('0px')
  //   })
  // })

  describe('row-length', () => {
    test(`default row-length is set to ${DEFAULT_ROW_LENGTH}`, () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          rowLength: DEFAULT_ROW_LENGTH,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })
    test('should update the row-length if prop is passed', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          rowLength: 8,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.vm.computedRowLength).toEqual(8)
      })
    })
    test('should accept string number', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          rowLength: '6',
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.vm.computedRowLength).toEqual(6)
      })
    })
    test('should update the row-length if preset especify one', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: completPresetExample,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.vm.computedRowLength).toEqual(
          completPresetExample.rowLength
        )
      })
    })
    test('should priorize the row-length from the prop over the preset one', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: completPresetExample,
          rowLength: 10,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.vm.computedRowLength).toEqual(10)
      })
    })
  })

  describe('show-border', () => {
    test('default show-border is set to false', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          showBorder: false,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })
    test('should update the show-border if prop is passed', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          showBorder: true,
        },
      })
      const borderedSwatches = componentWrapper.findAll(
        '.vue-swatches__swatch--border'
      )

      return Vue.nextTick().then(() => {
        expect(borderedSwatches.length).toEqual(
          componentWrapper.vm.computedColors.length
        )
      })
    })
    test('should update the show-border if preset especify one', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: completPresetExample,
        },
      })
      const borderedSwatches = componentWrapper.findAll(
        '.vue-swatches__swatch--border'
      )

      return Vue.nextTick().then(() => {
        expect(borderedSwatches.length).toEqual(
          componentWrapper.vm.computedColors.length
        )
      })
    })
    test('should priorize the show-border from the prop over the preset one', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: completPresetExample,
          showBorder: false,
        },
      })
      const borderedSwatches = componentWrapper.findAll(
        '.vue-swatches__swatch--border'
      )

      return Vue.nextTick().then(() => {
        expect(borderedSwatches.length).toEqual(0)
      })
    })
  })

  describe('show-fallback', () => {
    test('default show-fallback is set to false', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          showFallback: false,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })
    test('should render the fallback if true', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          showFallback: true,
        },
      })
      const fallbackWrapper = componentWrapper.find(
        '.vue-swatches__fallback__wrapper'
      )

      return Vue.nextTick().then(() => {
        expect(fallbackWrapper.exists()).toBeTruthy()
      })
    })
    test('should not render the fallback if false', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          showFallback: false,
        },
      })
      const fallbackWrapper = componentWrapper.find(
        '.vue-swatches__fallback__wrapper'
      )

      return Vue.nextTick().then(() => {
        expect(fallbackWrapper.exists()).not.toBeTruthy()
      })
    })

    test('should close the popover when click to ok button', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          showFallback: true,
          inline: false,
        },
      })
      componentWrapper.vm.showPopover()
      const container = componentWrapper.find('.vue-swatches__container')
      const button = componentWrapper.find('.vue-swatches__fallback__button')
      button.trigger('click')

      return Vue.nextTick().then(() => {
        expect(container.isVisible()).not.toBeTruthy()
      })
    })
  })

  describe('swatch-size', () => {
    test(`default swatch-size is set to ${DEFAULT_SWATCH_SIZE}`, () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          swatchSize: DEFAULT_SWATCH_SIZE,
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })
    test('should accept string number', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          swatchSize: '16',
        },
      })
      const expectedDimensions = {
        width: '16px',
        height: '16px',
      }
      const swatch = componentWrapper.find('.vue-swatches__swatch')
      const swatchDimensions = {
        width: swatch.element.style.width,
        height: swatch.element.style.height,
      }

      return Vue.nextTick().then(() => {
        expect(swatchDimensions).toEqual(expectedDimensions)
      })
    })
    test('should update the swatch-size if prop is passed', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          swatchSize: 24,
        },
      })
      const expectedDimensions = {
        width: '24px',
        height: '24px',
      }
      const swatch = componentWrapper.find('.vue-swatches__swatch')
      const swatchDimensions = {
        width: swatch.element.style.width,
        height: swatch.element.style.height,
      }

      return Vue.nextTick().then(() => {
        expect(swatchDimensions).toEqual(expectedDimensions)
      })
    })
    test('should update the swatch-size if preset especify one', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: completPresetExample,
        },
      })
      const expectedDimensions = {
        width: `${completPresetExample.swatchSize}px`,
        height: `${completPresetExample.swatchSize}px`,
      }
      const swatch = componentWrapper.find('.vue-swatches__swatch')
      const swatchDimensions = {
        width: swatch.element.style.width,
        height: swatch.element.style.height,
      }

      return Vue.nextTick().then(() => {
        expect(swatchDimensions).toEqual(expectedDimensions)
      })
    })
    test('should priorize the swatch-size from the prop over the preset one', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: completPresetExample,
          swatchSize: 34,
        },
      })
      const expectedDimensions = {
        width: '34px',
        height: '34px',
      }
      const swatch = componentWrapper.find('.vue-swatches__swatch')
      const swatchDimensions = {
        width: swatch.element.style.width,
        height: swatch.element.style.height,
      }

      return Vue.nextTick().then(() => {
        expect(swatchDimensions).toEqual(expectedDimensions)
      })
    })
  })

  describe('swatch-style', () => {
    test('default swatch-style is applied', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          swatchStyle: {},
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })
    test('swatch-style should be applied over presets and swatch-size props', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors: completPresetExample,
          swatchSize: 20,
          swatchStyle: {
            width: '24px',
          },
        },
      })
      const swatch = componentWrapper.find('.vue-swatches__swatch')

      return Vue.nextTick().then(() => {
        expect(swatch.element.style.width).toEqual('24px')
      })
    })
  })

  describe('trigger-style', () => {
    test('default trigger-style is applied', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          triggerStyle: {},
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })
    test('trigger-style should be applied', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          triggerStyle: {
            width: '26px',
          },
        },
      })
      const trigger = componentWrapper.find('.vue-swatches__trigger')

      return Vue.nextTick().then(() => {
        expect(trigger.element.style.width).toEqual('26px')
      })
    })
  })

  describe('wrapper-style', () => {
    test('default wrapper-style is applied', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          wrapperStyle: {},
        },
      })

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html())
      })
    })
    test('wrapper-style should be applied', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          wrapperStyle: {
            paddingLeft: '60px',
          },
        },
      })
      const wrapper = componentWrapper.find('.vue-swatches__wrapper')

      return Vue.nextTick().then(() => {
        expect(wrapper.element.style.paddingLeft).toEqual('60px')
      })
    })
  })

  describe('value', () => {
    test('should select value', () => {
      const colors = ['#e31432', '#a156e2', '#eca23e']
      const componentWrapper = mount(Swatches, {
        propsData: {
          value: '#e31432',
          colors,
        },
      })
      const selectedSwatch = componentWrapper
        .findAll(Swatch)
        .wrappers.filter(s => s.vm.selected)[0]

      return Vue.nextTick().then(() => {
        expect(selectedSwatch.vm.swatchColor).toEqual('#e31432')
      })
    })
    test('should update the value', () => {
      const colors = ['#e31432', '#a156e2', '#eca23e']
      const componentWrapper = mount(Swatches, {
        propsData: {
          value: '#eca23e',
          colors,
        },
      })
      componentWrapper.setProps({ value: '#a156e2' })

      return Vue.nextTick().then(() => {
        const selectedSwatch = componentWrapper
          .findAll(Swatch)
          .wrappers.filter(s => s.vm.selected)[0]
        expect(selectedSwatch.vm.swatchColor).toEqual('#a156e2')
      })
    })
    test('should select value with diferent case', () => {
      const colors = ['#e31432', '#a156e2', '#eca23e']
      const componentWrapper = mount(Swatches, {
        propsData: {
          value: '#ECa23E',
          colors,
        },
      })
      const selectedSwatch = componentWrapper
        .findAll(Swatch)
        .wrappers.filter(s => s.vm.selected)[0]

      return Vue.nextTick().then(() => {
        expect(selectedSwatch.vm.swatchColor).toEqual('#eca23e')
      })
    })
    test('should not select any swatch when null', () => {
      const colors = ['#e31432', '#a156e2', '#eca23e']
      const componentWrapper = mount(Swatches, {
        propsData: {
          colors,
        },
      })
      const selectedSwatchList = componentWrapper
        .findAll(Swatch)
        .wrappers.filter(s => s.vm.selected)

      return Vue.nextTick().then(() => {
        expect(selectedSwatchList.length).toEqual(0)
      })
    })
  })
})
