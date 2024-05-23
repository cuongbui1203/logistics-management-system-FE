import OrderTable from '@/components/dashboard/order/order-table';
import { OrderTableType } from '@/config/Enum';
import React from 'react';

export default function ReceivingOrderPage() {
  return <OrderTable showFilter={true} type={OrderTableType.Receiving}></OrderTable>;
}
