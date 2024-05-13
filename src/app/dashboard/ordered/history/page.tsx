import OrderTable from '@/components/dashboard/order/order-table';
import { OrderStatusEnum } from '@/config/Enum';

export default function HistoryOrderPage() {
  return <OrderTable showFilter={true} status={OrderStatusEnum.R_DELIVERY}></OrderTable>;
}
