module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        store: '@store',
      },
    },
  },
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
}
