import z from 'zod';
import { AddressDetailSchema } from './common.schema';

export const AddressListRes = z.object({
  success: z.boolean(),
  data: z.array(AddressDetailSchema),
  message: z.string(),
});

export type AddressListResType = z.TypeOf<typeof AddressListRes>;
