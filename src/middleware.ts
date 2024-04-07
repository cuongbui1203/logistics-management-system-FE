import { USER_LOGIN_REDIRECT, publicRoutes, authRoutes, apiAuthPrefix, ADMIN_LOGIN_REDIRECT } from '@/routes';
import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const token = req.cookies.get('token')?.value;

  console.log('ROUTE: ', nextUrl.pathname);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isPublicRoute || isApiAuthRoute) {
    return;
  }

  // Đăng nhập rồi thì không cho vào login/register nữa
  if (isAuthRoute) {
    if (token) {
      return NextResponse.redirect(new URL(USER_LOGIN_REDIRECT, req.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  // all URL matching this regex will not invoke the auth function
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
