import z from 'zod';
import { WorkPlateSchema } from './common.schema';

export const WorkPlateListRes = z.object({
  success: z.boolean(),
  data: z.object({
    total: z.number(),
    currentPage: z.number(),
    pageSize: z.number(),
    data: z.array(WorkPlateSchema),
  }),
  message: z.string(),
});

export type WorkPlateListResType = z.TypeOf<typeof WorkPlateListRes>;

export const WorkPlateSuggestRes = z.object({
  success: z.boolean(),
  data: z.array(WorkPlateSchema),
  message: z.string(),
});

export type WorkPlateSuggestResType = z.TypeOf<typeof WorkPlateSuggestRes>;

export const WorkPlateDetailRes = z.object({
  success: z.boolean(),
  data: WorkPlateSchema,
  message: z.string(),
});

export type WorkPlateDetailResType = z.TypeOf<typeof WorkPlateDetailRes>;

export const WorkPlateNewReq = z.object({
  name: z.string(),
  address_id: z.string(),
  address: z.string(),
  type_id: z.number().optional(),
  cap: z.coerce.number(),
});

export type WorkPlateNewReqType = z.TypeOf<typeof WorkPlateNewReq>;
