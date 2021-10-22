interface Window {
  localstore: Store;
}

declare const __IS_DEV__: boolean;
declare const __IS_LOCAL_DEV__: boolean;
declare const __IS_PROD__: boolean;

declare interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string;
  readonly VITE_LOCAL?: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_API_URL: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}