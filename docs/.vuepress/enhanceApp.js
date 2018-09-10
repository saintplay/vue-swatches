import Swatches from '../../src/Swatches'
import Preset from './components/Preset'

export default ({ Vue, options, router, siteData }) => {
  Vue.component('swatches', Swatches)
  Vue.component('preset', Preset)
}
