import type { RouteRecordRaw } from 'vue-router';
/**
 * @description 这些路由是不需要登录后再获取，它应该直接注册上去
 */
export const staticRouteRecord: Record<string, RouteRecordRaw> = {
  position: {
    name: 'dashboard',
    path: '/dashboard',
    alias: '/',
    strict: true,
    meta: {
      title: '职位 - 全部职位',
      requiresAuth: true,
    },
    component: () => import('@/views/dashboard/index.vue'),
  },
};
