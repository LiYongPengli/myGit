module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8001,
    proxy: {
      /* '/api': {
        target: "http://192.168.71.20:5000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }, */
      '/aps': {
        // target: "http://192.168.71.171:5000",
        target: "http://zlbxxcj.bjceis.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/aps": ""
        }
      }
    }
  }
}
