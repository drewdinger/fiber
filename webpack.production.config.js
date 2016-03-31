// It requires both a path and webpack 
var path = require('path');
var webpack = require('webpack');

// export the module to lib/index.js
module.exports = {
  entry: {
    app : [
      './lib/index.js'],
  },
  // output app.js to the directory name /public/js/ folcer
  output: {
    path: path.join(__dirname, './public/js/'),
    filename: `app.js`,
    publicPath: '/js/'
  },
  // plugins for JSON.stringify
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
    }),
    // Not sure what it means
    new webpack.optimize.UglifyJsPlugin({
    }),
  ],
  // see if the file structure is empty
  node: {
    fs: "empty"
  },
  // Add react to the path
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    //ends in .js
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
      // exclude it from the node_module folder
      exclude: /node_modules/,
      // include the file to the directory name and add it the lib folder
      include: [path.join(__dirname,'./lib')]
    },
    {
      // test if the file ends in .xml
      test: /\.xml$/,
      // check if the loader is raw
      loader: "raw"
    },
    {
      // test if the file ends in .json
      test: /\.json$/,
      // check if the loader is json-loader
      loaders: ['json-loader']
    },
    {
      // test if the file ends in .css
      test: /\.css?$/,
      // check if the loader is style or raw
      loaders: ['style', 'raw'],
      // the directory name
      include: __dirname
    }]
  }
};
