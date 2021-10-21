<template>
  <section id="root-app">
    <router-view />
  </section>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { authService } from '@/services/auth';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
const App = defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const router = useRouter();
    onBeforeMount(async () => {
      if (!store.getters['hasLogin']) {
        router.replace({
          name: 'login',
        });
      } else {
        await authService.getUserInfo();
      }
    });
  },
});

export default App;
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
