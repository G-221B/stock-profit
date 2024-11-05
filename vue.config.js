const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'./',
  css: {
    loaderOptions: {
      sass: {}
    }
  },
  configureWebpack: {
    devtool: 'source-map' // 或者 'eval-source-map' 在开发环境中使用
  },
})
