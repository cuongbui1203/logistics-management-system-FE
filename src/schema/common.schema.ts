import z from 'zod';

export const MessageRes = z
  .object({
    message: z.string(),
  })
  .strict();

export type MessageResType = z.TypeOf<typeof MessageRes>;

export const AddressSchema = z.object({
  provinceCode: z.string(),
  districtCode: z.string(),
  wardCode: z.string(),
  province: z.string(),
  district: z.string(),
  ward: z.string(),
});

export const WorkPlateSchema = z.object({
  id: z.number(),
  name: z.string(),
  address_id: z.string(),
  type_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  cap: z.string(),
  vung: z.string(),
  address: AddressSchema,
});

export type WorkPlateSchemaType = z.TypeOf<typeof WorkPlateSchema>;

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
  created_at: z.number().nullable(),
  updated_at: z.number().nullable(),
  phone: z.string().nullable(),
  dob: z.date().nullable(),
  username: z.string(),
  address: AddressSchema,
  role_id: z.number(),
  wp_id: z.string().nullable(),
  img_id: z.string().nullable(),
  role: RoleSchema,
  work_plate: WorkPlateSchema.nullable(),
  img: z.string().nullable(),
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

export const AddressDetailSchema = z.object({
  code: z.string(),
  name: z.string(),
  name_en: z.string(),
  full_name: z.string(),
  full_name_en: z.string(),
  code_name: z.string(),
});

export type AddressDetailSchemaType = z.TypeOf<typeof AddressDetailSchema>;
