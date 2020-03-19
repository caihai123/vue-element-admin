module.exports = {
  filenameHashing: false,//是否在文件名中包含了 hash 以便更好的控制缓存
  devServer: {
    https: true,
    port: 1234,
    // open: 'Chrome'//构建完成之后自动打开谷歌
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