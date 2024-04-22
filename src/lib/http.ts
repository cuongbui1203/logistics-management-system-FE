import envConfig from '@/envConfig';
import { normalizePath } from '@/lib/utils';
import { LoginResType } from '@/schema/auth.schema';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type FormError = {
  message: string[];
  field: string;
};

type EntityErrorPayload = {
  success: boolean;
  error: FormError[];
  status_code: number;
};

export class HttpError extends Error {
  status: number;
  payload: {
    success: boolean;
    status_code: number;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error');
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;
  constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

class Token {
  private token = '';

  get value() {
    return this.token;
  }
  set value(token: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side');
    }
    this.token = token;
  }
}

export const clientSessionToken = new Token();
let clientLogoutRequest: null | Promise<any> = null;

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body
    ? options.body instanceof FormData
      ? options.body
      : JSON.stringify(options.body)
    : undefined;
  const baseHeaders =
    body instanceof FormData
      ? {
          Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : '',
        }
      : {
          'Content-Type': 'application/json',
          Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : '',
        };

  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server
  const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    credentials: 'include',
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });
  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      console.log('Authentication error');
      // TODO: Xử lý token hết hạn thì logout
      if (typeof window !== 'undefined') {
        location.href = '/';
        toast.error('Không có quyền truy cập');
      } else {
        redirect('/');
      }
    } else {
      throw new HttpError(data);
    }
  }

  // Đảm bảo logic dưới đây chỉ chạy ở phía client (browser)
  if (typeof window !== 'undefined') {
    console.log('Client side', url);

    if ('api/users/login' === normalizePath(url)) {
      clientSessionToken.value = (payload as LoginResType).data.token;
    } else if ('api/auth/logout' === normalizePath(url)) {
      clientSessionToken.value = '';
    }
  }

  return data;
};

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('GET', url, options);
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('DELETE', url, { ...options });
  },
};

export default http;
