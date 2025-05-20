
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { Request, Response, NextFunction } from 'express'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    middleware: [
      (req: Request, res: Response, next: NextFunction) => {
        // Custom middleware to handle API requests
        // For example, mocking API responses or adding headers
        next()
      }
    ]
  }
})
