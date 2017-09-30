module.exports = {
  entry: {
    bundle: [
      // include a few polyfills for eg IE 11
      'core-js/es6/array',  // eg Array.from
      'core-js/fn/object/assign',
      'core-js/fn/array/includes',
      './js/app.js'
    ]
  },
  output: {
    // path: path.join(__dirname, 'www'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
