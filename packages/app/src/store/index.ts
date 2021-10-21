import { createStore, useStore as baseUseStore } from 'vuex';
import { findIndex, unionBy, uniqBy } from 'lodash';
import type { InjectionKey } from 'vue';
import type { Store } from 'vuex';
import { tokenManager } from '@/common/token';

const initState = {
  get token() {
    return tokenManager.get();
  },
  set token(value: string | undefined) {
    if (!value) {
      tokenManager.clear();
    } else {
      tokenManager.set(value);
    }
  },
  userinfo: {} as AuthUserInfo,
  menus: [] as MenuTree[],
};

type RootState = typeof initState;

// 定义 injection key
export const storeKey: InjectionKey<Store<RootState>> = Symbol.for('#global');

const sortMenu = (menus: MenuTree[]) => menus.sort((a, b) => (b.sort || 0) - (a.sort || 0));

// 创建一个新的 store 实例
const store = createStore<RootState>({
  state() {
    return initState;
  },
  mutations: {
    SET_MENU(state, payload: MenuDescriptionWithRoute[]) {
      const menus = uniqBy(staticMenus.concat(payload), 'id');
      const menuTrees = sortMenu(listToTreeList<MenuDescriptionWithRoute, MenuTree>(menus)).map((menuParent) => {
        if (menuParent.children && menuParent.children.length) {
          menuParent.children = sortMenu(menuParent.children);
        }
        return menuParent;
      });
      state.menus = menuTrees;
    },
    SET_MENU_FAV(state, payload: FavGroup[]) {
      const favMenuIndex = findIndex(state.menus, (menu) => menu.id === 'favorite');
      if (favMenuIndex > -1) {
        const pid = state.menus[favMenuIndex].id;
        const favMenuChildren: MenuDescriptionWithRoute[] = payload
          .sort((a, b) => {
            return dayjs(a.updateAt).diff(b.updateAt);
          })
          .map((fav) => {
            return {
              id: fav.id,
              pid,
              title: fav.name,
              route: `/favorite/${fav.id}`,
            };
          });
        const children = unionBy(state.menus[favMenuIndex].children || [], favMenuChildren);
        state.menus[favMenuIndex].children = children;
      }
    },
    SET_USERINFO(state, userinfo: AuthUserInfo) {
      state.userinfo = userinfo;
    },
  },
  getters: {
    hasLogin(state) {
      return !!state.token;
    },
  },
  actions: {
    setToken(_, payload: string) {
      tokenManager.set(payload);
      return Promise.resolve();
    },
    menuclick(_, payload: string) {
      console.log('action menuclick:', payload);
    },
  },
});

export function useStore() {
  return baseUseStore(storeKey);
}

export default store;
