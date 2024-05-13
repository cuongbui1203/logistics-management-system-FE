import OrderTable from '@/components/dashboard/order/order-table';
import { OrderStatusEnum } from '@/config/Enum';
import React from 'react';

export default function ReceivingOrderPage() {
  return <OrderTable showFilter={true} status={OrderStatusEnum.WAIT_F_DELIVERY}></OrderTable>;
}
