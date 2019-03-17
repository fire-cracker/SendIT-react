const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
            },
          },
        ],
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  }
};
