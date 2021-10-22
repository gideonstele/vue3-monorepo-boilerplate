import consola from 'consola';
const appName = import.meta.env.VITE_APP_TITLE;

export function info(message: string) {
  if (__IS_DEV__) {
    consola.log(`[${appName} info]:${message}`);
  }
}

export function warn(message: string) {
  if (__IS_DEV__) {
    consola.warn(`[${appName} info]:${message}`);
  }
}

export function error(message: string) {
  if (__IS_DEV__) {
    consola.error(`[${appName} info]:${message}`);
  }
}
