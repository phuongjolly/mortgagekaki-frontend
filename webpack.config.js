const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const target = path.resolve(__dirname, 'dist');

const config = {
  mode: 'development',
  entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.jsx')],
  output: {
    filename: 'app.bundle.js',
    path: target,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.less'],
  },
  module: {
    rules: [
      {
        test: /.js/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader'], // compiles Less to CSS
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: target,
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080/',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/bank-logos',
        to: 'bank-logos',
      },
    ]),
  ],
};

module.exports = config;
