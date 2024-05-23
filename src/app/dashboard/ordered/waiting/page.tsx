import OrderTable from '@/components/dashboard/order/order-table';
import { OrderTableType } from '@/config/Enum';
import React from 'react';

export default function WaitingOrderPage() {
  // return <OrderTable showFilter={true} status={OrderStatusEnum.CREATE}></OrderTable>;
  return <OrderTable showFilter={true} type={OrderTableType.Waiting}></OrderTable>;
}
