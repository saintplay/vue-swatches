import VSwatches from '../../src/VSwatches'
import Modal from 'vue-js-modal'

export default ({ Vue, options, router, siteData }) => {
  Vue.component('v-swatches', VSwatches)
  Vue.use(Modal, { componentName: 'custom-modal' })
}
