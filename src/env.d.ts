/// <reference types="vite/client" />

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.css';