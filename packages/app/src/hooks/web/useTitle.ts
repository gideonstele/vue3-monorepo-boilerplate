import { watch, unref } from 'vue';
import { useRouter } from 'vue-router';
import { useTitle as useViewTitle } from '@vueuse/core';
import { getAppEnvConfig } from '@/common/env';
import { REDIRECT_NAME } from '@/router/constant';

/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const { APP_TITIE } = getAppEnvConfig();
  const { currentRoute } = useRouter();
  const viewTitle = useViewTitle();
  watch(
    [() => currentRoute.value.path],
    () => {
      const route = unref(currentRoute);
      if (route.name === REDIRECT_NAME) {
        return;
      }

      const metaTitle = route.meta.title ? ` - ${route.meta.title}` : '';
      viewTitle.value = `${APP_TITIE}${metaTitle}`;
    },
    { immediate: true }
  );
}
