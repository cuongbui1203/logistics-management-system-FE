import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BootstrapClient from '@/components/bootstrap-client';
import envConfig from '@/envConfig';
import { cookies } from 'next/headers';
import AppProvider from '@/app/app-provider';

import accountApiRequest from '@/api/account';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { AccountResType } from '@/schema/auth.schema';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: envConfig.NEXT_PUBLIC_COMPANY_NAME || 'Next.js App',
  description: envConfig.NEXT_PUBLIC_COMPANY_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const id = cookieStore.get('id');
  let user: AccountResType['data'] | null = null;
  if (token && id) {
    const data = await accountApiRequest.getInfo(token.value, id.value);
    user = data.payload.data;
  }
  return (
    <html lang="en" suppressHydrationWarning>
      {/* antialiased is tailwind class for font smoothing */}
      <body className={`${inter.className} antialiased`}>
        <AppProvider initialSessionToken={token?.value} user={user}>
          {children}
        </AppProvider>
        <ToastContainer />
        <BootstrapClient />
      </body>
    </html>
  );
}
