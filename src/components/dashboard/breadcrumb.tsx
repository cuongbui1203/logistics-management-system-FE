'use client';
import { listUrl } from '@/types/Enum';
import { usePathname, useRouter } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';

export default function BreadCrumb() {
  const pathname = usePathname();
  const listItem = ['dashboard'];
  if (pathname.includes('list_ordered')) {
    listItem.push('manageOrders');
    if (pathname.includes('create')) {
      listItem.push('createOrder');
    } else if (pathname.includes('detail')) {
      listItem.push('detailOrder');
    }
  } else if (pathname.includes('list_employee')) {
    listItem.push('manageEmployees');
    if (pathname.includes('create')) {
      listItem.push('createEmployee');
    } else if (pathname.includes('detail')) {
      listItem.push('detailEmployee');
    }
  } else if (pathname.includes('list_transaction')) {
    listItem.push('manageTransactionPoint');
  } else if (pathname.includes('list_workspace')) {
    listItem.push('manageGoodsPoint');
  }
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
