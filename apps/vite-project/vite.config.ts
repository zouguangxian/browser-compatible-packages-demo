import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  resolve: {
    alias: {
      // Polyfill Buffer
      buffer: 'buffer',
    },
  },
  plugins: [
    react(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  define: {
    // Define global to simulate Node.js environment
    global: 'globalThis',
  },
});
