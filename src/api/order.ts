import http from '@/lib/http';
import { OrderCreateReqType, OrderListResType } from '@/schema/order.schema';

export const orderApiRequest = {
  getListOrder: () => http.get<OrderListResType>('api/orders'),
  createOrder: (body: OrderCreateReqType) => http.post<OrderListResType>('api/orders', body),
};
