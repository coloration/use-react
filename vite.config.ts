const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReactUse',
      fileName: (format: string) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react'],
    }
  }
})