import { USER_LOGIN_REDIRECT, authRoutes, ADMIN_LOGIN_REDIRECT } from '@/routes';
import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const token = req.cookies.get('token')?.value;

  console.log('ROUTE: ', nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isPrivateRoute = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/customer');

  if (isPrivateRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return;
  }

  // Đăng nhập rồi thì không cho vào login/register nữa
  if (isAuthRoute) {
    if (token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  }
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  // all URL matching this regex will not invoke the auth function
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
