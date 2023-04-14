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
    // publicPath: '/antd-cssinjs',
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
