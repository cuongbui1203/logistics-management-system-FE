export declare module 'next-auth' {
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

export declare module '@auth/core/jwt' {
  interface JWT {
    token: string;
  }
}
