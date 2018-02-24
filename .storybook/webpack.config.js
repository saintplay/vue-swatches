const path = require('path')
const merge = require('webpack-merge')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = (storybookBaseConfig, configType) => {
  const rules = storybookBaseConfig.module.rules
  storybookBaseConfig.resolve = {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
  rules.push(
    {
      test: /\.scss$/,
      loaders: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, '../')
    }
  )
  storybookBaseConfig.module.rules = rules
  return storybookBaseConfig;
}
