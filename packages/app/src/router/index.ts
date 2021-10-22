import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { isNil } from 'lodash';
import { createRouter, createWebHistory } from 'vue-router';

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: (string | symbol)[] = [];

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [],
  strict: true,
});

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (!isNil(name) && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
