import z from 'zod';

export const RegisterBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
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

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  desc: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email_verified_at: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
  phone: z.number().nullable(),
  dob: z.date().nullable(),
  username: z.string(),
  address: z.string().nullable(),
  role_id: z.number(),
  wp_id: z.string().nullable(),
  img_id: z.string().nullable(),
  role: RoleSchema,
  work_plate: z.string().nullable(),
  img: z.string().nullable(),
});

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
  role: z.string(),
});

export type AuthBodyType = z.TypeOf<typeof AuthBody>;
