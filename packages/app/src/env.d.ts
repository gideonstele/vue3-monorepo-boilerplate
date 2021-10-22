import 'vue-router';
import Store from 'store2';
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    title?: string;
    state?: Record<string, string | number>;
  }
}