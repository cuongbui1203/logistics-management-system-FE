import { AccountListResType } from './../schema/account.schema';
import http from '@/lib/http';
import { AccountResType } from '@/schema/account.schema';

const accountApiRequest = {
  me: (token: string) =>
    http.get<AccountResType>('api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  meClient: () => http.get<AccountResType>('api/users/me'),
  listAccountClient: () => http.get<AccountListResType>('api/users'),
};

export default accountApiRequest;
