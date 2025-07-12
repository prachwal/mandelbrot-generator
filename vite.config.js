import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  root: './web',
  build: {
    outDir: '../dist-web',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './web/index.html'
      }
    }
  },
  server: {
    port: 8080,
    host: true,
    open: true,
    watch: {
      // Obserwuj zmiany w folderze dist (skompilowany TypeScript)
      ignored: ['!**/dist/**']
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@dist': '../dist'
    }
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  optimizeDeps: {
    include: ['../dist/config.js', '../dist/colors.js', '../dist/mandelbrot.js']
  },
  // Hot reload dla ES modules
  esbuild: {
    target: 'es2020'
  }
});
