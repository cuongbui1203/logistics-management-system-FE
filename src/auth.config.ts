import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserInfo } from '@/serverAction/data';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password }: any = credentials;
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const url = 'http://127.0.0.1:8000/api/users/login';
        const res = await fetch(url, {
          method: 'POST',
          body: formData,
        });
        const response = await res.json();

        if (res.ok && response && response.success) {
          console.log('Login success', response);
          return response.data;
        } else {
          console.log('Login failed');
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('Callback jwt');
      // mean user logout
      if (!token.sub) return token;
      // console.log({ token, user });

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
      return token;
    },
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
  },
  session: { strategy: 'jwt' },
} satisfies NextAuthConfig;
