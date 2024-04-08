'use client';

import { listUrl } from '@/config/Enum';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';

export default function BreadCrumb() {
  const pathname = usePathname();
  const [listItem, setListItem] = useState<string[]>(['dashboard']);
  useEffect(() => {
    let temp: string[] = ['dashboard'];

    if (pathname.includes('ordered')) {
      temp.push('manageOrders');
      if (pathname.includes('create')) {
        temp.push('createOrder');
      } else if (pathname.includes('detail')) {
        temp.push('detailOrder');
      }
    } else if (pathname.includes('employee')) {
      temp.push('manageEmployees');
      if (pathname.includes('create')) {
        temp.push('createEmployee');
      } else if (pathname.includes('detail')) {
        temp.push('detailEmployee');
      }
    } else if (pathname.includes('transaction')) {
      temp.push('manageTransactions');
    } else if (pathname.includes('workspace')) {
      temp.push('manageWorkspaces');
    }
    setListItem(temp);
  }, [pathname]);
  const route = useRouter();
  console.log(listItem);

  return (
    <Breadcrumb>
      {listItem.map((e) => {
        return (
          <BreadcrumbItem
            key={e}
            onClick={() => {
              route.push(listUrl[e as keyof typeof listUrl].url);
            }}
          >
            {listUrl[e as keyof typeof listUrl]?.name}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
