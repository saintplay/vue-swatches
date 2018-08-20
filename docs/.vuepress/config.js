module.exports = {
  title: 'vue-swatches',
  description: 'Help the uer picking beautiful colors',
  base: '/vue-swatches/',
  head: [['link', { rel: 'icon', href: '/assets/images/vue-logo.png' }]],
  themeConfig: {
    repo: 'saintplay/vue-swatches',
    logo: '/assets/images/vue-logo.png',
    lastUpdated: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      {
        text: 'Changelog',
        link: 'https://github.com/saintplay/vue-swatches/releases',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: ['', 'getting-started'],
        },
      ],
    },
  },
}
