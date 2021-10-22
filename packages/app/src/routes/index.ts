import { createRouter, createWebHistory } from 'vue-router';
import { staticRoutes } from './routes';
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: staticRoutes,
});

export default router;
