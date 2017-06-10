import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ReplacePlugin from 'replace-bundle-webpack-plugin';
import path from 'path';
import OfflinePlugin from 'offline-plugin';
import ssr from './src/ssr.js';

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'), // used for tests
      style: path.resolve(__dirname, 'src/style'),
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /(\.css|\.scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: true,
                localIdentName: '[local]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: 'inline',
                plugins: function() {
                  return [autoprefixer({ browsers: ['> 1%', 'IE >= 10'] })];
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      },
      {
        test: /\.(xml|html|txt|md)$/,
        loaders: ['raw-loader']
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {
            noquotes: true
          }
        }
      },
      {
        test: /\.(woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
      disable: ENV !== 'production'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      minify: { collapseWhitespace: true },
      inject: true,
      render: () => ssr({ url: '/' })
    }),
    new CopyWebpackPlugin([
      { from: './manifest.json', to: './' },
      { from: './favicon.ico', to: './' }
    ]),
    new OfflinePlugin({
      version: '[hash]',
      responseStrategy: 'cache-first',
      safeToUseOptionalCaches: true,
      caches: {
        main: ['index.html', 'bundle.js', 'style.css'],
        additional: ['*.chunk.js', ':externals:'],
        optional: [':rest:']
      },
      cacheMaps: [
        {
          match: /.*/,
          to: '/',
          requestTypes: ['navigate']
        }
      ],
      ServiceWorker: {
        events: true
      },
      AppCache: {
        FALLBACK: { '/': '/' }
      }
    })
  ].concat(
    ENV === 'production'
      ? [
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false
          },
          compress: {
            warnings: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
            negate_iife: false
          }
        }),

          // strip out babel-helper invariant checks
        new ReplacePlugin([
          {
              // this is actually the property name https://github.com/kimhou/replace-bundle-webpack-plugin/issues/1
            partten: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
            replacement: () => 'return;('
          }
        ])
      ]
      : []
  ),

  stats: { colors: true },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },

  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
    port: process.env.PORT || 8080,
    host: 'localhost',
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true,
    open: true
  }
};
