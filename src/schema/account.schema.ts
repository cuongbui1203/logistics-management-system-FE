import { AccountSchema, UserSchema } from '@/schema/common.schema';
import z from 'zod';

export const AccountRes = z.object({
  success: z.boolean(),
  data: UserSchema,
  message: z.string(),
});

export type AccountResType = z.TypeOf<typeof AccountRes>;

export const AccountListRes = z.object({
  success: z.boolean(),
  data: z.object({
    total: z.number(),
    currentPage: z.number(),
    pageSize: z.number(),
    data: z.array(AccountSchema),
  }),
  message: z.string(),
});

export type AccountListResType = z.TypeOf<typeof AccountListRes>;

export type AccountList = AccountListResType['data']['data'];
