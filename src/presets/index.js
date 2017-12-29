import basic from './basic'
import textBasic from './text-basic'
import textAdvanced from './text-advanced'
import materialBasic from './material-basic'
import materialLight from './material-light'
import materialDark from './material-dark'

export default {
  'basic': basic,
  'text-basic': textBasic,
  'text-advanced': textAdvanced,
  'material-basic': materialBasic,
  'material-light': materialLight,
  'material-dark': materialDark
}

export const supportedProperties = [
  'swatches', // Required
  'borderRadius', // Optional String: '50px', '0', '40%'
  'rowLength', // Optional Integer: 5, 8, 6
  'swatchSize', // Optional Positive Number: 12.5, 36, 10
  'spacingSize', // Optional Positive Number: 20, 28.2, 40
  'maxHeight', // Optional Positive Number: 220, 500.40, 300
  'showBorder' // Optional Boolean: true, false
]
