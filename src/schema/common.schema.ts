import z from 'zod';

export const MessageRes = z
  .object({
    message: z.string(),
  })
  .strict();

export type MessageResType = z.TypeOf<typeof MessageRes>;

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  desc: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  email_verified_at: z.string().nullable(),
  created_at: z.number(),
  updated_at: z.number(),
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

const WorkPlateSchema = z.object({
  id: z.number(),
  name: z.string(),
  address_id: z.string(),
  type_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  cap: z.string(),
  vung: z.string(),
});

export const AccountSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role_id: z.number(),
  wp_id: z.number(),
  role: RoleSchema,
  work_plate: WorkPlateSchema,
});

export type UserSchemaType = z.TypeOf<typeof UserSchema>;
