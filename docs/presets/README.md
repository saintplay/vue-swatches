---
sidebar: auto
---

# Presets

**Vue Swatches** has a bunch of predefined sets of swatches ready to be used for most common usages

## Basic

A basic collection of swatches for generic purposes.

This preset is used by default, its identifier is `'basic'`.

<div style="max-width: 240px;">
  <v-swatches swatches="basic" inline />
</div>

## Basic Text

A basic collection of swatches for styling text.

To use it pass `'text-basic'` to `swatches` prop.

<v-swatches swatches="text-basic" inline />

**Using this preset will internally update the default value of these props:**

- `show-border`

## Advanced Text

A complete collection of swatches for styling text. This preset uses nested swatches. Inspired by **Google Docs**

To use it pass `'text-advanced'` to `swatches` prop.

<v-swatches swatches="text-advanced" inline />

**Using this preset will internally update the default value of these props:**

- `border-radius`
- `show-border`
- `spacing-size`
- `swatch-size`
