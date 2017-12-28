export const typeCheckError = (propName, validTypes, value) => {
  const givenType = typeof value
  const upperCaseType = givenType[0].toUpperCase() + givenType.substr(1)
  const validTypesString = validTypes.join(', ')
  return `[vue-swatches] type check failed for prop "${propName}". Expected ${validTypesString}. got ${upperCaseType}.`
}

export const stringNotANumber = (propName, value) => {
  return `[vue-swatches] "${propName}" prop must be a Number. Got a String  but not parsable to a Number`
}

/* Colors Prop */
export const presetArray = value => `[vue-swatches] The given preset doesn't have a valid swatches Array. Please refer to the documentation.`
export const presetName = value => `[vue-swatches] "${value}" doesn't match any preset. Please refer to the documentation.`

/* ExceptionMode Prop */
export const exceptionModeValue = value => `[vue-swatches] "${value}" is not a valid value for "exception-mode". Please use "hidden" or "disabled"`

/* Shapes Prop */
export const shapesValue = value => `[vue-swatches] ${value} is not a valid value for "shapes". Please use "squares" or "circles"`

/* PopoverTo Prop */
export const popoverToValue = value => `[vue-swatches] ${value} is not a valid value for "popover-to". Please use "left" or "right"`
