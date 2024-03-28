import authConfig from './auth.config';
import NextAuth from 'next-auth';
import { USER_LOGIN_REDIRECT, publicRoutes, authRoutes, apiAuthPrefix, ADMIN_LOGIN_REDIRECT } from '@/routes';
import { RoleEnum } from './types/Enum';

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

  if (isApiAuthRoute || isPublicRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log('USER: ', req.auth?.user);
      // when login
      if (req.auth?.user.role.name === 'User') {
        return Response.redirect(new URL(USER_LOGIN_REDIRECT, nextUrl));
      } else {
        return Response.redirect(new URL(ADMIN_LOGIN_REDIRECT, nextUrl));
      }
    }
    return;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  // if (req.auth?.user.role.name) {
  //   const role = req.auth.user.role.name as RoleEnum;
  //   switch (role) {

  //   }
  // }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  // all URL matching this regex will not invoke the auth function
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
