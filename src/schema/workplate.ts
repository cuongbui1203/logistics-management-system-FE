import z from 'zod';
import { WorkPlateSchema } from './common.schema';

export const WorkPlateListRes = z.object({
  success: z.boolean(),
  data: z.object({
    total: z.number(),
    currentPage: z.number(),
    data: z.array(WorkPlateSchema),
  }),
  message: z.string(),
});

export type WorkPlateListResType = z.TypeOf<typeof WorkPlateListRes>;
