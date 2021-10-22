/// <reference types="vite/client" />
declare module '*.vue' {
  // 更多环境变量...
  import { DefineComponent, FunctionalComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent | FunctionalComponent;
  export default component;
}
