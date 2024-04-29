import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BootstrapClient from '@/components/bootstrap-client';
import envConfig from '@/envConfig';
import AppProvider from '@/app/app-provider';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: envConfig.NEXT_PUBLIC_COMPANY_NAME || 'Next.js App',
  description: envConfig.NEXT_PUBLIC_COMPANY_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* antialiased is tailwind class for font smoothing */}
      <body className={`${inter.className} antialiased`}>
        <AppProvider>{children}</AppProvider>
        <ToastContainer />
        <BootstrapClient />
      </body>
    </html>
  );
}
