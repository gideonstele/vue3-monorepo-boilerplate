import type { RouteRecordRaw } from 'vue-router';
export interface MenuMeta {
  sort?: number;
  id: string;
  pid: string | null;
  title: string;
  icon?: string;
  route?: string;
  extendable?: boolean;
}
export interface Permission {
  name: string;
  description?: string;
  route?: RouteRecordRaw;
  menu?: MenuMeta;
}
export interface PermissionWithRoute extends Permission {
  route: RouteRecordRaw;
}
export interface PermissionWithMenu extends Permission {
  menu: MenuMeta;
}
