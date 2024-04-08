import authApiRequest from '@/api/auth';
import { HttpError } from '@/lib/http';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const res = await request.json();

  let header = new Headers();
  header.append('Set-Cookie', 'token=; Path=/; HttpOnly; Max-Age=0');
  header.append('Set-Cookie', 'csrfToken=; Path=/; HttpOnly; Max-Age=0');

  const force = res.force as boolean | undefined;
  if (force) {
    return Response.json(
      {
        message: 'Buộc đăng xuất thành công',
      },
      {
        status: 200,
        headers: header,
      }
    );
  }

  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return Response.json(
      { message: 'Không nhận được session token' },
      {
        status: 401,
      }
    );
  }
  try {
    const result = await authApiRequest.logoutFromNextServerToServer(token.value);
    return Response.json(result.payload, {
      status: 200,
      headers: header,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: 'Lỗi không xác định',
        },
        {
          status: 500,
        }
      );
    }
  }
}
