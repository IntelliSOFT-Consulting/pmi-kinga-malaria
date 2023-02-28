import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  loader: { '.js': 'jsx' },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // change antd theme
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName, options) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('antd.js') ||
        context.resourcePath.includes('antd-mobile.js')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/^.*src(.*)/);
      if (match && match[1]) {
        const antdPath = match[1].replace('.less', '');
        return `${localName}-${antdPath.replace(/\/|-/g, '')}`;
      }
      return localName;
    },
  },
  // change antd theme
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#CE1C41', '@link-color': '#02437d', '@dark-color': '#02437D', '@background-color': '#02097e' },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#CE1C41',
          'heading-color': '#02437d',
          'dark-color': '#02437D',
          'background-color': '#02097e',
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
