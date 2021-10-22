import localstore from 'store2';
import 'store2/src/store.old';
import 'store2/src/cookies';
import 'store2/src/store.cache';
import 'store2/src/store.on';
import 'store2/src/deep';

if (__IS_DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).localstore = localstore;
}

export default localstore;
