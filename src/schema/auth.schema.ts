import { UserSchema } from '@/schema/common.schema';
import z from 'zod';

export const RegisterBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    username: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6, 'Mật khẩu phải có độ dài tối thiểu là 6').max(100),
    password_confirmation: z.string().min(6, 'Mật khẩu phải có độ dài tối thiểu là 6').max(100),
  })
  .strict()
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['password_confirmation'],
      });
    }
  });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const LoginBody = z
  .object({
    username: z.string(),
    password: z.string().min(1, 'Mật khẩu phải có ít nhất 1 kí tự.').max(100),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = z.object({
  success: z.boolean(),
  data: z.object({
    user: UserSchema,
    token: z.string(),
    csrf_token: z.string(),
  }),
  message: z.string(),
});

export type LoginResType = z.TypeOf<typeof LoginRes>;

export const AuthBody = z.object({
  token: z.string(),
  csrf_token: z.string(),
  id: z.number(),
});

export type AuthBodyType = z.TypeOf<typeof AuthBody>;

export const UpdateUserBody = z.object({
  name: z.string().trim().min(2).max(256),
  dob: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address_id: z.string(),
  image: z.string().optional(),
});

export type UpdateUserBodyType = z.TypeOf<typeof UpdateUserBody>;

export const AccountUpdateReq = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  dob: z.string().nullable(),
  username: z.string(),
  address_id: z.string(),
  role_id: z.number(),
  wp_id: z.coerce.number(),
  img_id: z.string().optional(),
});

export type AccountUpdateReqType = z.TypeOf<typeof AccountUpdateReq>;

export const AccountNewReq = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  dob: z.string().nullable(),
  username: z.string(),
  address_id: z.string(),
  role_id: z.number(),
  wp_id: z.string().optional(),
  img_id: z.string().optional(),
});

export type AccountNewReqType = z.TypeOf<typeof AccountNewReq>;

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
    data: z.array(UserSchema),
  }),
  message: z.string(),
});

export type AccountListResType = z.TypeOf<typeof AccountListRes>;

export type AccountList = AccountListResType['data']['data'];

export const ChangePasswordReq = z
  .object({
    old_password: z.string(),
    new_password: z.string().min(6, 'Mật khẩu phải có độ dài tối thiểu là 6').max(100),
    new_password_confirmation: z.string().min(6, 'Mật khẩu phải có độ dài tối thiểu là 6').max(100),
  })
  .strict()
  .superRefine(({ new_password_confirmation, new_password }, ctx) => {
    if (new_password_confirmation !== new_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['new_password_confirmation'],
      });
    }
  });

export type ChangePasswordReqType = z.TypeOf<typeof ChangePasswordReq>;

export const ForgotPasswordReq = z.object({
  email: z.string().email(),
});

export type ForgotPasswordReqType = z.TypeOf<typeof ForgotPasswordReq>;

export const ResetPasswordReq = z.object({
  email: z.string().email(),
  token: z.string().optional(),
  password: z.string().min(6, 'Mật khẩu phải có độ dài tối thiểu là 6').max(100),
  password_confirmation: z.string().min(6, 'Mật khẩu phải có độ dài tối thiểu là 6').max(100),
});

export type ResetPasswordReqType = z.TypeOf<typeof ResetPasswordReq>;
