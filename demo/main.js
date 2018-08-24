import Vue from 'vue'
import Swatches from '../src/Swatches'
import Demo from './Demo.vue'

Vue.config.productionTip = false

Vue.component('swatches', Swatches)

new Vue({
  render: h => h(Demo),
}).$mount('#app')
