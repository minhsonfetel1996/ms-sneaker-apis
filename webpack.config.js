// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const WebPackIgnorePlugin = {
  checkResource: function (resource) {
    const lazyImports = [
      '@nestjs/microservices',
      '@nestcloud/common',
      '@nestjs/websockets/socket-module',
      '@nestjs/microservices/microservices-module',
      'cache-manager',
      'class-transformer',
      'class-validator',
      'fastify-static',
    ];

    if (!lazyImports.includes(resource)) return false;

    try {
      require.resolve(resource);
    } catch (error) {
      return true;
    }
    return false;
  },
};

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    server: './src/main.ts',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: { configFile: 'tsconfig.json ' },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      [path.resolve(__dirname, 'node_modules/@nestcloud/core/Global.js')]:
        path.resolve(__dirname, 'node_modules/@nestcloud/core/global.js'),
    },
  },

  node: {
    __dirname: false,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(WebPackIgnorePlugin),
  ],

  optimization: {
    minimize: false,
    nodeEnv: false,
  },

  performance: {
    maxEntrypointSize: 100000000,
    maxAssetSize: 100000000,
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
};
