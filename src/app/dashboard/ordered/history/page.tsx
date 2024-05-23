import OrderTable from '@/components/dashboard/order/order-table';
import { OrderStatusEnum, OrderTableType } from '@/config/Enum';

export default function HistoryOrderPage() {
  return <OrderTable showFilter={true} type={OrderTableType.History}></OrderTable>;
}
