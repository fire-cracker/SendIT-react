import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'mini-css-extract-plugin';


dotenv.config();

export default {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
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
          ExtractTextPlugin.loader, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
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
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css'
    }),
    new webpack.EnvironmentPlugin([
      'API_ROOT_URL',
    ])
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.jsx', '.js', '.png', '.svg', '.ico', '.jpg']
  }
};