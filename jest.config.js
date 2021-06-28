module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,

  transform: {
    '^.+\\.vue$': 'vue-jest'
  }
};
