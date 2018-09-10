import isHexColor from 'is-hex-color'
import presets, { supportedProperties } from '@/presets'

describe('Presets', () => {
  let presetsTested = 0
  const testPreset = presetName => {
    describe(`"${presetName}"`, () => {
      test('should have swatches property', () => {
        const preset = presets[presetName]
        const swatches = preset.swatches

        expect(swatches).toBeTruthy()
      })
      test('preset should have valid colors', () => {
        let isNested = false
        let validSwatches = 0
        let swatchesCount = 0
        const preset = presets[presetName]
        const swatches = preset.swatches

        if (
          swatches instanceof Array &&
          swatches.length > 0 &&
          swatches[0] instanceof Array
        ) {
          isNested = true
        }
        if (isNested) {
          swatches.forEach(r => {
            if (!(r instanceof Array)) return swatchesCount++
            r.forEach(s => {
              if (isHexColor(s)) validSwatches++
              return swatchesCount++
            })
          })
        } else {
          swatches.forEach(s => {
            if (isHexColor(s)) validSwatches++
            return swatchesCount++
          })
        }

        expect(`${validSwatches} valid colors`).toEqual(
          `${swatchesCount} valid colors`
        )
      })
      test('preset should have a valid borderRadius', () => {
        let valid = false
        const preset = presets[presetName]
        const borderRadius = preset.borderRadius
        if (typeof borderRadius === 'undefined') valid = true // borderRadius is not required
        if (typeof borderRadius === 'string') valid = true

        expect(valid).toBeTruthy()
      })
      test('preset should have a valid rowLength', () => {
        let valid = false
        const preset = presets[presetName]
        const rowLength = preset.rowLength
        if (typeof rowLength === 'undefined') valid = true // rowLength is not required
        if (
          typeof rowLength === 'number' &&
          rowLength > 0 &&
          Number.isInteger(rowLength)
        )
          valid = true

        expect(valid).toBeTruthy()
      })
      test('preset should have a valid spacingSize', () => {
        let valid = false
        const preset = presets[presetName]
        const spacingSize = preset.spacingSize
        if (typeof spacingSize === 'undefined') valid = true // spacingSize is not required
        if (typeof spacingSize === 'number' && spacingSize >= 0) valid = true

        expect(valid).toBeTruthy()
      })
      test('preset should have a valid swatchSize', () => {
        let valid = false
        const preset = presets[presetName]
        const swatchSize = preset.swatchSize
        if (typeof swatchSize === 'undefined') valid = true // swatchSize is not required
        if (typeof swatchSize === 'number' && swatchSize > 0) valid = true

        expect(valid).toBeTruthy()
      })
      test('preset should have a valid showBorder', () => {
        let valid = false
        const preset = presets[presetName]
        const showBorder = preset.showBorder
        if (typeof showBorder === 'undefined') valid = true // showBorder is not required
        if (typeof showBorder === 'boolean') valid = true

        expect(valid).toBeTruthy()
      })
      test('preset should only have a supported properties', () => {
        let validProperties = 0
        const preset = presets[presetName]
        const keys = Object.keys(preset)

        keys.forEach(k => {
          if (supportedProperties.indexOf(k) !== -1) validProperties++
        })

        expect(`${keys.length} valid properties`).toEqual(
          `${validProperties} valid properties`
        )
      })
      presetsTested++
    })
  }

  testPreset('basic')
  testPreset('material-basic')
  testPreset('material-dark')
  testPreset('material-light')
  testPreset('text-basic')
  testPreset('text-advanced')

  test('all presets should be tested', () => {
    expect(presetsTested).toEqual(Object.keys(presets).length)
  })
})
