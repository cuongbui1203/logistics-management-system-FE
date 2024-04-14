import { UserSchema } from '@/schema/common.schema';
import z from 'zod';

export const RegisterBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    username: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    password_confirmation: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const LoginBody = z
  .object({
    username: z.string(),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 kí tự.').max(100),
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
});

export type AuthBodyType = z.TypeOf<typeof AuthBody>;
