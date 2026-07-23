import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const toKebabCase = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase()

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: (localClassName, filePath) => {
        const fileName = filePath
          .split(/[\\/]/)
          .pop()
          .replace(/\.module\.css$/, '')
        return `${toKebabCase(fileName)}-${toKebabCase(localClassName)}`
      },
    },
  },
})
