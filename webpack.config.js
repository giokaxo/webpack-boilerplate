const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// const isProduction = env.production === true;
const productionPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new CleanWebpackPlugin(['dist']),
  new HtmlWebpackPlugin({
    template: './index.html',
    inject: 'body',
    filename: '../index.html'
  }),
  new ExtractTextPlugin('../css/app.css'),
  new UglifyJSPlugin({
    sourceMap: true
  })
];

const developmentPlugins = [
  new HtmlWebpackPlugin({
    template: './index.html',
    inject: 'body'
  }),
  new ExtractTextPlugin('app.css')
];

module.exports = (env) => {
  const production = env.production !== undefined;
  return {
    entry: path.resolve(__dirname, 'src', 'js', 'app.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist', 'js')
    },
    watch: !production,
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: production ? '../fonts/' : ''
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'sass-loader']
          })
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpg|svg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: production ? '../images/' : ''
            }
          }
        }
      ]
    },
    plugins: production ? productionPlugins : developmentPlugins
  };
};
