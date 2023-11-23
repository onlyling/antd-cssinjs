import path from 'node:path'

import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  source: {
    entry: {
      index: './src/index.tsx',
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  output: {
    assetPrefix: './',
    dataUriLimit: {
      image: 5000,
      media: 0,
    },
  },
  html: {
    template: './index.html',
    templateParameters: {
      title: 'My App',
      BASE_URL: './',
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
    },
  },
  plugins: [pluginReact()],
})
