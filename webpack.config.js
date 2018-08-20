'use strict'

const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

require('es6-promise').polyfill()

const entry = {}
const entries = glob.sync('./assets/**/*.js').concat(glob.sync('./assets/**/[^_]*.scss'))
entries.forEach(e => {
  entry[path.basename(e).split('.')[0]] = e
})

console.log(entry);

module.exports = {
  entry,
  output: {
    path: __dirname,
    filename: 'dist/site-template.[hash].js'
  },

  plugins: [
    // Clean dist
    new CleanWebpackPlugin(['dist']),
    // Generate manifest.json
    new ManifestPlugin({
      fileName: 'dist/manifest.json'
    }),
    // Specify the resulting CSS filename
    new ExtractTextPlugin('dist/site-template.[hash].css'),
    // inject ES5 modules as global vars
    new webpack.ProvidePlugin(
      {
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
    }),
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
