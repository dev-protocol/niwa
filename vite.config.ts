import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'
import mdPlugin, { Mode } from 'vite-plugin-markdown'

const mdOptions = {
  mode: [Mode.REACT]
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mdPlugin(mdOptions)],
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util'
    }
  },
  build: {
    target: ['esnext'],
    rollupOptions: {
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })]
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})
