'use strict'
// Template version: 1.2.7
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    host: 'localhost',
    port: 8080,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: true,
    devtool: '#source-map',
    cacheBusting: true,
    cssSourceMap: false,
  },

  bundle: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '/',
    assetsPublicPath: '/',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },

  docs: {
    index: path.resolve(__dirname, '../docs/index.html'),
    assetsRoot: path.resolve(__dirname, '../docs'),
    assetsPublicPath: '',
    devtool: '#source-map',
    productionSourceMap: false
  }
}
