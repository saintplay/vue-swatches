## Getting Started

### Usage in Module Bundlers

If you are using module bundlers such as Webpack, Rollup, etc, you may want to include the package directly

```bash
yarn add vue-swatches

# or use npm

npm install --save vue-swatches
```

```vue
<!-- Vue component -->
<template>
  <div>
    <swatches v-model="color"></swatches>
  </div>
</template>

<script>
import Swatches from 'vue-swatches'

// Import the styles too, typically in App.vue
import 'vue-swatches/dist/vue-swatches.css'

export default {
  components: { Swatches },
  data() {
    return {
      color: '#1CA085',
    }
  },
}
</script>
```

### Usage in Nuxt

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

You can use [UNPKG CDN](https://unpkg.com/) to use Vue Swatches in the browser

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/vue-swatches/dist/vue-swatches.css">
</head>
<body>
  <div id="app">
    <swatches v-model="color"></swatches>
  </div>
  <script src="https://unpkg.com/vue"></script>
  <script src="https://unpkg.com/vue-swatches"></script>
  <script>
    new Vue({
      el: '#app',
      components: {
        Swatches: window['vue-swatches']
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
