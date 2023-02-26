import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve: {
    alias: {
      '~lib': resolve(__dirname, './lib'),
    },
  },
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'Flos',
      fileName: 'index',
    },
  },
  plugins: [dts({ include: ['./lib'] })],
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    includeSource: ['./lib/**/*.{js,ts}'],
  },
})
