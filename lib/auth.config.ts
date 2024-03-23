import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password }: any = credentials;
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        const url = 'http://127.0.0.1:8000/api/users/login';
        const res = await fetch(url, {
          method: 'POST',
          body: formData,
        });

        const user = await res.json();

        if (res.ok && user) {
          console.log('Login success', user);
          return user;
        } else {
          console.log('Login failed');
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(data: any) {
      console.log(data, 'callback sign in');
      return true;
    },
    async jwt({ token, user }: any) {
      console.log(token, 'callback jwt');
      return { ...token, ...user };
    },
    async session({ session, token, user }: any) {
      console.log(session, token, user, 'callback session');
      // console.log('check user', user);
      // console.log('check token', token);
      session.accessToken = token.data.token;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
};
