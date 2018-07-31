<h1 align="center">
  <br>
  <a href="https://saintplay.github.io/vue-swatches/">
    <img src="https://github.com/saintplay/vue-swatches/blob/master/.github/promo.png?raw=true" alt="Vue Swatches">
  </a>
</h1>

<p align="center">
  <a href="https://travis-ci.org/saintplay/vue-swatches">
    <img src="https://travis-ci.org/saintplay/vue-swatches.svg?branch=master" alt="Travis CI">
  </a>
  <a href="https://coveralls.io/github/saintplay/vue-swatches?branch=master">
    <img src="https://coveralls.io/repos/github/saintplay/vue-swatches/badge.svg?branch=master" alt="Coveralls">
  </a>
  <a href="https://www.npmjs.org/package/vue-swatches">
    <img src="https://img.shields.io/npm/v/vue-swatches.svg" alt="npm version">
  </a>
  <a href="https://www.npmjs.org/package/vue-swatches">
    <img src="https://img.shields.io/github/license/saintplay/vue-swatches.svg" alt="license">
  </a>
  <a href="https://github.com/facebook/jest">
    <img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="Jest">
  </a>
</p>

## Demo And Documentation ##

<https://saintplay.github.io/vue-swatches/>


## Table of Contents ##

- [Introduction](#introduction)
- [Features](#features)
- [Install](#install)
- [Basic Usage](#basic-usage)
- [Contributing](#contributing)
- [Browser Compatibility](#browser-compatibility)
- [License](#license)

## Introduction ##

Vue Swatches is a UI Component for Vue that allows the user to choose colors.

Unlike classic color pickers, where all colors are available (167 77 216 colors),
Vue Swatches only shows a bunch of predefined colors.

> More decisions require more effort

With fewer options, the user experience will be improved

## Features ##

<ul>
  <li>
    <a href="https://saintplay.github.io/vue-swatches/#presets">Presets ready to use</a>
  </li>
  <li>
    <a href="https://saintplay.github.io/vue-swatches/#sub-simple">Popover Mode</a>
  </li>
  <li>
    <a href="https://saintplay.github.io/vue-swatches/#sub-inline-mode">Inline Mode</a>
  </li>
  <li>
    <a href="https://saintplay.github.io/vue-swatches/#sub-custom-colors">Custom Colors</a>
  </li>
  <li>
    <a href="https://saintplay.github.io/vue-swatches/#sub-nested-colors">Nested Colors Array</a>
  </li>
  <li>
    <a href="https://saintplay.github.io/vue-swatches/#sub-props">Easily Customizable</a>
  </li>
  <li>
    <a href="https://saintplay.github.io/vue-swatches/#sub-using-a-custom-trigger">Custom Trigger</a>
  </li>
  <li>
    <a href="https://saintplay.github.io/vue-swatches/#sub-fallback-input">Fallback Input</a>
  </li>
</ul>

## Install ##

`npm install --save vue-swatches`

or

`yarn add vue-swatches`

## Basic Usage ##

```vue
<!-- Vue component -->
<template>
  <div>
    <swatches v-model="color"></swatches>
  </div>
</template>

<script>
  import Swatches from 'vue-swatches'

  // Import the styles too, globally
  import "vue-swatches/dist/vue-swatches.min.css"

  export default {
    components: { Swatches }, // window.VueSwatches.default - from CDN
    data () {
      return {
        color: '#1CA085'
      }
    }
  }
</script>
```

## Contributing ##

``` bash
# serve with hot reload at localhost:8080
npm run dev

# distribution build with minification
npm run bundle

# build the documentation into docs
npm run docs

# run unit tests
npm run test

```

## Browser Compatibility ##

This component has the same support than Vue itself

> Vue does not support IE8 and below, because it uses ECMAScript 5 features that are un-shimmable in IE8. However it supports all [ECMAScript 5 compliant browsers](https://caniuse.com/#feat=es5).

However if you want to use this with IE9, you will probably need to work on the CSS styles.
IE10 should be fine

## Awesome Contributors ##

- [Diego Jara (saintplay)](https://github.com/saintplay/)
- [Niko Nagy](https://github.com/NikoNagy)
- *feel free to add yourself*

## License

MIT
