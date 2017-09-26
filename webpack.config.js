const path = require('path')

module.exports = {
  entry: [
    './js/app.js',
  ],
  output: {
    // path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
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
