'use client';

import { listUrl } from '@/config/Enum';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';

export default function BreadCrumb() {
  const pathname = usePathname();
  const [listItem, setListItem] = useState<string[]>(['dashboard']);
  useEffect(() => {
    const temp: string[] = ['dashboard'];

    let url = pathname.split('/');
    let pathname2 = pathname;
    if (pathname.includes('detail')) {
      // /dashboard/ordered/[id]/detail remove [id]
      url.splice(3, 1);
      pathname2 = url.join('/');
    }

    switch (pathname2) {
      case '/dashboard/ordered':
        temp.push('manageOrders');
        break;
      case '/dashboard/ordered/create':
        temp.push('manageOrders', 'createOrder');
        break;
      case '/dashboard/ordered/detail':
        temp.push('manageOrders', 'detailOrder');
        break;
      case '/dashboard/employee':
        temp.push('manageEmployees');
        break;
      case '/dashboard/employee/create':
        temp.push('manageEmployees', 'createEmployee');
        break;
      case '/dashboard/employee/detail':
        temp.push('manageEmployees', 'detailEmployee');
        break;
      case '/dashboard/transaction':
        temp.push('manageTransactions');
        break;
      case '/dashboard/transaction/create':
        temp.push('manageTransactions', 'createTransaction');
        break;
      case '/dashboard/transaction/detail':
        temp.push('manageTransactions', 'detailTransaction');
        break;
      case '/dashboard/transshipment':
        temp.push('manageTransshipment');
        break;
      case '/dashboard/transshipment/create':
        temp.push('manageTransshipment', 'createTransshipment');
        break;
      case '/dashboard/transshipment/detail':
        temp.push('manageTransshipment', 'detailTransshipment');
        break;
      case '/dashboard/information':
        temp.push('information');
        break;
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
