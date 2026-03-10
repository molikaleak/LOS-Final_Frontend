import type { AuditLog } from "../types";

export async function getAuditLogs(): Promise<AuditLog[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    { id: "AUD-12845", timestamp: "Mar 10, 2026 09:15:22", user: "Marcus Johnson", action: "Approved Loan", target: "LN-8929", category: "Loan Action", ip: "192.168.1.45" },
    { id: "AUD-12844", timestamp: "Mar 10, 2026 09:10:05", user: "Sarah Jenkins", action: "Updated Credit Score", target: "LN-8932", category: "Risk Update", ip: "192.168.1.50" },
    { id: "AUD-12843", timestamp: "Mar 10, 2026 08:55:18", user: "David Park", action: "Flagged for Review", target: "LN-8930", category: "Compliance", ip: "192.168.1.55" },
    { id: "AUD-12842", timestamp: "Mar 10, 2026 08:42:31", user: "System", action: "Auto-Generated Report", target: "RPT-0342", category: "System", ip: "—" },
    { id: "AUD-12841", timestamp: "Mar 10, 2026 08:30:00", user: "Marcus Johnson", action: "Login", target: "—", category: "Authentication", ip: "192.168.1.45" },
    { id: "AUD-12840", timestamp: "Mar 10, 2026 08:15:42", user: "Maria Garcia", action: "Rejected Loan", target: "LN-8928", category: "Loan Action", ip: "192.168.1.60" },
    { id: "AUD-12839", timestamp: "Mar 9, 2026 17:45:10", user: "James Wilson", action: "Updated Role Permissions", target: "ROLE-003", category: "Admin", ip: "192.168.1.70" },
    { id: "AUD-12838", timestamp: "Mar 9, 2026 17:30:55", user: "Linda Chen", action: "Created Application", target: "LN-8932", category: "Loan Action", ip: "192.168.1.75" },
    { id: "AUD-12837", timestamp: "Mar 9, 2026 16:20:33", user: "System", action: "Backup Completed", target: "DB-MAIN", category: "System", ip: "—" },
    { id: "AUD-12836", timestamp: "Mar 9, 2026 15:55:18", user: "Sarah Jenkins", action: "Uploaded Document", target: "DOC-9921", category: "Document", ip: "192.168.1.50" },
  ];
}
