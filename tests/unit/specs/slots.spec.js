import Vue from "vue";
import { mount } from "@vue/test-utils";
import Swatches from "@/VSwatches";

describe("Slots", () => {
  describe("trigger", () => {
    test("should replace the trigger node", () => {
      const spanTest = '<span id="span-test">Hello World</span>';
      const componentWrapper = mount(Swatches, {
        slots: {
          trigger: spanTest
        },
        propsData: {
          inline: false
        }
      });
      const trigger = componentWrapper.find("#span-test");

      return Vue.nextTick().then(() => {
        expect(trigger.html()).toEqual(spanTest);
      });
    });
  });
});
