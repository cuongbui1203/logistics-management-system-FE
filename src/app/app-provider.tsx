'use client';
import { clientSessionToken } from '@/lib/http';
import { AccountResType } from '@/schema/auth.schema';
import { createContext, useContext, useState } from 'react';

type User = AccountResType['data'];

const AppContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default function AppProvider({
  children,
  initialSessionToken = '',
  user: userProp,
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
  user?: any;
}) {
  const [user, setUser] = useState<User | null>(userProp);
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = initialSessionToken;
    }
  });

  console.log('clientSessionToken', clientSessionToken.value);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
