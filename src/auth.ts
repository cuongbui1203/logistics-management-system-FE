import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import { User } from '@/types/User.';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.token as string;
      session.user = token.user as User;

      console.log({ session });

      return session;
    },
    async jwt({ token, user }) {
      console.log({ token, user });
      // token.accessToken = user.token;
      return { ...token, ...user };
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
});
