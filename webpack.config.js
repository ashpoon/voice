module.exports = {
  entry: {
    bundle: [
      './js/app.js',
      // below are just polyfills for eg IE
      'core-js/es6/array',  // eg Array.from
      'core-js/fn/object/assign',
      'core-js/fn/array/includes'
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
