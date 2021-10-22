import type { Permission } from './type';

/**
 * @description 这里的预设要和后端权限列表所返回的一致，一般来说，权限关联的视图、菜单等最好存储在服务端以有利于配置，硬编码降低了灵活性。
 */
export const permissions: Permission[] = [
  {
    name: 'goods-edit',
    route: {
      name: 'goods-edit',
      path: '/goods/edit/:id',
      meta: {
        requiresAuth: true,
        title: '编辑物料',
      },
      component: () => import(/* chunkName: ViewGoodsDetail */ '@/views/goods/edit.vue'),
    },
  },
  {
    name: 'system',
    menu: {
      id: 'system',
      pid: null,
      sort: 10000,
      title: '系统配置',
    },
    route: {
      name: 'system',
      path: '/system',
      meta: {
        requiresAuth: true,
        title: '系统配置',
      },
      component: () => import(/* chunkName: ViewGoodsDetail */ '@/views/system/edit.vue'),
    },
  },
  {
    name: 'microapp',
    menu: {
      id: 'microapp',
      pid: null,
      sort: 30000,
      title: '微应用',
      extendable: true,
    },
    route: {
      name: 'microapp',
      path: '/microapp',
      meta: {
        requiresAuth: true,
        title: '微应用',
      },
      component: () => import(/* chunkName: ViewGoodsDetail */ '@/views/microapp/edit.vue'),
    },
  },
];
/**
 * @description 这些权限不从后端返回的权限列表声明，登录时总是允许
 */
export const staticPermissions: Permission[] = [
  {
    name: 'dashboard',
    menu: {
      id: 'dashboard001',
      pid: null,
      sort: 100000,
      title: '仪表盘',
      route: '/dashboard',
    },
    route: {
      name: 'dashboard',
      path: '/dashboard',
      alias: '/',
      meta: {
        requiresAuth: true,
        title: '仪表盘',
      },
      component: () => import(/* chunkName: ViewDashboard */ '@/views/dashboard/index.vue'),
    },
  },
  {
    name: 'goods-list',
    menu: {
      id: 'goods001',
      pid: null,
      sort: 99000,
      title: '物料',
    },
    route: {
      name: 'goods',
      path: '/goods',
      meta: {
        requiresAuth: true,
        title: '物料',
      },
      component: () => import(/* chunkName: ViewGoods */ '@/views/goods/index.vue'),
    },
  },
  {
    name: 'goods-detail',
    route: {
      name: 'goods-detail',
      path: '/goods/view/:id',
      meta: {
        requiresAuth: true,
        title: '查看物料',
      },
      component: () => import(/* chunkName: ViewGoodsDetail */ '@/views/goods/detail.vue'),
    },
  },
];
