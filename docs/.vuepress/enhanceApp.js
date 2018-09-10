import VSwatches from '../../src/VSwatches'
import VPreset from './components/VPreset'

export default ({ Vue, options, router, siteData }) => {
  Vue.component('v-swatches', VSwatches)
  Vue.component('v-preset', VPreset)
}
