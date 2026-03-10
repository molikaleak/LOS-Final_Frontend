import type { LoanDetail } from "../types";

export async function getLoanById(id: string): Promise<LoanDetail> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id,
    applicant: {
      name: "John Doe",
      initials: "JD",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Springfield, IL 62701",
      employment: "Software Engineer at TechCorp",
      annualIncome: "$95,000",
      dob: "Jan 15, 1988",
      ssnLast4: "****4567",
      customerSince: "March 2020",
      activeLoans: 2,
      totalBorrowed: "$125,000",
    },
    loan: {
      type: "Car Loan",
      amount: "$50,000",
      term: "24 Months",
      rate: "6.5% p.a.",
      monthlyPayment: "$2,228.42",
      totalRepayment: "$53,482.08",
      collateral: "2025 Toyota Camry",
      insurance: "Required — GAP coverage",
      riskLevel: "Low",
    },
    workflow: [
      { step: "Loan Officer", status: "completed", date: "Oct 24, 10:30 AM" },
      { step: "Credit Analyst", status: "in-progress", date: "Started Oct 25" },
      { step: "Risk Manager", status: "pending", date: "" },
    ],
    riskAssessment: [
      { label: "Credit Score", value: "742", score: 74 },
      { label: "Debt-to-Income", value: "28%", score: 72 },
      { label: "Collateral Value", value: "$62,000", score: 85 },
      { label: "Employment", value: "Stable", score: 90 },
    ],
    documents: [
      { name: "ID Proof - Passport.pdf", status: "Verified", date: "Oct 22" },
      { name: "Income Statement - 2025.pdf", status: "Verified", date: "Oct 22" },
      { name: "Bank Statements - 6mo.pdf", status: "Under Review", date: "Oct 24" },
      { name: "Vehicle Registration.pdf", status: "Pending", date: "Oct 25" },
    ],
  };
}
