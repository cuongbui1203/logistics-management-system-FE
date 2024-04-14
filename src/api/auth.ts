import { AuthBodyType, RegisterBodyType, UpdateUserBodyType, UpdateUserResType } from '@/schema/auth.schema';
import http from '@/lib/http';
import { LoginBodyType, LoginResType } from '@/schema/auth.schema';
import { MessageResType } from '@/schema/common.schema';

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('api/users/login', body),
  register: (body: RegisterBodyType) => http.post<LoginResType>('api/users', body),
  auth: (body: AuthBodyType) =>
    http.post('api/auth', body, {
      baseUrl: '',
    }),
  logoutFromNextServerToServer: (token: string) =>
    http.delete<MessageResType>('api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  logoutFromNextClientToNextServer: (force?: boolean | undefined, signal?: AbortSignal | undefined) =>
    http.post<MessageResType>(
      '/api/auth/logout',
      {
        force,
      },
      {
        baseUrl: '',
        signal,
      }
    ),
  updateUserClient: (body: UpdateUserBodyType, id: number) => http.put<UpdateUserResType>(`api/users/${id}`, body),
};

export default authApiRequest;
