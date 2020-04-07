import Vue from "vue";
import { mount } from "@vue/test-utils";
import rgb from "rgb";

import VSwatches, {
  DEFAULT_TRIGGER_CONTAINER_SPACE,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_ROW_LENGTH,
  DEFAULT_SWATCH_SIZE
} from "@/VSwatches";
import VSwatch from "@/VSwatch";
import VCheck from "@/VCheck";
import presets from "@/presets";

const defaultComponent = mount(VSwatches);
const defaultComponentWithFallback = mount(VSwatches, {
  propsData: {
    showFallback: true
  }
});

describe("Props", () => {
  describe("background-color", () => {
    const testColor = "#333";
    test("default background-color are shown", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          backgroundColor: DEFAULT_BACKGROUND_COLOR
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });
    describe("When Popover mode is enabled", () => {
      test("background color should render color passed as a prop", () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            backgroundColor: testColor
          }
        });
        const container = componentWrapper.find(".vue-swatches__container")
          .element;

        return Vue.nextTick().then(() => {
          expect(rgb(container.style.backgroundColor)).toEqual(rgb(testColor));
        });
      });
    });

    describe("When Inline mode is enabled", () => {
      test("background color should render color passed as a prop", () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            inline: true,
            backgroundColor: testColor
          }
        });
        const container = componentWrapper.find(".vue-swatches__container")
          .element;

        return Vue.nextTick().then(() => {
          expect(rgb(container.style.backgroundColor)).toEqual(rgb(testColor));
        });
      });
    });
  });

  describe("close-on-select", () => {
    test("default close-on-select is set to true", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          closeOnSelect: true
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });
    describe("When Popover mode is enabled", () => {
      test("should close the popover if true", () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            closeOnSelect: true,
            inline: false
          }
        });
        componentWrapper.vm.showPopover();
        const container = componentWrapper.find(".vue-swatches__container");
        const swatch = componentWrapper.find(".vue-swatches__swatch");
        swatch.trigger("click");

        return Vue.nextTick().then(() => {
          expect(container.isVisible()).toBe(false);
        });
      });
      test("should not close the popover if false", () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            closeOnSelect: false,
            inline: false
          }
        });
        componentWrapper.vm.showPopover();
        const container = componentWrapper.find(".vue-swatches__container");
        const swatch = componentWrapper.find(".vue-swatches__swatch");
        swatch.trigger("click");

        return Vue.nextTick().then(() => {
          expect(container.isVisible()).toBe(true);
        });
      });
    });
  });

  describe("swatches", () => {
    test("default swatches are shown", () => {
      const presetComponent = mount(VSwatches, {
        propsData: {
          swatches: "basic"
        }
      });
      return Vue.nextTick().then(() => {
        expect(presetComponent.html()).toEqual(defaultComponent.html());
      });
    });
    describe("When custom colors are passed as a prop", () => {
      test("given array colors are shown", () => {
        const colors = ["#e31432", "#a156e2", "#eca23e"];
        const rgbColors = colors.map(c => rgb(c));
        const componentWrapper = mount(VSwatches, {
          propsData: {
            swatches: colors
          }
        });
        const swatches = Array.from(
          componentWrapper.element.querySelectorAll(".vue-swatches__swatch")
        );
        const swatchesColors = swatches.map(s => rgb(s.style.backgroundColor));
        return Vue.nextTick().then(() => {
          expect(swatchesColors).toEqual(rgbColors);
        });
      });
      test("given nested array colors are shown", () => {
        const colors = [
          ["#e31432", "#a156e2", "#eca23e"],
          ["#a2341e", "$ef86ff", "#eiaea3"],
          ["#eec451", "$3321de", "#166002"]
        ];
        const rgbColors = colors.map(row => {
          return row.map(s => rgb(s));
        });
        const componentWrapper = mount(VSwatches, {
          propsData: {
            swatches: colors
          }
        });
        const swatchesRows = componentWrapper.element.querySelectorAll(
          ".vue-swatches__row"
        );
        const swatchesColors = [];

        swatchesRows.forEach(swatchElement => {
          const swatchesNodeList = Array.from(
            swatchElement.querySelectorAll(".vue-swatches__swatch")
          );
          const rgbSwatches = swatchesNodeList.map(s =>
            rgb(s.style.backgroundColor)
          );
          swatchesColors.push(rgbSwatches);
        });
        return Vue.nextTick().then(() => {
          expect(swatchesColors).toEqual(rgbColors);
        });
      });
      describe("When empty string are passed as a color", () => {
        test("it should render the swatch diagonal", () => {
          const colors = ["", "#a156e2", "#eca23e"];
          const componentWrapper = mount(VSwatches, {
            propsData: {
              swatches: colors
            }
          });
          const diagonal = componentWrapper.find(
            ".vue-swatches__swatch .vue-swatches__diagonal__wrapper"
          );
          return Vue.nextTick().then(() => {
            expect(diagonal.exists()).toBeTruthy();
          });
        });
        test("it should render a diagonal in the trigger if value match", () => {
          const colors = ["", "#a156e2", "#eca23e"];
          const componentWrapper = mount(VSwatches, {
            propsData: {
              swatches: colors,
              value: ""
            }
          });
          const diagonal = componentWrapper
            .find(".vue-swatches__trigger")
            .find(".vue-swatches__diagonal__wrapper");
          return Vue.nextTick().then(() => {
            expect(diagonal.isVisible()).toBeTruthy();
          });
        });
        test("it should not render a diagonal in the trigger if value doesn't match", () => {
          const colors = ["", "#a156e2", "#eca23e"];
          const componentWrapper = mount(VSwatches, {
            propsData: {
              swatches: colors,
              value: "#a156e2"
            }
          });
          const diagonal = componentWrapper
            .find(".vue-swatches__trigger")
            .find(".vue-swatches__diagonal__wrapper");
          return Vue.nextTick().then(() => {
            expect(diagonal.isVisible()).not.toBeTruthy();
          });
        });
        test("it should update the value", () => {
          const colors = ["", "#a156e2", "#eca23e"];
          const componentWrapper = mount(VSwatches, {
            propsData: {
              swatches: colors
            }
          });
          const swatch = componentWrapper.find(".vue-swatches__swatch");
          swatch.trigger("click");
          return Vue.nextTick().then(() => {
            expect(componentWrapper.vm.internalValue).toEqual("");
          });
        });
        test("it should render the check if the value is empty string", () => {
          const colors = ["", "#a156e2", "#eca23e"];
          const componentWrapper = mount(VSwatches, {
            propsData: {
              swatches: colors,
              value: ""
            }
          });
          const swatch = componentWrapper.find(".vue-swatches__swatch");
          const check = swatch.find(".vue-swatches__check__wrapper");
          swatch.trigger("click");

          return Vue.nextTick().then(() => {
            expect(check.element.style.display).not.toBe("none");
          });
        });
      });
    });
    describe("When preset name is passed as a prop", () => {
      test("preset colors are shown", () => {
        const rgbColors = presets["text-basic"].colors.map(c => rgb(c));
        const componentWrapper = mount(VSwatches, {
          propsData: {
            swatches: "text-basic"
          }
        });
        const swatches = Array.from(
          componentWrapper.element.querySelectorAll(".vue-swatches__swatch")
        );
        const swatchesColors = swatches.map(s => rgb(s.style.backgroundColor));

        return Vue.nextTick().then(() => {
          expect(swatchesColors).toEqual(rgbColors);
        });
      });
    });
  });

  describe("disabled", () => {
    test("default disabled is set to false", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          disabled: false
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });

    test("should update disabled only for swatch if object swatch is used", async () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          disabled: false,
          value: "#C0382B",
          inline: true,
          swatches: [{ color: "#3D556E", disabled: true }, "#C0382B"]
        }
      });
      const componentSwatch = componentWrapper.find(VSwatch);
      componentSwatch.trigger("click");
      const selectedSwatch = componentWrapper
        .findAll(VSwatch)
        .wrappers.filter(s => s.vm.selected)[0];

      await Vue.nextTick();
      expect(selectedSwatch.vm.swatchColor).toEqual("#C0382B");
    });

    describe("When Inline mode is enabled", () => {
      test("value won't change when cliking a swatch", () => {
        const colors = ["#e31432", "#a156e2", "#eca23e"];
        const componentWrapper = mount(VSwatches, {
          propsData: {
            value: "#eca23e",
            swatches: colors,
            disabled: true,
            inline: true
          }
        });

        const swatch = componentWrapper.find(".vue-swatches__swatch");
        swatch.trigger("click");
        const selectedSwatch = componentWrapper
          .findAll(VSwatch)
          .wrappers.filter(s => s.vm.selected)[0];

        return Vue.nextTick().then(() => {
          expect(selectedSwatch.vm.swatchColor).toEqual("#eca23e");
        });
      });
    });

    describe("When Inline mode is not enabled", () => {
      test("default trigger won't open the Popover", () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            disabled: true,
            inline: false
          }
        });
        const trigger = componentWrapper.find({ ref: "triggerWrapper" });
        const container = componentWrapper.find(".vue-swatches__container");
        trigger.trigger("click");

        return Vue.nextTick().then(() => {
          expect(container.isVisible()).toBe(false);
        });
      });
      test("custom trigger won't open the Popover", () => {
        const buttonTest = '<button id="button-test">Hello World</button>';
        const componentWrapper = mount(VSwatches, {
          slots: {
            trigger: buttonTest
          },
          propsData: {
            disabled: true,
            inline: false
          }
        });
        const trigger = componentWrapper.find("#button-test");
        const container = componentWrapper.find(".vue-swatches__container");
        trigger.trigger("click");

        return Vue.nextTick().then(() => {
          expect(container.isVisible()).toBe(false);
        });
      });
    });
  });

  describe("fallback-input-class", () => {
    test("default fallback-input-class is set to null", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          fallbackInputClass: null,
          showFallback: true
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(
          defaultComponentWithFallback.html()
        );
      });
    });

    test("fallback-input-class should be applied", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          fallbackInputClass: "class-example",
          showFallback: true,
          inline: true // or false, doesn't matter
        }
      });
      const input = componentWrapper.find(".vue-swatches__fallback__input");

      return Vue.nextTick().then(() => {
        expect(input.classes().indexOf("class-example") !== -1).toBeTruthy();
      });
    });
  });

  describe("fallback-input-type", () => {
    test("default fallback-input-type is set to text", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          fallbackInputType: "text",
          showFallback: true
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(
          defaultComponentWithFallback.html()
        );
      });
    });

    test("fallback-input-type should be applied", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showFallback: true,
          fallbackInputType: "color"
        }
      });
      const input = componentWrapper.find(".vue-swatches__fallback__input");

      return Vue.nextTick().then(() => {
        expect(input.attributes().type).toBe("color");
      });
    });
  });

  describe("fallback-ok-class", () => {
    test("default fallback-ok-class is set to null", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          fallbackOkClass: null,
          showFallback: true
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(
          defaultComponentWithFallback.html()
        );
      });
    });

    test("fallback-ok-class should be applied", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          fallbackOkClass: "class-example",
          showFallback: true
        }
      });
      const button = componentWrapper.find(".vue-swatches__fallback__button");

      return Vue.nextTick().then(() => {
        expect(button.classes().indexOf("class-example") !== -1).toBeTruthy();
      });
    });
  });

  describe("fallback-ok-text", () => {
    test("default fallback-ok-text is set to Ok", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          fallbackOkText: "Ok",
          showFallback: true
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(
          defaultComponentWithFallback.html()
        );
      });
    });

    test("fallback-ok-text should be applied", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          fallbackOkText: "click me",
          showFallback: true
        }
      });
      const button = componentWrapper.find(".vue-swatches__fallback__button");

      return Vue.nextTick().then(() => {
        expect(button.text()).toEqual("click me");
      });
    });
  });

  describe("inline", () => {
    test("inline default is set to false", () => {
      const noInlineComponent = mount(VSwatches, {
        propsData: {
          inline: false
        }
      });

      return Vue.nextTick().then(() => {
        expect(noInlineComponent.html()).toEqual(defaultComponent.html());
      });
    });
    describe("When inline prop is true", () => {
      test("should not render the trigger", () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            inline: true
          }
        });
        const trigger = componentWrapper.find({ ref: "triggerWrapper" });
        expect(trigger.exists()).not.toBeTruthy();
      });
      test("should render swatches visible", () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            inline: true
          }
        });
        const container = componentWrapper.find(".vue-swatches__container");

        return Vue.nextTick().then(() => {
          expect(container.isVisible()).toBe(true);
        });
      });
    });
    describe("When inline prop is false (Popover)", () => {
      test("should render the trigger", () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            inline: false
          }
        });
        const trigger = componentWrapper.find({ ref: "triggerWrapper" });
        expect(trigger.exists()).toBeTruthy();
      });
      test("should render swatches not visible", () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            inline: false
          }
        });
        const container = componentWrapper.find(".vue-swatches__container");

        return Vue.nextTick().then(() => {
          expect(container.isVisible()).toBe(false);
        });
      });
    });
  });

  describe("shapes", () => {
    test("default shape is set to squares", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          shapes: "squares"
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });
    test("trigger should render as circle if prop is circles", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          shapes: "circles",
          inline: false
        }
      });
      const trigger = componentWrapper.find(".vue-swatches__trigger");

      return Vue.nextTick().then(() => {
        expect(trigger.element.style.borderRadius).toEqual("50%");
      });
    });
  });

  describe("popover-x", () => {
    test("default popover-x is set to right", async () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          popoverX: "right"
        }
      });

      await Vue.nextTick();
      return expect(componentWrapper.html()).toEqual(defaultComponent.html());
    });

    describe("popover-x is set to left", () => {
      test("container should positionate at trigger left", async () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            popoverX: "left"
          }
        });
        const trigger = componentWrapper.find({ ref: "triggerWrapper" });
        const container = componentWrapper.find({ ref: "containerWrapper" });
        trigger.element.getBoundingClientRect = () => ({
          top: 0,
          bottom: 50,
          left: window.innerWidth - 50,
          right: window.innerWidth
        });
        container.element.getBoundingClientRect = () => ({
          width: 200,
          height: 200
        });

        componentWrapper.vm.showPopover();
        await Vue.nextTick();

        return expect(container.element.style.right).toEqual("0px");
      });
      test("container should positionate at trigger right if there is no available space", async () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            popoverX: "left"
          }
        });
        const trigger = componentWrapper.find({ ref: "triggerWrapper" });
        const container = componentWrapper.find({ ref: "containerWrapper" });
        trigger.element.getBoundingClientRect = () => ({
          top: 0,
          bottom: 50,
          left: 0,
          right: 50
        });
        container.element.getBoundingClientRect = () => ({
          width: 200,
          height: 200
        });

        componentWrapper.vm.showPopover();
        await Vue.nextTick();
        expect(container.element.style.left).toEqual("0px");
      });
    });
    describe("popover-x is set to right", () => {
      test("container should positionate at trigger right", async () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            popoverX: "right"
          }
        });
        const trigger = componentWrapper.find({ ref: "triggerWrapper" });
        const container = componentWrapper.find({ ref: "containerWrapper" });
        trigger.element.getBoundingClientRect = () => ({
          top: 0,
          bottom: 50,
          left: 0,
          right: 50
        });
        container.element.getBoundingClientRect = () => ({
          width: 200,
          height: 200
        });

        componentWrapper.vm.showPopover();
        await Vue.nextTick();
        return expect(container.element.style.left).toEqual("0px");
      });
      test("container should positionate at trigger left if there is no available space", async () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            popoverX: "right"
          }
        });
        const trigger = componentWrapper.find({ ref: "triggerWrapper" });
        const container = componentWrapper.find({ ref: "containerWrapper" });
        trigger.element.getBoundingClientRect = () => ({
          top: 0,
          bottom: 50,
          left: window.innerWidth - 50,
          right: window.innerWidth
        });
        container.element.getBoundingClientRect = () => ({
          width: 200,
          height: 200
        });

        componentWrapper.vm.showPopover();
        await Vue.nextTick();
        expect(container.element.style.right).toEqual("0px");
      });
    });
  });

  describe("popover-y", () => {
    test("default popover-y is set to bottom", async () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          popoverY: "bottom"
        }
      });

      await Vue.nextTick();
      return expect(componentWrapper.html()).toEqual(defaultComponent.html());
    });

    describe("popover-y is set to top", () => {
      test("container should positionate above the trigger", async () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            popoverY: "top"
          }
        });
        const trigger = componentWrapper.find({ ref: "triggerWrapper" });
        const container = componentWrapper.find({ ref: "containerWrapper" });
        trigger.element.getBoundingClientRect = () => ({
          top: window.innerHeight - 50,
          bottom: window.innerHeight,
          left: 0,
          right: 50,
          height: 50
        });
        container.element.getBoundingClientRect = () => ({
          width: 200,
          height: 200
        });

        componentWrapper.vm.showPopover();
        await Vue.nextTick();
        return expect(container.element.style.bottom).toEqual(
          `${50 + DEFAULT_TRIGGER_CONTAINER_SPACE}px`
        );
      });
      test("container should positionate bellow the trigger top if there is no available space", async () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            popoverY: "top"
          }
        });
        const trigger = componentWrapper.find({ ref: "triggerWrapper" });
        const container = componentWrapper.find({ ref: "containerWrapper" });
        trigger.element.getBoundingClientRect = () => ({
          top: 0,
          bottom: 50,
          left: 0,
          right: 50,
          height: 50
        });
        container.element.getBoundingClientRect = () => ({
          width: 200,
          height: 200
        });

        componentWrapper.vm.showPopover();
        await Vue.nextTick();
        expect(container.element.style.top).toEqual(
          `${50 + DEFAULT_TRIGGER_CONTAINER_SPACE}px`
        );
      });
    });
    describe("popover-y is set to bottom", () => {
      test("container should positionate bellow the trigger", async () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            popoverY: "bottom"
          }
        });

        const trigger = componentWrapper.find({ ref: "triggerWrapper" });
        const container = componentWrapper.find({ ref: "containerWrapper" });
        trigger.element.getBoundingClientRect = () => ({
          top: 0,
          bottom: 50,
          left: 0,
          right: 50,
          height: 50
        });
        container.element.getBoundingClientRect = () => ({
          width: 200,
          height: 200
        });

        componentWrapper.vm.showPopover();
        await Vue.nextTick();
        return expect(container.element.style.top).toEqual(
          `${50 + DEFAULT_TRIGGER_CONTAINER_SPACE}px`
        );
      });
      test("container should positionate above the trigger if there is no available space", async () => {
        const componentWrapper = mount(VSwatches, {
          propsData: {
            popoverY: "bottom"
          }
        });
        const trigger = componentWrapper.find({ ref: "triggerWrapper" });
        const container = componentWrapper.find({ ref: "containerWrapper" });
        trigger.element.getBoundingClientRect = () => ({
          top: window.innerHeight - 50,
          bottom: window.innerHeight,
          left: 0,
          right: 50,
          height: 50
        });
        container.element.getBoundingClientRect = () => ({
          width: 200,
          height: 200
        });

        componentWrapper.vm.showPopover();
        await Vue.nextTick();
        expect(container.element.style.bottom).toEqual(
          `${50 + DEFAULT_TRIGGER_CONTAINER_SPACE}px`
        );
      });
    });
  });

  describe("row-length", () => {
    test(`default row-length is set to ${DEFAULT_ROW_LENGTH}`, () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          rowLength: DEFAULT_ROW_LENGTH
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });
    test("should update the row-length if prop is passed", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          rowLength: 8
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.vm.computedRowLength).toEqual(8);
      });
    });
    test("should accept string number", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          rowLength: "6"
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.vm.computedRowLength).toEqual(6);
      });
    });
    test("should update the row-length if preset especify one", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatches: "text-advanced"
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.vm.computedRowLength).toEqual(
          presets["text-advanced"].rowLength
        );
      });
    });
    test("should priorize the row-length from the prop over the preset one", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatches: "text-advanced",
          rowLength: 10
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.vm.computedRowLength).toEqual(10);
      });
    });
  });

  describe("show-border", () => {
    test("default show-border is set to false", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showBorder: false
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });
    test("should update the show-border if prop is passed", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showBorder: true
        }
      });
      const borderedSwatches = componentWrapper.findAll(
        ".vue-swatches__swatch--border"
      );

      return Vue.nextTick().then(() => {
        expect(borderedSwatches.length).toEqual(
          componentWrapper.vm.computedSwatches.length
        );
      });
    });
    test("should update the show-border only for swatch if object swatch is used", async () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showBorder: false,
          swatches: [{ color: "#3D556E", showBorder: true }, "#C0382B"]
        }
      });
      const componentSwatch = componentWrapper.find(VSwatch);

      await Vue.nextTick();
      expect(
        componentSwatch.classes().includes("vue-swatches__swatch--border")
      ).toBeTruthy();
    });
    test("should update the show-border if preset especify one", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatches: "text-basic"
        }
      });
      const borderedSwatches = componentWrapper.findAll(
        ".vue-swatches__swatch--border"
      );

      return Vue.nextTick().then(() => {
        expect(borderedSwatches.length).toEqual(
          componentWrapper.vm.computedSwatches.length
        );
      });
    });
    test("should priorize the show-border from the prop over the preset one", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatches: "text-advanced",
          showBorder: false
        }
      });
      const borderedSwatches = componentWrapper.findAll(
        ".vue-swatches__swatch--border"
      );

      return Vue.nextTick().then(() => {
        expect(borderedSwatches.length).toEqual(0);
      });
    });
  });

  describe("show-fallback", () => {
    test("default show-fallback is set to false", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showFallback: false
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });
    test("should render the fallback if true", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showFallback: true
        }
      });
      const fallbackWrapper = componentWrapper.find(
        ".vue-swatches__fallback__wrapper"
      );

      return Vue.nextTick().then(() => {
        expect(fallbackWrapper.exists()).toBeTruthy();
      });
    });
    test("should not render the fallback if false", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showFallback: false
        }
      });
      const fallbackWrapper = componentWrapper.find(
        ".vue-swatches__fallback__wrapper"
      );

      return Vue.nextTick().then(() => {
        expect(fallbackWrapper.exists()).not.toBeTruthy();
      });
    });
    test("should close the popover when click to ok button", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showFallback: true,
          inline: false
        }
      });
      componentWrapper.vm.showPopover();
      const container = componentWrapper.find(".vue-swatches__container");
      const button = componentWrapper.find(".vue-swatches__fallback__button");
      button.trigger("click");

      return Vue.nextTick().then(() => {
        expect(container.isVisible()).not.toBeTruthy();
      });
    });
  });

  describe("show-checkbox", () => {
    test("default show-checkbox is set to true", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showCheckbox: true
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });
    test("should render the checkbox if true", async () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showCheckbox: true
        }
      });
      componentWrapper.vm.showPopover();
      const componentSwatch = componentWrapper.find(VSwatch);
      componentWrapper.setProps({ value: componentSwatch.vm.swatchColor });

      await Vue.nextTick();
      const componentCheckbox = componentSwatch.find(VCheck);
      expect(componentCheckbox.isVisible()).toBeTruthy();
    });
    test("should not render the checkbox if false", async () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showCheckbox: false
        }
      });
      componentWrapper.vm.showPopover();
      const componentSwatch = componentWrapper.find(VSwatch);
      componentWrapper.setProps({ value: componentSwatch.vm.swatchColor });

      await Vue.nextTick();
      const componentCheckbox = componentSwatch.find(VCheck);
      expect(componentCheckbox.isVisible()).toBeFalsy();
    });
  });

  describe("show-labels", () => {
    test("default show-labels is set to false", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showLabels: false
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });
    test("should render labels if true", async () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showLabels: true
        }
      });
      const labelWrapper = componentWrapper.find(
        ".vue-swatches__swatch__label"
      );

      await Vue.nextTick();
      expect(labelWrapper.exists()).toBeTruthy();
    });
    test("should not render labels if false", async () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showLabels: false
        }
      });
      const labelWrapper = componentWrapper.find(
        ".vue-swatches__swatch__label"
      );

      await Vue.nextTick();
      expect(labelWrapper.exists()).not.toBeTruthy();
    });
    test("should render custom label if object swatch is used", async () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showLabels: true,
          swatches: [{ color: "#3D556E", label: "custom-label" }, "#C0382B"]
        }
      });
      const componentSwatch = componentWrapper.find(VSwatch);
      const labelWrapper = componentSwatch.find(".vue-swatches__swatch__label");

      await Vue.nextTick();
      expect(labelWrapper.text()).toEqual("custom-label");
    });
    test("should use custom label as alt if object swatch is used", async () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showLabels: true,
          swatches: [{ color: "#3D556E", label: "custom-label" }, "#C0382B"]
        }
      });
      const componentSwatch = componentWrapper.find(VSwatch);
      await Vue.nextTick();
      expect(componentSwatch.attributes("aria-label")).toEqual("custom-label");
    });
    test("should use custom alt if object swatch is used", async () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          showLabels: true,
          swatches: [
            { color: "#3D556E", label: "custom-label", alt: "custom-alt" },
            "#C0382B"
          ]
        }
      });
      const componentSwatch = componentWrapper.find(VSwatch);
      await Vue.nextTick();
      expect(componentSwatch.attributes("aria-label")).toEqual("custom-alt");
    });
  });

  describe("spacing-size", () => {
    test("default spacing-size is set to 1/4 to swatch size", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          spacingSize: Math.round(DEFAULT_SWATCH_SIZE / 4)
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });
    test("should update the spacing-size if prop is passed", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          spacingSize: 24
        }
      });
      const expectedDimensions = {
        marginBottom: "24px",
        marginRight: "24px"
      };
      const swatch = componentWrapper.find(".vue-swatches__swatch");
      const swatchDimensions = {
        marginBottom: swatch.element.style.marginBottom,
        marginRight: swatch.element.style.marginRight
      };

      return Vue.nextTick().then(() => {
        expect(swatchDimensions).toEqual(expectedDimensions);
      });
    });
    test("should update the spacing-size if preset especify one", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatches: "text-advanced"
        }
      });
      const expectedDimensions = {
        marginBottom: `${presets["text-advanced"].spacingSize}px`,
        marginRight: `${presets["text-advanced"].spacingSize}px`
      };
      const swatch = componentWrapper.find(".vue-swatches__swatch");
      const swatchDimensions = {
        marginBottom: swatch.element.style.marginBottom,
        marginRight: swatch.element.style.marginRight
      };

      return Vue.nextTick().then(() => {
        expect(swatchDimensions).toEqual(expectedDimensions);
      });
    });
    test("should priorize the spacing-size from the prop over the preset one", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatches: "text-advanced",
          spacingSize: 34
        }
      });
      const expectedDimensions = {
        marginBottom: "34px",
        marginRight: "34px"
      };
      const swatch = componentWrapper.find(".vue-swatches__swatch");
      const swatchDimensions = {
        marginBottom: swatch.element.style.marginBottom,
        marginRight: swatch.element.style.marginRight
      };

      return Vue.nextTick().then(() => {
        expect(swatchDimensions).toEqual(expectedDimensions);
      });
    });
  });

  describe("swatch-size", () => {
    test(`default swatch-size is set to ${DEFAULT_SWATCH_SIZE}`, () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatchSize: DEFAULT_SWATCH_SIZE
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });
    test("should accept string number", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatchSize: "16"
        }
      });
      const expectedDimensions = {
        width: "16px",
        height: "16px"
      };
      const swatch = componentWrapper.find(".vue-swatches__swatch");
      const swatchDimensions = {
        width: swatch.element.style.width,
        height: swatch.element.style.height
      };

      return Vue.nextTick().then(() => {
        expect(swatchDimensions).toEqual(expectedDimensions);
      });
    });
    test("should update the swatch-size if prop is passed", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatchSize: 24
        }
      });
      const expectedDimensions = {
        width: "24px",
        height: "24px"
      };
      const swatch = componentWrapper.find(".vue-swatches__swatch");
      const swatchDimensions = {
        width: swatch.element.style.width,
        height: swatch.element.style.height
      };

      return Vue.nextTick().then(() => {
        expect(swatchDimensions).toEqual(expectedDimensions);
      });
    });
    test("should update the swatch-size if preset especify one", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatches: "text-advanced"
        }
      });
      const expectedDimensions = {
        width: `${presets["text-advanced"].swatchSize}px`,
        height: `${presets["text-advanced"].swatchSize}px`
      };
      const swatch = componentWrapper.find(".vue-swatches__swatch");
      const swatchDimensions = {
        width: swatch.element.style.width,
        height: swatch.element.style.height
      };

      return Vue.nextTick().then(() => {
        expect(swatchDimensions).toEqual(expectedDimensions);
      });
    });
    test("should priorize the swatch-size from the prop over the preset one", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatches: "text-advanced",
          swatchSize: 34
        }
      });
      const expectedDimensions = {
        width: "34px",
        height: "34px"
      };
      const swatch = componentWrapper.find(".vue-swatches__swatch");
      const swatchDimensions = {
        width: swatch.element.style.width,
        height: swatch.element.style.height
      };

      return Vue.nextTick().then(() => {
        expect(swatchDimensions).toEqual(expectedDimensions);
      });
    });
  });

  describe("swatch-style", () => {
    test("default swatch-style is applied", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatchStyle: {}
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });
    test("swatch-style should be applied over presets and swatch-size props", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatches: "text-advanced",
          swatchSize: 20,
          swatchStyle: {
            width: "24px"
          }
        }
      });
      const swatch = componentWrapper.find(".vue-swatches__swatch");

      return Vue.nextTick().then(() => {
        expect(swatch.element.style.width).toEqual("24px");
      });
    });
  });

  describe("trigger-style", () => {
    test("default trigger-style is applied", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          triggerStyle: {}
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });
    test("trigger-style should be applied", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          triggerStyle: {
            width: "26px"
          }
        }
      });
      const trigger = componentWrapper.find(".vue-swatches__trigger");

      return Vue.nextTick().then(() => {
        expect(trigger.element.style.width).toEqual("26px");
      });
    });
  });

  describe("wrapper-style", () => {
    test("default wrapper-style is applied", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          wrapperStyle: {}
        }
      });

      return Vue.nextTick().then(() => {
        expect(componentWrapper.html()).toEqual(defaultComponent.html());
      });
    });
    test("wrapper-style should be applied", () => {
      const componentWrapper = mount(VSwatches, {
        propsData: {
          wrapperStyle: {
            paddingLeft: "60px"
          }
        }
      });
      const wrapper = componentWrapper.find(".vue-swatches__wrapper");

      return Vue.nextTick().then(() => {
        expect(wrapper.element.style.paddingLeft).toEqual("60px");
      });
    });
  });

  describe("value", () => {
    test("should select value", () => {
      const colors = ["#e31432", "#a156e2", "#eca23e"];
      const componentWrapper = mount(VSwatches, {
        propsData: {
          value: "#e31432",
          swatches: colors
        }
      });
      const selectedSwatch = componentWrapper
        .findAll(VSwatch)
        .wrappers.filter(s => s.vm.selected)[0];

      return Vue.nextTick().then(() => {
        expect(selectedSwatch.vm.swatchColor).toEqual("#e31432");
      });
    });
    test("should update the value", () => {
      const colors = ["#e31432", "#a156e2", "#eca23e"];
      const componentWrapper = mount(VSwatches, {
        propsData: {
          value: "#eca23e",
          swatches: colors
        }
      });
      componentWrapper.setProps({ value: "#a156e2" });

      return Vue.nextTick().then(() => {
        const selectedSwatch = componentWrapper
          .findAll(VSwatch)
          .wrappers.filter(s => s.vm.selected)[0];
        expect(selectedSwatch.vm.swatchColor).toEqual("#a156e2");
      });
    });
    test("should select value with diferent case", () => {
      const colors = ["#e31432", "#a156e2", "#eca23e"];
      const componentWrapper = mount(VSwatches, {
        propsData: {
          value: "#ECa23E",
          swatches: colors
        }
      });
      const selectedSwatch = componentWrapper
        .findAll(VSwatch)
        .wrappers.filter(s => s.vm.selected)[0];

      return Vue.nextTick().then(() => {
        expect(selectedSwatch.vm.swatchColor).toEqual("#eca23e");
      });
    });
    test("should not select any swatch when null", () => {
      const colors = ["#e31432", "#a156e2", "#eca23e"];
      const componentWrapper = mount(VSwatches, {
        propsData: {
          swatches: colors
        }
      });
      const selectedSwatchList = componentWrapper
        .findAll(VSwatch)
        .wrappers.filter(s => s.vm.selected);

      return Vue.nextTick().then(() => {
        expect(selectedSwatchList.length).toEqual(0);
      });
    });
  });
});
