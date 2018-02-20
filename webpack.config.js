'use strict';

const path = require('path')
const glob = require("glob");
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const styleLintPlugin = require('stylelint-webpack-plugin')

require('es6-promise').polyfill()

const entry = glob.sync("./assets/js/*.js").concat(glob.sync("./assets/sass/[^_]*.scss"))

module.exports = {
  entry,
  output: {
    path: __dirname,
    filename: 'public/assets/js/bundle.js'
  },

  plugins: [
    // Specify the resulting CSS filename
    new ExtractTextPlugin('public/assets/css/bundle.css'),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },

  stats: {
    // Colored output
    colors: true
  },

  // Create Sourcemaps for the bundle
  devtool: 'source-map'
}
