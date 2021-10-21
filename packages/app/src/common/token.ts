import localstore from '@/utils/localstore';

class TokenManager {
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

export const tokenManager = new TokenManager();
