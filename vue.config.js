module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://tc.lookdoor.cn:6443/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}