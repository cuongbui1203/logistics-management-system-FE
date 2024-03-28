import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import { getUserInfo } from './api/data';
import { log } from 'console';

declare module '@auth/core/types' {
  interface User {
    phone: string | null;
    dob: string | null;
    username: string;
    address: string | null;
    role_id: number;
    wp_id: null;
    role: {
      id: number;
      name: string;
      desc: string;
    };
    work_plate: null;
    img: null;
    token: string;
  }

  interface Session {
    user: User & DefaultSession['user'];
    token: string;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    token: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      session.token = token.token;

      if (session.user && token) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.phone = token.phone as string;
        session.user.dob = token.dob as string;
        session.user.username = token.username as string;
        session.user.address = token.address as string;
        session.user.role_id = token.role_id as number;
        session.user.wp_id = token.wp_id as null;
        session.user.role = token.role as {
          id: number;
          name: string;
          desc: string;
        };
        session.user.work_plate = token.work_plate as null;
        session.user.img = token.img as null;
      }

      // console.log({ session, sessionToken: token });
      console.log('Callback session');

      return session;
    },
    async jwt({ token, user }) {
      console.log('Callback jwt');

      if (user) {
        token.token = user.token;
        const userObj = await getUserInfo(user.token);
        token.name = userObj.name;
        token.email = userObj.email;
        token.phone = userObj.phone;
        token.dob = userObj.dob;
        token.username = userObj.username;
        token.address = userObj.address;
        token.role_id = userObj.role_id;
        token.wp_id = userObj.wp_id;
        token.role = userObj.role;
        token.work_plate = userObj.work_plate;
        token.img = userObj.img;

        user = userObj;
      }

      // console.log({ token, user });
      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log('Call back redirect');

      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
});
