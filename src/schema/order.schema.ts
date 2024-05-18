import z from 'zod';
import { OrderSchema, WorkPlateSchema } from './common.schema';

export const GoodSchema = z.object({
  type_id: z.coerce.number().refine((v) => [9, 10, 11, 12].includes(v)),
  name: z.string(),
  mass: z.coerce.number().min(1),
  desc: z.string(),
  freight: z.coerce.number().default(1),
});

export type GoodSchemaType = z.TypeOf<typeof GoodSchema>;

export const GoodListReq = z.object({
  data: z.array(GoodSchema),
});

export type GoodListReqType = z.TypeOf<typeof GoodListReq>;

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
  type_id: z.coerce.number(),
});

export type OrderCreateReqType = z.TypeOf<typeof OrderCreateReq>;

export const OrderDetailRes = z.object({
  success: z.boolean(),
  data: OrderSchema,
  message: z.string(),
});

export type OrderDetailResType = z.TypeOf<typeof OrderDetailRes>;

export const OrderMultiSendReq = z.object({
  data: z.array(
    z.object({
      orderId: z.number(),
      to_id: z.number(),
    })
  ),
});

export type OrderMultiSendReqType = z.TypeOf<typeof OrderMultiSendReq>;
