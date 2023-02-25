import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

export default defineConfig({
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
