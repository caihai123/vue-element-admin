module.exports = {
  devServer: {
    https: false,
    proxy: {
      '/api': {
        target: 'https://tc.lookdoor.cn:6443/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/mock': {
        target: 'https://caihai123.github.io/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/mock': ''
        }
      }
    }
  }
}