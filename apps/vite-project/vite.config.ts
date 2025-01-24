import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()]
  ,
})
