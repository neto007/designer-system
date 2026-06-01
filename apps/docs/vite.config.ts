import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    // Force a single React instance across the monorepo
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
    alias: [
      {
        find: /^@shieldai\/ds$/,
        replacement: path.resolve(__dirname, '../../packages/core/src/index.ts'),
      },
      {
        find: /^@shieldai\/ds\/(.*)$/,
        replacement: path.resolve(__dirname, '../../packages/core/src/$1'),
      },
      // Point any react import from core to the app's node_modules
      {
        find: 'react',
        replacement: path.resolve(__dirname, 'node_modules/react'),
      },
      {
        find: 'react-dom',
        replacement: path.resolve(__dirname, 'node_modules/react-dom'),
      },
    ],
  },
})
