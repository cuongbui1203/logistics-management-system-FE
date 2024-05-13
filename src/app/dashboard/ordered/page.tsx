import OrderTable from '@/components/dashboard/order/order-table';
import { OrderStatusEnum } from '@/config/Enum';
import React from 'react';

export default function Ordered() {
  return <OrderTable showFilter={true} status={OrderStatusEnum.CREATE}></OrderTable>;
}
