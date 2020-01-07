---
sidebar: auto
---

<style>
.form__field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 24px;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
}

.form__label strong {
  font-size: 1.2rem;
}

.form__input__element {
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: none;
  line-height: 1.5;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
  background-color: white;
  border-color: #dbdbdb;
  color: #363636;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
}
</style>

# Examples

## Simple

<examples-simple></examples-simple>

<<< @/docs/.vuepress/components/examples/simple.vue

## Using a Preset

Vue Swatches has a bunch of [presets](/presets) ready to use. Make sure to check it out!

<examples-preset></examples-preset>

<<< @/docs/.vuepress/components/examples/preset.vue

## Using a Custom Trigger

You can use your custom trigger. Useful to show `buttons`, `icons`, custom `inputs`!

<examples-custom-trigger></examples-custom-trigger>

<<< @/docs/.vuepress/components/examples/custom-trigger.vue

## Custom Colors

Remember to use always **6-digits** hexadecimal colors. If you want to provide a **transparent/no-color** option you can use a empty string (`''`).

<examples-custom-colors></examples-custom-colors>

<<< @/docs/.vuepress/components/examples/custom-colors.vue

## Nested Colors

You can use your own colors in a nested arrays.

<examples-nested-colors></examples-nested-colors>

<<< @/docs/.vuepress/components/examples/nested-colors.vue

## Inline Mode

Inline Mode hides the trigger and show all the swatches right away! Useful for Advanced UI

<examples-inline-simple></examples-inline-simple>

<<< @/docs/.vuepress/components/examples/inline-simple.vue

## Inline + Custom UI

<examples-inline-advanced></examples-inline-advanced>

<<< @/docs/.vuepress/components/examples/inline-advanced.vue

## Disabling Swatches

You can disable specific swatches adding `disabled: true`

<examples-disabling></examples-disabling>

<<< @/docs/.vuepress/components/examples/disabling.vue

## Fallback Input

If your user wants to use its own color you can use a fallback input and customizing it with `fallback-input-class`, `fallback-ok-class` and '`fallback-ok-text`'

<examples-fallback-input></examples-fallback-input>

<<< @/docs/.vuepress/components/examples/fallback-input.vue

## Fallback Input + Color Picker

You can set the fallback input type to color and get a visual color picker interface

<examples-fallback-input-color></examples-fallback-input-color>

<<< @/docs/.vuepress/components/examples/fallback-input-color.vue
