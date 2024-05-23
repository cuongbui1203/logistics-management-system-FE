import OrderTable from '@/components/dashboard/order/order-table';
import { OrderTableType } from '@/config/Enum';

export default function LeaveOrderPage() {
  return <OrderTable showFilter={true} type={OrderTableType.Leave}></OrderTable>;
}
