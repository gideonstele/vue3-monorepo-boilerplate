import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import inject from '@rollup/plugin-inject';
import loadEnv from '../../env/loadEnv';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode);
  const config: UserConfig = {
    plugins: [
      vue(),
      jsx(),
      inject({
        'window.store': 'store2',
        store: 'store2',
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/main.ts'),
        formats: ['es'],
        fileName: 'index',
      },
    },
  };
  return config;
});
