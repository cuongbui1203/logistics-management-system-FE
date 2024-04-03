import { AccountListResType } from './../schema/account.schema';
import http from '@/lib/http';
import { AccountResType } from '@/schema/account.schema';

const accountApiRequest = {
  me: (token: string) =>
    http.get<AccountResType>('users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  meClient: () => http.get<AccountResType>('users/me'),
  listAccountClient: () => http.get<AccountListResType>('users'),
};

export default accountApiRequest;
