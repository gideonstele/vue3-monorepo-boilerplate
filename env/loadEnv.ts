import { loadEnv } from 'vite';

export default (mode: string) => {
  return loadEnv(mode, __dirname);
};
