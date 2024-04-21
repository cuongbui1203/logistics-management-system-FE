import z from 'zod';
import { AddressSchema } from './common.schema';

export const WorkPlateRes = z.object({
  id: z.number(),
  name: z.string(),
  address_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  type_id: z.number(),
  address: AddressSchema,
  manager: z.object({
    id: z.number(),
    name: z.string(),
    address: z.null(),
  }),
  type: z.object({
    id: z.number(),
    name: z.string(),
    for: z.number(),
  }),
  detail: z.null(),
});

export type WorkPlateResType = z.TypeOf<typeof WorkPlateRes>;

export const WorkPlateListRes = z.object({
  success: z.boolean(),
  data: z.array(WorkPlateRes),
  message: z.string(),
});

export type WorkPlateListResType = z.TypeOf<typeof WorkPlateListRes>;

export const WorkPlateNewReq = z.object({
  name: z.string(),
  address_id: z.string(),
  type_id: z.number(),
});

export type WorkPlateNewReqType = z.TypeOf<typeof WorkPlateNewReq>;
