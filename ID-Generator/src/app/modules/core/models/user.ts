export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  enabled: boolean;
  deleted: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
