var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var syntax = require('postcss-scss');

var contentBase = path.join(__dirname);
var publicPath = '/';
var modulesPath = path.join(__dirname, 'node_modules');
var clientPath = path.join(__dirname, 'client');
var targetPath = path.join(__dirname);

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(clientPath, 'index.js')
  ],
  output: {
    path: targetPath,
    filename: 'bundle.js',
    publicPath: publicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        'babel-loader'
      ],
      exclude: [modulesPath]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            parser: syntax,
            plugins: function () {
              return [
                precss,
                autoprefixer
              ]
            }
          }
        }
      ]
    }, {
      test: /\.png$/,
      use: {
        loader: "url-loader",
        options: { mimetype: "image/png" }
      }
    }]
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    contentBase: contentBase,
    publicPath: publicPath,
    hot: true,
    historyApiFallback: true
  }
};

