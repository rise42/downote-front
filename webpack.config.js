const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EnvironmentPlugin = require('webpack').EnvironmentPlugin

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.png$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './images/[name].[ext]'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new EnvironmentPlugin(['API_HOST', 'API_PORT'])
  ],
  devServer: {
    historyApiFallback: true
  }
}
