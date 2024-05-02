import { EMPLOYEE_PAGE_SIZE } from '@/config/constant';
import http from '@/lib/http';
import { AccountListResType, AccountNewReqType, AccountResType, ChangePasswordReqType } from '@/schema/auth.schema';
import { MessageResType } from '@/schema/common.schema';

const accountApiRequest = {
  getInfo: (token: string, id: string) =>
    http.get<AccountResType>(`api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getInfoClient: (id: number) => http.get<AccountResType>('api/users/me'),
  listAccountClient: (page: number) =>
    http.get<AccountListResType>(`api/users?pageSize=${EMPLOYEE_PAGE_SIZE}&&page=${page}`),
  changePasswordClient: (body: ChangePasswordReqType) => http.put<AccountResType>('api/users/change-password', body),
  createAccount: (body: AccountNewReqType) => http.post<AccountResType>('api/users/create/employee', body),
  deleteAccount: (id: number) => http.delete<MessageResType>(`api/users/${id}`),
};

export default accountApiRequest;
