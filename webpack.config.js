const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');


const nodeenv = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: "./frontend/app.js",
  output: {
    path: path.join(__dirname, "/backend/public"),
    filename: "js/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          nodeenv ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/frontend/index.html"),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css'
    })
  ],
  devtool: 'source-map'
};