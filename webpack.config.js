const webpack = require('webpack')
const path = require('path')
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './js/app.js',
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/assets/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: '/node_modules/',
      include: __dirname,
    }],
  },
}
