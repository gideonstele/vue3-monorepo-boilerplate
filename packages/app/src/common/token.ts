import localstore from '@/utils/localstore';

class TokenManager {
  private static instance: TokenManager;
  static init() {
    if (!this.instance) {
      this.instance = new TokenManager();
    }
    return this.instance;
  }
  private readonly store = localstore.session.namespace('mesoorauth');

  set(systemToken: string) {
    this.store.set('token', systemToken);
  }

  get(): string {
    return this.store.get('token') || '';
  }

  clear() {
    this.store.remove('token');
  }
}

const tokenManager = TokenManager.init();
export default tokenManager;
