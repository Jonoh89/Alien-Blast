const path = require('path');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'src/main.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules)/, loader: 'babel' },
      { test: /\.woff2?$|\.ttf$|\.eot$|\.svg|\.jpg$/, loader: 'file' },
      { test: /\.scss$/, exclude: /(node_modules)/, loaders: ['style', 'css', 'sass'] },
    ],
  },
  devtool: 'eval-source-map',
};
