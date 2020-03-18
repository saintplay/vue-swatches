# Guide

## Introduction

Vue Swatches is a Vue component that allows the user to choose a color.
By default it shows the colors in a popover after clicking a color box (the trigger).

From now on we will use the term **swatch** as an object that contain multiple properties.

<img src="/assets/images/swatch.png" width="100%" style="max-width:480px" alt="Swatch">

Unlike classic color pickers, where all colors are available (167 77 216 colors), Vue Swatches only shows a bunch of predefined colors.

## Getting Started

### Usage with Module Bundlers

If you are using Vue CLI and/or module bundlers such as Webpack, Rollup, etc, you may want to include the package directly

```bash
yarn add vue-swatches

# or use npm

npm install --save vue-swatches
```

```vue
<!-- Vue component -->
<template>
  <div>
    <v-swatches v-model="color"></v-swatches>
  </div>
</template>

<script>
import VSwatches from 'vue-swatches'

// Import the styles too, typically in App.vue or main.js
import 'vue-swatches/dist/vue-swatches.css'

export default {
  components: { VSwatches },
  data() {
    return {
      color: '#1CA085',
    }
  },
}
</script>
```

### Usage with Nuxt

Vue Swatches is SSR Compatible, which means you can use it in your server side or in your generated static page. You can add `vue-swatches` to your project adding a **module** to the Nuxt Config

```bash
yarn add vue-swatches

# or use npm

npm install --save vue-swatches
```

```js
// nuxt.config.js
{
  modules: ['vue-swatches/nuxt']
}
```

### Usage in Browser

You can download `vue-swatches.umd.min.js` and `vue-swatches.css` from the `dist` folder or you can use [unpkg CDN](https://unpkg.com/) to use Vue Swatches in the browser

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/vue-swatches/dist/vue-swatches.css">
</head>
<body>
  <div id="app">
    <v-swatches v-model="color"></v-swatches>
  </div>
  <script src="https://unpkg.com/vue"></script>
  <script src="https://unpkg.com/vue-swatches"></script>
  <script>
    new Vue({
      el: '#app',
      components: {
        VSwatches: window['vue-swatches']
      },
      data() {
        return {
          color: ''
        }
      }
    })
  </script>
</body>
```

## Browser Compatibility

This component has the same support as Vue itself. However if you want to use this with IE9, you will probably need to work on the CSS styles. IE10 should be fine.
