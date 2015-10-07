var path = require('path'),
    webpack = require('webpack')

var port = 8888

module.exports = {
  port: port,
  devtool: 'eval',
  entry: process.env.NODE_ENV === 'production' ? ['./src/lib/main'] : ['webpack-dev-server/client?http://localhost:' + port, 'webpack/hot/only-dev-server', './src/lib/main'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/js/[name].js'
  },
  plugins: process.env.NODE_ENV === 'production' ? [] : [new webpack.HotModuleReplacementPlugin()],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader?modules' + (process.env.NODE_ENV === 'production' ? '' : '&localIdentName=[name]__[local]___[hash:base64:5]') + '!postcss-loader'] },
    ]
  },
  postcss: [
    require('autoprefixer'),
    require('postcss-modules-values'),
    require('postcss-nested')
  ]
}