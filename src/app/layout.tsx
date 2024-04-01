import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from '@/components/bootstrap-client';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Next.js App',
  description: process.env.COMPANY_DESCRIPTION,
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
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
