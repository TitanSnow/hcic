const webpack = require('webpack')

module.exports = {
  baseUrl: '',
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^readable-stream$/)
    ],
    output: {
      globalObject: 'this'
    }
  }
}
