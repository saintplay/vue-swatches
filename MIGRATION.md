# From v1.x to v2 #

## Breaking Changes ##

Please bear with me, and follow this **5-step** migration guide, you probably won't need to do them all

**1. Change the of name for the component and the name of the colors prop**

```diff
- import Swatches from 'vue-swatches'
+ import VSwatches from 'vue-swatches'

<template>
-  <swatches v-model="color" :colors="arrayOfColors" />
+  <v-swatches v-model="color" :swatches="arrayOfColors" />
</template>
```

- Component name `swatches` becomes `v-swatches` (*you only need this if you didn't set a custom name*)
- Prop `colors` becomes `swatches` (*check new documentation for terminology*)

**2. Change the name of the css file**

The css file has changed from `dist/vue-swatches.min.css` to `dist/vue-swatches.css` (*don't worry, the file is still minified*)

**3. If you are using the prop popover-to, you will need to change it**

`popover-to` prop no longer exists, instead you can use **popover-x** and **popover-y**.

See more about the [new popover props](https://saintplay.github.io/vue-swatches/api/props.html#behaviour-props)

**4. If you are using exceptions, you will need to use swatch objects**

```diff
<template>
-  <swatches :colors="arrayOfColors" :exceptions="['#FFFFFF', '#000000'] exception-mode="disabled" />
+  <v-swatches :swatches="arrayOfColors" />
</template>
```

**5. Material presets don't exist anymore**

This is because, the presets aren't actually standarized, they where very opinionated.

- `material-basic`

```js
['#F44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#03A9F4','#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722','#795548','#9E9E9E','#607D8B']
```

- `material-light`

```js
['#EF9A9A','#F48FB1','#CE93D8','#B39DDB','#9FA8DA','#90CAF9','#81D4FA','#80DEEA','#80CBC4','#A5D6A7','#C5E1A5','#E6EE9C','#FFF59D','#FFE082','#FFCC80','#FFAB91','#BCAAA4','#EEEEEE','#B0BEC5']
```

- `material-dark`

```js
['#D32F2F','#C2185B','#7B1FA2','#512DA8','#303F9F','#1976D2','#0288D1','#0097A7','#00796B','#388E3C','#689F38','#AFB42B','#FBC02D','#FFA000','#F57C00','#E64A19','#5D4037','#616161','#455A64']
```

See more about the [new presets](https://saintplay.github.io/vue-swatches/presets)


## Other (not likely) breaking changes

- Prop `max-height` no longer exists
- The parent `div` of the component and the trigger wrapper now are `inline-block` instead of the default `block`
- Passing a "*custom preset object*" through `colors` prop no longer works




