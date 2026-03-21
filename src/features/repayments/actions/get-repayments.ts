import type { Repayment } from "../types";

export async function getRepayments(): Promise<Repayment[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    { id: "RPY-7801", loanId: "LN-8910", name: "Robert Brown", initials: "RB", amount: "$2,150.00", dueDate: "Mar 15, 2026", status: "Upcoming", loan: "$50,000", remaining: "$38,500" },
    { id: "RPY-7800", loanId: "LN-8905", name: "Lisa Wang", initials: "LW", amount: "$1,890.00", dueDate: "Mar 12, 2026", status: "Paid", loan: "$42,000", remaining: "$28,100" },
    { id: "RPY-7799", loanId: "LN-8898", name: "Carlos Mendez", initials: "CM", amount: "$3,420.00", dueDate: "Mar 10, 2026", status: "Overdue", loan: "$85,000", remaining: "$62,400" },
    { id: "RPY-7798", loanId: "LN-8895", name: "Jennifer Lee", initials: "JL", amount: "$1,250.00", dueDate: "Mar 8, 2026", status: "Paid", loan: "$30,000", remaining: "$18,750" },
    { id: "RPY-7797", loanId: "LN-8890", name: "Thomas Wright", initials: "TW", amount: "$4,100.00", dueDate: "Mar 5, 2026", status: "Paid", loan: "$120,000", remaining: "$95,500" },
  ];
}
