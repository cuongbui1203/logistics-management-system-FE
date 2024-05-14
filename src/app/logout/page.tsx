'use client';

import authApiRequest from '@/api/auth';
import { useAppContext } from '@/app/app-provider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function LogoutLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser } = useAppContext();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (token === localStorage.getItem('token')) {
      authApiRequest.logoutFromNextClientToNextServer(true, signal).then((res) => {
        setUser(null);
        router.push(`/login?redirectFrom=${pathname}`);
      });
    }
    return () => {
      controller.abort();
    };
  }, [token, router, pathname, setUser]);
  return <div>page</div>;
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  );
}
