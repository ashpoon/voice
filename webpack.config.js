const path = require('path')

module.exports = {
  entry: {
    bundle: './js/app.js'
  },
  output: {
    path: path.join(__dirname, 'www'),
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
