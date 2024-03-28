import authConfig from './auth.config';
import NextAuth from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT, publicRoutes, authRoutes, apiAuthPrefix } from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // req.auth
  console.log('ROUTE: ', nextUrl.pathname);
  console.log('IS LOGGEDIN: ', isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  // all URL matching this regex will not invoke the auth function
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
