// It requires both a path and webpack 
var path = require('path');
var webpack = require('webpack');

// The webpack is deployed at localhost:3000 
module.exports = {
  devtool: 'eval',
  entry: {
    app : [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './lib/index.js'],
  },
  // Will output to the directory public/js/ into the file app.js
  output: {
    path: path.join(__dirname, './public/js/'),
    filename: `app.js`,
    publicPath: '/js/'
  },
  // Replacing the pulgin (not sure about this)
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // The node is empty in the file system
  node: {
    fs: "empty"
  },
  // Add react to the path
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    // add the extension .js
    extensions: ['', '.js']
  },
  // add loaders
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')
  },
  // module class
  module: {   
  // Different types of loaders 
    loaders: [
    {
      // test if the file ends in .js
      test: /\.js$/,
      // check if the loader is react-hot or babel
      loaders: ['react-hot', 'babel'],
      // don't add it to node_modules
      exclude: /node_modules/,
      // include the dirname and it to the lib folder
      include: [path.join(__dirname,'./lib')]
    },
    {
      // test if the file ends in .xml
      test: /\.xml$/,
      // check if the loader is a raw
      loader: "raw"
    },
    {
      // test if the file ends in .json
      test: /\.json$/,
      // check if the loader is a json-loader
      loaders: ['json-loader']
    },
    {
      // test if the file ends in .css
      test: /\.css?$/,
      // check if the loader is style or raw
      loaders: ['style', 'raw'],
      // include the directory name
      include: __dirname
    }]
  }
};
