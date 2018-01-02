import Vue from 'vue'
import * as examples from './_examples'
import PresetExample from './_presets/PresetExample'
import Swatches from 'vue-swatches'
import Modal from 'vue-js-modal'
import 'prismjs'
import 'prismjs/plugins/remove-initial-line-feed/prism-remove-initial-line-feed.min'
import $ from 'jquery'

import 'prismjs/themes/prism.css'
import 'normalize.css'

import './docs.scss'

window.$ = $
window.jQuery = $
require('floating-scroll')

Vue.use(Modal, { componentName: 'modal' })

let sections = null

function calculateNavPositions () {
  sections = Array
    .from(document.querySelectorAll('[data-section]'))
    .map(section => {
      return {
        id: section.id,
        offset: section.getBoundingClientRect().top + window.pageYOffset - 50
      }
    })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    ...examples,
    PresetExample,
    Swatches
  },
  data () {
    return {
      currentPosition: '',
      isNavSticky: false,
      brandColor: '#f26556',
      brandColors: ['#f26556', '#4ccb7c', '#f6a820', '#9874db']
    }
  },
  computed: {
    color () {
      switch (this.brandColor) {
        case '#f26556':
          return 'red'
        case '#f6a820':
          return 'orange'
        case '#4ccb7c':
          return 'green'
        case '#9874db':
          return 'purple'
      }
    }
  },
  mounted () {
    this.adjustNav()
    window.addEventListener('scroll', this.adjustNav)
    setTimeout(function () {
      calculateNavPositions()
    }, 1000)
    $('#table__container__props').floatingScroll()
  },
  methods: {
    changeBrandColor (value) {
      console.log(value)
    },
    adjustNav () {
      this.isNavSticky = window.scrollY > window.innerHeight
      if (!sections) calculateNavPositions()
      for (let i = sections.length - 1; i >= 0; i--) {
        if (window.scrollY > sections[i].offset) {
          this.currentPosition = sections[i].id
          break
        }
      }
    }
  }
})
