import { User } from '@/types/User';
import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user as User | undefined;
};
