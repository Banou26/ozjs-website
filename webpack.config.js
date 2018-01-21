const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: ['./src/libs/webcomponents.lite.js'],
  output: {
    path: path.resolve(__dirname, './public/assets'),
    publicPath: '/assets',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '/oz.js$': 'C:\\Users\\Banou\\Desktop\\ozjs\\src\\index.js'
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      'webpack': true
    })
  ]
}
