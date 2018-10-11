const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devConfig = require('./webpack.config');

const config = {
  ...devConfig,
  mode: 'production',
  module: {
    rules: [
      ...devConfig.module.rules.filter(item => item.test !== /\.less$/),
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    ...devConfig.plugins,
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

module.exports = config;
