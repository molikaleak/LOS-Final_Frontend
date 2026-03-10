import type { Disbursement } from "../types";

export async function getDisbursements(): Promise<Disbursement[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    { id: "DSB-4521", loanId: "LN-8929", name: "Michael Scott", initials: "MS", amount: "$75,000", method: "Bank Transfer", status: "Completed", date: "Mar 8, 2026" },
    { id: "DSB-4520", loanId: "LN-8927", name: "Jim Halpert", initials: "JH", amount: "$42,000", method: "Direct Deposit", status: "Completed", date: "Mar 7, 2026" },
    { id: "DSB-4519", loanId: "LN-8925", name: "Dwight Schrute", initials: "DS", amount: "$150,000", method: "Bank Transfer", status: "Processing", date: "Mar 6, 2026" },
    { id: "DSB-4518", loanId: "LN-8920", name: "Stanley Hudson", initials: "SH", amount: "$30,000", method: "Check", status: "Pending Approval", date: "Mar 5, 2026" },
    { id: "DSB-4517", loanId: "LN-8918", name: "Phyllis Vance", initials: "PV", amount: "$85,000", method: "Bank Transfer", status: "Completed", date: "Mar 4, 2026" },
  ];
}
