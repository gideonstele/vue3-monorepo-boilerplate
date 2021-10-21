import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import WindiCSS from 'vite-plugin-windicss';
import inject from '@rollup/plugin-inject';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { pathExistsSync, readJSONSync } from 'fs-extra';
import { resolve } from 'path';
import loadEnv from '../../env/loadEnv';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode);
  const isDev = ['dev', 'development', 'staging'].includes(mode);
  const isProd = ['prod', 'production'].includes(mode);
  const isLocalDev = isDev && !!Number(env.VITE_LOCAL);
  const proxyPath = resolve(__dirname, '../../proxy.json');
  const config: UserConfig = {
    define: {
      __IS_DEV__: isDev ? 'true' : 'false',
      __IS_PROD__: isProd ? 'true' : 'false',
      __IS_LOCAL_DEV__: isLocalDev ? 'true' : 'false',
    },
    css: {
      modules: { scopeBehaviour: 'local' },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
        modules: { scopeBehaviour: 'local' },
      },
    },
    envDir: resolve(__dirname, '../../env'),
    optimizeDeps: {
      include: ['axios', 'dayjs', 'qs', 'store2', 'vue-router', 'vuex', '@ant-design/icons-vue', 'lodash'],
    },
    plugins: [
      vue(),
      jsx(),
      inject({
        'window.store': 'store2',
        store: 'store2',
      }),
      legacy({
        targets: ['last 10 Chrome versions', 'last 3 Edge versions', 'last 3 Firefox versions', 'last 1 Safari major versions'],
      }),
      WindiCSS(),
      Components({
        extensions: ['vue', 'md', 'svg'],
        directoryAsNamespace: true,
        dts: true,
        include: [/\.vue$/, /\.md$/],
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~': resolve(__dirname, 'node_modules'),
        'store2/src/old': resolve(__dirname, 'node_modules/store2/src/store.old.js'),
        'store2/src/cache': resolve(__dirname, 'node_modules/store2/src/store.cache.js'),
        'store2/src/cookie': resolve(__dirname, 'node_modules/store2/src/store.cookie.js'),
        'store2/src/cookies': resolve(__dirname, 'node_modules/store2/src/store.cookies.js'),
        'store2/src/on': resolve(__dirname, 'node_modules/store2/src/store.on.js'),
        'store2/src/deep': resolve(__dirname, 'node_modules/store2/src/store.deep.js'),
        moment: resolve(__dirname, 'src/utils/replacemoment'),
      },
      dedupe: ['vue'],
    },
    envPrefix: ['VITE_', 'MR_'],
    base: './',
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('windi.css')) {
                return 'windicss';
              } else if (id.match(/vue/)) {
                return 'vendor_0';
              } else if (id.match(/axios|store|qs|lodash/)) {
                return 'vendor_1';
              } else if (id.match(/dayjs|ant-design/)) {
                return 'vendor_2';
              }
              return 'vendor_x';
            }
            return 'app';
          },
        },
      },
    },
    server:
      command === 'serve'
        ? {
            host: env.VITE_DEV_HOST || '0.0.0.0',
            port: Number(env.VITE_DEV_PORT || '9898'),
            proxy: pathExistsSync(proxyPath) ? readJSONSync(proxyPath) : {},
          }
        : {},
  };
  return config;
});
