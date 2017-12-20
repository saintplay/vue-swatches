import Vue from 'vue'
import * as examples from './_examples'
import PresetExample from './_presets/PresetExample'
import Swatches from 'vue-swatches'

import 'prismjs'
import 'prismjs/themes/prism.css'
import 'normalize.css'

import './docs.scss'

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
      currentPosition: ''
    }
  },
  methods: {
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
  },
  mounted () {
    this.adjustNav()
    window.addEventListener('scroll', this.adjustNav)
    setTimeout(function () {
      calculateNavPositions()
    }, 1000)
  }
})
