import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './index.js',
      name: 'MediaRecorderStream',
      fileName: 'media-recorder-streamx'
    }
  }
})
