export type AuditLog = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  target: string;
  category: string;
  ip: string;
};
