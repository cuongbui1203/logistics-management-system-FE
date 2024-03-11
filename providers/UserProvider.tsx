'use client';

// import { MyUserContextProvider } from '@/hooks/useUser';
import React from 'react';

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
    // <MyUserContextProvider>
    //   {children}
    // </MyUserContextProvider>
  )
}