import type { Loan } from "../types";

export async function getLoans(): Promise<Loan[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    { id: "LN-8932", name: "Sarah Mitchell", initials: "SM", type: "Personal Loan", amount: "$25,000", term: "36 months", rate: "8.5%", status: "Under Review", date: "Mar 10, 2026", score: 742 },
    { id: "LN-8931", name: "David Chen", initials: "DC", type: "Auto Loan", amount: "$35,500", term: "60 months", rate: "6.2%", status: "Approved", date: "Mar 9, 2026", score: 810 },
    { id: "LN-8930", name: "Emily Rodriguez", initials: "ER", type: "Home Mortgage", amount: "$320,000", term: "360 months", rate: "5.8%", status: "Documents Pending", date: "Mar 9, 2026", score: 695 },
    { id: "LN-8929", name: "Michael Scott", initials: "MS", type: "Business Loan", amount: "$75,000", term: "48 months", rate: "9.1%", status: "Approved", date: "Mar 8, 2026", score: 780 },
    { id: "LN-8928", name: "Pam Beesly", initials: "PB", type: "Personal Loan", amount: "$12,000", term: "24 months", rate: "7.9%", status: "Rejected", date: "Mar 8, 2026", score: 580 },
    { id: "LN-8927", name: "Jim Halpert", initials: "JH", type: "Auto Loan", amount: "$42,000", term: "48 months", rate: "5.5%", status: "Disbursed", date: "Mar 7, 2026", score: 810 },
    { id: "LN-8926", name: "Angela Martin", initials: "AM", type: "Home Mortgage", amount: "$280,000", term: "360 months", rate: "5.9%", status: "Under Review", date: "Mar 7, 2026", score: 720 },
    { id: "LN-8925", name: "Dwight Schrute", initials: "DS", type: "Business Loan", amount: "$150,000", term: "60 months", rate: "8.8%", status: "Approved", date: "Mar 6, 2026", score: 755 },
  ];
}
