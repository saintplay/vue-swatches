var merge = require('webpack-merge')
var prodEnv = require('./bundle.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
