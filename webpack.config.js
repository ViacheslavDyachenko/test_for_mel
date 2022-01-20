const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tsChecker = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'build');

module.exports = {
  entry: '/index.tsx',
  target: !isProd ? 'web' : 'browserslist',
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(srcPath, './index.html'),
    }),
    new MiniCssExtractPlugin({
        filename: '[name]-[hash].css'
    }),
    new tsChecker(),
  ],
  output: {
    filename: 'bundle.js',
    path: buildPath,
    clean: true,
    publicPath: '/',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader',
        'css-loader',
        {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
            plugins: [
                [
                "postcss-preset-env",
                ],
            ],
            },
        },
        },],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          !isProd 
          ? 'style-loader'
          : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                  ],
                ],
              },
            },
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          !isProd 
          ? 'style-loader'
          : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]'
                }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                  ],
                ],
              },
            },
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
      },    
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
        components: path.join(srcPath, 'components'),
        images: path.join(srcPath, 'images'),
        pages: path.join(srcPath, 'pages'),
        store: path.join(srcPath, 'store'),
        styles: path.join(srcPath, 'styles'),
        utils: path.join(srcPath, 'utils'),
    }
  },
};