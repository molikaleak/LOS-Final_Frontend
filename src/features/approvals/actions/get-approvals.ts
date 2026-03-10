import type { Approval } from "../types";

export async function getApprovals(): Promise<Approval[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    // 4 Credit Review
    { id: "LN-8930", name: "Emily Rodriguez", initials: "ER", amount: "$320,000", type: "Home Mortgage", step: "Credit Review", priority: "High", submitted: "2h ago", score: 695 },
    { id: "LN-8936", name: "Oscar Martinez", initials: "OM", amount: "$95,000", type: "Business Loan", step: "Credit Review", priority: "Medium", submitted: "1d ago", score: 760 },
    { id: "LN-8941", name: "James Wilson", initials: "JW", amount: "$15,000", type: "Personal Loan", step: "Credit Review", priority: "Normal", submitted: "3h ago", score: 710 },
    { id: "LN-8942", name: "Linda Chen", initials: "LC", amount: "$420,000", type: "Home Mortgage", step: "Credit Review", priority: "High", submitted: "5h ago", score: 685 },
    
    // 3 Risk Assessment
    { id: "LN-8927", name: "Angela Martin", initials: "AM", amount: "$280,000", type: "Home Mortgage", step: "Risk Assessment", priority: "Medium", submitted: "4h ago", score: 720 },
    { id: "LN-8943", name: "Michael Scott", initials: "MS", amount: "$50,000", type: "Business Loan", step: "Risk Assessment", priority: "High", submitted: "1d ago", score: 650 },
    { id: "LN-8944", name: "Pam Beesly", initials: "PB", amount: "$12,000", type: "Auto Loan", step: "Risk Assessment", priority: "Normal", submitted: "2d ago", score: 740 },

    // 3 Doc Verification
    { id: "LN-8932", name: "Sarah Mitchell", initials: "SM", amount: "$25,000", type: "Personal Loan", step: "Doc Verification", priority: "Normal", submitted: "6h ago", score: 742 },
    { id: "LN-8945", name: "Jim Halpert", initials: "JH", amount: "$210,000", type: "Home Mortgage", step: "Doc Verification", priority: "Medium", submitted: "12h ago", score: 780 },
    { id: "LN-8946", name: "Dwight Schrute", initials: "DS", amount: "$85,000", type: "Business Loan", step: "Doc Verification", priority: "High", submitted: "1d ago", score: 810 },

    // 2 Final Approval
    { id: "LN-8935", name: "Kevin Brown", initials: "KB", amount: "$45,000", type: "Auto Loan", step: "Final Approval", priority: "High", submitted: "1d ago", score: 680 },
    { id: "LN-8947", name: "Stanley Hudson", initials: "SH", amount: "$150,000", type: "Business Loan", step: "Final Approval", priority: "Normal", submitted: "2d ago", score: 730 },
  ];
}
