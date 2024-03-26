import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
} satisfies NextAuthConfig;
