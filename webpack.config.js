const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css', 'html'];
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'src', 'main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main_bundle.js',
    publicPath: "/",
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
      /* NUEVO  */
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'html-loader' }
        ]
      },
      {
          test: /\.s[ac]ss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
      }
    ],
  },
  
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'dist', 'index.html'),
      template: path.join(__dirname, 'static', 'index.html'),
      inject: true,
    }),
    new CleanWebpackPlugin(),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionWebpackPlugin({
    algorithm: 'gzip',
    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    threshold: 10240,
    minRatio: 0.8
    }),
    new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 5,
    minChunkSize: 100
    })
  ],
};