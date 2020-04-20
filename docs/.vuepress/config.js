const path = require("path")

module.exports = {
  title: 'Vue Swatches',
  description: 'Help the user picking beautiful colors',
  head: [['link', { rel: 'icon', href: '/assets/images/vue-logo.png' }]],
  base: "/vue-swatches/",
  themeConfig: {
    repo: 'saintplay/vue-swatches',
    logo: '/assets/images/vue-logo.png',
    lastUpdated: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'API', link: '/api/' },
      { text: 'Presets', link: '/presets/' },
      {
        text: 'v1.x',
        link: 'https://vue-swatches-v1.netlify.com/',
      },
      {
        text: 'Changelog',
        link: 'https://github.com/saintplay/vue-swatches/releases',
      },
    ],
    sidebar: {
      '/api/': [{
        title: 'API',
        collapsable: false,
        children: [
          ['', 'Introduction'],
          'props',
          'events',
          'slots'
        ]
      }]
    },
  }
}
