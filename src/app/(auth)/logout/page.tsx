'use client';

import authApiRequest from '@/api/auth';
import { clientSessionToken } from '@/lib/http';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Logout() {
  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const token = searchParams.get('token');
  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   if (token === clientSessionToken.value) {
  //     authApiRequest.logoutFromNextClientToNextServer(true, signal).then((res) => {
  //       router.push(`/login?redirectFrom=${pathname}`);
  //     });
  //   }
  //   return () => {
  //     controller.abort();
  //   };
  // }, [token, router, pathname]);
  return <div>page</div>;
}
