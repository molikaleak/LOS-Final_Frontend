export type User = {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: string;
  department: string;
  status: string;
  lastLogin: string;
};

export type Role = {
  name: string;
  users: number;
  permissions: string;
  description: string;
};
