import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills({
    exclude: ['module'], // Exclude the unwanted modules
  })],

  resolve: {
    alias: {
      module: path.resolve(__dirname, './src/polyfills/module.js'), // Alias 'module' to an empty module
    },
  },
})
