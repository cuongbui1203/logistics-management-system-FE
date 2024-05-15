import { ORDER_PAGE_SIZE } from '@/config/constant';
import http from '@/lib/http';
import { GoodListReqType, OrderCreateReqType, OrderDetailResType, OrderListResType } from '@/schema/order.schema';

export const orderApiRequest = {
  getListOrder: (status: number, page: number) =>
    http.get<OrderListResType>(`api/orders?pageSize=${ORDER_PAGE_SIZE}&status=${status}&page=${page}`),
  createOrder: (body: OrderCreateReqType) => http.post<OrderDetailResType>('api/orders', body),
  getOrderDetail: (id: string) => http.get<OrderDetailResType>(`api/orders/${id}`),
  addGoodOrder: (id: number, body: GoodListReqType) => http.post<OrderDetailResType>(`api/orders/${id}/multi`, body),
};
