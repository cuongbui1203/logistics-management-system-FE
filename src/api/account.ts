import http from '@/lib/http';
import { AccountListResType, AccountResType, ChangePasswordReqType } from '@/schema/auth.schema';

const accountApiRequest = {
  me: (token: string) =>
    http.get<AccountResType>('api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  meClient: () => http.get<AccountResType>('api/users/me'),
  listAccountClient: () => http.get<AccountListResType>('api/users'),
  changePasswordClient: (body: ChangePasswordReqType) => http.put<AccountResType>('api/users/change-password', body),
};

export default accountApiRequest;
