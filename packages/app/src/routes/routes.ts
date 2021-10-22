import { values } from 'lodash';
import type { RouteRecordRaw } from 'vue-router';
import ViewFrame from './view-frame/index.vue';
import { staticRouteRecord } from './config/static';

const viewRoutes: RouteRecordRaw[] = values(staticRouteRecord);

export const staticRoutes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'root',
    component: ViewFrame,
    children: viewRoutes,
  },
];
