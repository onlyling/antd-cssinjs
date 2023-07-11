/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')

/*
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  entry: {
    main: './src/index.tsx',
  },
  output: {
    // publicPath: './',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
    ],
  },
  builtins: {
    html: [
      {
        template: './index.html',
        publicPath: './',
        templateParameters: {
          title: 'My App',
          BASE_URL: './',
        },
      },
    ],
    // copy: {
    //   patterns: [
    //     {
    //       from: 'public',
    //     }
    //   ]
    // }
  },
  devServer: {
    historyApiFallback: true,
  },
}
