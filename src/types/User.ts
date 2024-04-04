export type LoginReq = {
  username: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  email_verified_at: string | null;
  created_at: Date;
  updated_at: Date;
  phone: number | null;
  dob: null;
  username: string;
  address: null;
  role_id: number;
  wp_id: null;
  img_id: null;
  role: {
    id: number;
    name: string;
    desc: string;
    created_at: Date;
    updated_at: Date;
  };
  work_plate: null;
  img: null;
};
