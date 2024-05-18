import OrderTable from '@/components/dashboard/order/order-table';
import { OrderStatusEnum } from '@/config/Enum';
import React from 'react';

export default function ReceivingOrderPage() {
  return <OrderTable showFilter={true} status={OrderStatusEnum.TO_THE_TRANSACTION_POINT}></OrderTable>;
}
