<template>
  <config-provider>
    <section id="root-app">
      <router-view />
    </section>
  </config-provider>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
const App = defineComponent({
  name: 'App',
  components: {
    ConfigProvider,
  },
  setup() {
    onBeforeMount(async () => {});
  },
});

export default App;
</script>
