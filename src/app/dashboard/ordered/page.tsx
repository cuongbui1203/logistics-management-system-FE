import OrderTable from '@/components/dashboard/order/order-table';
import { OrderTableType } from '@/config/Enum';
import React from 'react';

export default function Ordered() {
  return <OrderTable showFilter={true} type={OrderTableType.All}></OrderTable>;
}
