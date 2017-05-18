'use strict'

require('shelljs/global')
let path = require('path')
let shell = require('shelljs')
let webpack = require('webpack')

let baseConfig = require('./base')
let defaultSettings = require('./defaults')

var distPath = path.join(__dirname, '../dist')
shell.rm('-rf', distPath)
shell.mkdir('-p', distPath)
shell.cp('-R', 'static/*', distPath)
shell.cp('src/index.html', distPath)

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
})

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
})

module.exports = config
