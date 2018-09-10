## Props

### Model Props

#### colors

The colors that will be shown in the swatches. You should always use **6-digits hex colors**.

- **Type**: `Array`, `Object` or `String`
- Use an `Array` of `Strings` to use your custom colors.
- Use an `Array` of `Arrays` to use your custom colors and group them in arrays.
- Use an `Array` of `Objects` to use your custom colors and specify additional information like text and alternative text.
- Use an `String` to use a preset.
- Use an `Object` to use your own preset.
- **Default**: `'basic'`
- **Examples**: `'material-light'`, `'text-advanced'`

#### value

Sets the selected color. It's compatible with the **v-model** directive.

- **Type**: `String`
- Use `''` for transparent/no-color.
- **Default**: `null`
- **Examples**: `'#1b22ee'`, `''`, `'#fc2343'`

### Behaviour Props

#### close-on-select

Hides the popover after select a color.

- **Type**: `Boolean`
- **Default**: `true`

#### disabled

Disables the color picker, user won't be able to open the popover. When using `inline-mode` all swatches will be disabled too.

- **Type**: `Boolean`
- **Default**: `false`

#### inline

Wheter the swatches should be shown in a popover or not (inline).

- **Type**: `Boolean`
- Use Inline (`true`) to hide the trigger and show the swatches right away.
- Use Popover (`false`) to show the swatches in the builtin popover after clicking the trigger.
- **Default**: `false`

#### show-fallback

Shows an input to change the color from there as well.

- **Type**: `Boolean`
- **Default**: `false`

### Presentational Props

#### background-color

Sets the background color of the wrapper.

- **Type**: `String`
- **Default**: `'#ffffff'`
- **Examples**: `'#ffffff'`, `#cccccc`

#### fallbackInputClass

Sets the [class](https://vuejs.org/v2/guide/class-and-style.html) for the fallback input.

- **Type**: `Array`, `Object` or `String`
- **Default**: `null`
- **Examples**: `'primary'`, `'is-primary'`, `'is-info'`

#### fallbackOkClass

Sets the [class](https://vuejs.org/v2/guide/class-and-style.html) for the fallback button.

- **Type**: `Array`, `Object` or `String`
- **Default**: `null`
- **Examples**: `'primary'`, `'is-primary'`, `'is-info'`

#### fallbackOkText

Sets the text for the fallback button.

- **Type**: `String`
- **Default**: `'Ok'`
- **Examples**: `'Select'`, `'Save'`, `'OK'`

#### max-height

The maximum height for the builtin popover. Don't append the `px` at the end.

- **Type**: `Number` or `String`
- **Default**: `300`
- **Examples**: `'300'`, `400`, `'600'`

#### shapes

The shape that will be used for the swatches and the trigger. Use `circles` or `squares`

- **Type**: `String`
- **Default**: `'squares'`

#### row-length

The number of swatches to show in a row. This don't affect inline mode.

- **Type**: `Number` or `String`
- **Default**: `4`
- **Examples**: `10`, `6`, `'8'`

#### show-border

Whether the swatches should be showing borders or not. Useful for making lighter colors more noticeable.

- **Type**: `Boolean`
- **Default**: `false`

#### swatch-size

Sets the swatches size.

- **Type**: `Number` or `String`
- **Default**: `42`
- **Examples**: `30`, `24`, `'36'`

#### swatch-style

Sets the [inline style](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles) for every swatch.

- **Type**: `Array` or `Object`
- **Default**: `{}`
- **Examples**: `{ width: '32px', height: '32px' }`, `{ borderRadius: '10px' }`, `{ padding: '16px 12px' }`

#### trigger-style

Sets the [inline style](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles) for the trigger.

- **Type**: `Array` or `Object`
- **Default**: `{}`
- **Examples**: `{ width: '32px', height: '32px' }`, `{ borderRadius: '10px' }`, `{ padding: '16px 12px' }`

#### wrapper-style

Sets the [inline style](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles) for the wrapper.

- **Type**: `Array` or `Object`
- **Default**: `{}`
- **Examples**: `{ paddingLeft: '32px' }`, `{ backgroundColor: '#ccc' }`, `{ paddingRight: '12px' }`
