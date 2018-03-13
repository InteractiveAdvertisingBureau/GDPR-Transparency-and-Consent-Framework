const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

// * * * * * Common Config * * * * * //

const commonConfig = assetPath => {
  return {
    entry: {
      cmp: './src/cmp.js',
      cmpui: './src/cmpui.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }
          ]
        }
      ]
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),
      publicPath: assetPath
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: './index.html',
        minify: {
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true
        }
      }),
      new webpack.DefinePlugin({
        'process.env.ASSET_PATH': JSON.stringify(assetPath)
      })
    ]
  };
};

// * * * * * Production Config * * * * * //

const productionConfig = {
  plugins: [new CleanWebpackPlugin(['build']), new UglifyJSPlugin()]
};

// * * * * * Development Config * * * * * //

const developmentConfig = {
  devServer: {
    contentBase: './build',
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()]
};

// * * * * * Environment Config * * * * * //

const ASSET_PATHS = {
  dev: '',
  prod: 'https://cmp-demo.qccerttest.com/content/'
};

module.exports = env => {
  if (env === 'prod') {
    return merge(commonConfig(ASSET_PATHS.prod), productionConfig);
  }
  return merge(commonConfig(ASSET_PATHS.dev), developmentConfig);
};
