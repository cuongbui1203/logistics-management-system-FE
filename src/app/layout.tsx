import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BootstrapClient from '@/components/bootstrap-client';
import envConfig from '@/envConfig';
import { cookies } from 'next/headers';
import AppProvider from '@/app/app-provider';
import { AccountResType } from '@/schema/account.schema';
import accountApiRequest from '@/api/account';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


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
  const sessionToken = cookieStore.get('token');
  let user: AccountResType['data'] | null = null;
  if (sessionToken) {
    const data = await accountApiRequest.me(sessionToken.value);
    user = data.payload.data;
  }
  return (
    <html lang="en" suppressHydrationWarning>
      {/* antialiased is tailwind class for font smoothing */}
      <body className={`${inter.className} antialiased`}>
        <AppProvider initialSessionToken={sessionToken?.value} user={user}>
          {children}
        </AppProvider>
        <ToastContainer />
        <BootstrapClient />
      </body>
    </html>
  );
}
