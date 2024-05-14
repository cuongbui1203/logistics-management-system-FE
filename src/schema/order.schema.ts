import z from 'zod';
import { OrderSchema } from './common.schema';

export const OrderListRes = z.object({
  success: z.boolean(),
  data: z.object({
    data: z.array(OrderSchema),
    total: z.number(),
  }),
  message: z.string(),
});

export type OrderListResType = z.TypeOf<typeof OrderListRes>;

export const OrderCreateReq = z.object({
  sender_name: z.string(),
  sender_phone: z.string(),
  sender_address_id: z.string(),
  receiver_name: z.string(),
  receiver_phone: z.string(),
  receiver_address_id: z.string(),
  sender_address: z.string().optional(),
  receiver_address: z.string().optional(),
  type_id: z.number(),
});

export type OrderCreateReqType = z.TypeOf<typeof OrderCreateReq>;

export const OrderDetailRes = z.object({
  success: z.boolean(),
  data: OrderSchema,
  message: z.string(),
});

export type OrderDetailResType = z.TypeOf<typeof OrderDetailRes>;
