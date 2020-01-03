const { resolve } = require("path");

module.exports = function nuxtVueSwatches(moduleOptions) {
  this.options.css.unshift("vue-swatches/dist/vue-swatches.css");

  this.addPlugin({
    src: resolve(__dirname, "plugin.js"),
    fileName: "vue-swatches.js",
    moduleOptions
  });
};

module.exports.meta = require("../package.json");
