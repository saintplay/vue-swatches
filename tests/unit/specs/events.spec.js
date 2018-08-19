import Vue from 'vue'
import { mount } from '@vue/test-utils'

import Swatches from '@/Swatches'
import Swatch from '@/Swatch'

describe('Events', () => {
  describe('@input', () => {
    test('should be emited whenever user pick a swatch', () => {
      const componentWrapper = mount(Swatches)
      const swatch = componentWrapper.find(Swatch)
      swatch.trigger('click')

      return Vue.nextTick().then(() => {
        expect(componentWrapper.emitted().input.length).toEqual(1)
      })
    })
    test('should payload the value', () => {
      const componentWrapper = mount(Swatches)
      const swatch = componentWrapper.find(Swatch)
      swatch.trigger('click')
      const color = swatch.vm.swatchColor

      return Vue.nextTick().then(() => {
        expect(componentWrapper.emitted().input[0][0]).toEqual(color)
      })
    })
  })
  describe('@open', () => {
    test('should not be emited when Inline mode is activated', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          inline: true,
        },
      })
      componentWrapper.vm.showPopover()

      return Vue.nextTick().then(() => {
        expect(componentWrapper.emitted().open).not.toBeTruthy()
      })
    })
    test('should be emited when Inline mode is not activated', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          inline: false,
        },
      })
      componentWrapper.vm.showPopover()

      return Vue.nextTick().then(() => {
        expect(componentWrapper.emitted().open.length).toEqual(1)
      })
    })
    describe('When default trigger is used', () => {
      test('should be emited whenever user clicks the trigger', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
          },
        })
        const trigger = componentWrapper.find({ ref: 'trigger-wrapper' })
        trigger.trigger('click')

        return Vue.nextTick().then(() => {
          expect(componentWrapper.emitted().open.length).toEqual(1)
        })
      })
    })
    describe('When trigger slot is used', () => {
      test('should be emited whenever user clicks the trigger', () => {
        const buttonTest = '<button id="button-test">Hello World</button>'
        const componentWrapper = mount(Swatches, {
          slots: {
            trigger: buttonTest,
          },
          propsData: {
            inline: false,
          },
        })
        const trigger = componentWrapper.find('#button-test')
        trigger.trigger('click')

        return Vue.nextTick().then(() => {
          expect(componentWrapper.emitted().open.length).toEqual(1)
        })
      })
    })
  })
  describe('@close', () => {
    test('should not be emited when Inline mode is activated', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          inline: true,
          closeOnSelect: true,
        },
      })
      componentWrapper.vm.onBlur(null)

      return Vue.nextTick().then(() => {
        expect(componentWrapper.emitted().close).not.toBeTruthy()
      })
    })
    describe('When default trigger is used', () => {
      test('should be emited whenever user close the Popover by clicking outside', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
          },
        })
        componentWrapper.vm.showPopover()
        componentWrapper.vm.onBlur(null)

        return Vue.nextTick().then(() => {
          expect(componentWrapper.emitted().close.length).toEqual(1)
        })
      })
      test('should be emited whenever user close the Popover by clicking the trigger', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
          },
        })
        const trigger = componentWrapper.find({ ref: 'trigger-wrapper' })
        trigger.trigger('click') // one click to open the Popover
        trigger.trigger('click') // and another to close the Popover

        return Vue.nextTick().then(() => {
          expect(componentWrapper.emitted().close.length).toEqual(1)
        })
      })
      test('should be emited whenever user close the Popover by clicking a Swatch', () => {
        const componentWrapper = mount(Swatches, {
          propsData: {
            inline: false,
            closeOnSelect: true,
          },
        })
        componentWrapper.vm.showPopover()
        const swatch = componentWrapper.find(Swatch)
        swatch.trigger('click')

        return Vue.nextTick().then(() => {
          expect(componentWrapper.emitted().close.length).toEqual(1)
        })
      })
    })
    describe('When trigger slot is used', () => {
      test('should be emited whenever user close the Popover by clicking outside', () => {
        const buttonTest = '<button id="button-test">Hello World</button>'
        const componentWrapper = mount(Swatches, {
          slots: {
            trigger: buttonTest,
          },
          propsData: {
            inline: false,
          },
        })
        componentWrapper.vm.showPopover()
        componentWrapper.vm.onBlur(null)

        return Vue.nextTick().then(() => {
          expect(componentWrapper.emitted().close.length).toEqual(1)
        })
      })
      test('should be emited whenever user close the Popover by clicking the trigger', () => {
        const buttonTest = '<button id="button-test">Hello World</button>'
        const componentWrapper = mount(Swatches, {
          slots: {
            trigger: buttonTest,
          },
          propsData: {
            inline: false,
          },
        })
        const trigger = componentWrapper.find({ ref: 'trigger-wrapper' })
        trigger.trigger('click')
        trigger.trigger('click')

        return Vue.nextTick().then(() => {
          expect(componentWrapper.emitted().close.length).toEqual(1)
        })
      })
      test('should be emited whenever user close the Popover by clicking a Swatch', () => {
        const buttonTest = '<button id="button-test">Hello World</button>'
        const componentWrapper = mount(Swatches, {
          slots: {
            trigger: buttonTest,
          },
          propsData: {
            inline: false,
          },
        })
        componentWrapper.vm.showPopover()
        const swatch = componentWrapper.find(Swatch)
        swatch.trigger('click')

        return Vue.nextTick().then(() => {
          expect(componentWrapper.emitted().close.length).toEqual(1)
        })
      })
    })
    test('should payload the value', () => {
      const componentWrapper = mount(Swatches, {
        propsData: {
          inline: false,
          closeOnSelect: true,
        },
      })
      componentWrapper.vm.showPopover()
      const swatch = componentWrapper.find(Swatch)
      swatch.trigger('click')
      const color = swatch.vm.swatchColor

      return Vue.nextTick().then(() => {
        expect(componentWrapper.emitted().close[0][0]).toEqual(color)
      })
    })
  })
})
