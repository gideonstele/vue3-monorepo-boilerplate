import { URL } from 'url';
import { warn } from '@/utils/log';
import pkg from '../../package.json';

function getFullUrl(str: string) {
  const urlObj = new URL(str, `${location.protocol}//${location.host}`);
  return urlObj.toString();
}

export function getAppEnvConfig() {
  return {
    APP_TITIE: import.meta.env.VITE_APP_TITLE,
    API_URL: getFullUrl(import.meta.env.VITE_API_URL),
  };
}
