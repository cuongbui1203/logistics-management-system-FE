import http from '@/lib/http';
import { MessageResType } from '@/schema/common.schema';
import {
  GoodListReqType,
  OrderCreateReqType,
  OrderDetailResType,
  OrderListResType,
  OrderMultiLeaveReqType,
  OrderMultiReceiveReqType,
  OrderMultiSendReqType,
} from '@/schema/order.schema';
import { WorkPlateSuggestResType } from '@/schema/workplate.schema';

export const orderApiRequest = {
  getListOrder: (status: number[], page: number) =>
    http.get<OrderListResType>(`api/orders?statuses=[${status}]&page=-1`),
  createOrder: (body: OrderCreateReqType) => http.post<OrderDetailResType>('api/orders', body),
  getOrderDetail: (id: string) => http.get<OrderDetailResType>(`api/orders/${id}`),
  addGoodOrder: (id: number, body: GoodListReqType) => http.post<OrderDetailResType>(`api/orders/${id}/multi`, body),
  deleteOrder: (id: number) => http.delete(`api/orders/multi?orders=[${id}]`),
  getNextPosition: (ids: string) => http.get<WorkPlateSuggestResType>(`/api/orders/multi/next?orders=[${ids}]`),
  sendOrder: (body: OrderMultiSendReqType) => http.post<MessageResType>('/api/orders/multi/next', body),
  receiveOrder: (body: OrderMultiReceiveReqType) => http.put<MessageResType>('/api/orders/multi/arrived', body),
  leaveOrder: (body: OrderMultiLeaveReqType) => http.put<MessageResType>('/api/orders/multi/leave', body),
};
