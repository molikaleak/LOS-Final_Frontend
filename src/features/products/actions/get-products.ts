import type { Product } from "../types";

export async function getProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    { id: "PRD-001", name: "Personal Loan - Standard", type: "Personal", rate: "8.5% - 15.0%", minAmount: "$1,000", maxAmount: "$50,000", term: "12-60 months", status: "Active", applications: 342 },
    { id: "PRD-002", name: "Auto Loan - Fixed Rate", type: "Auto", rate: "5.5% - 9.0%", minAmount: "$5,000", maxAmount: "$75,000", term: "24-72 months", status: "Active", applications: 215 },
    { id: "PRD-003", name: "Home Mortgage - Standard", type: "Mortgage", rate: "5.0% - 7.5%", minAmount: "$50,000", maxAmount: "$500,000", term: "180-360 months", status: "Active", applications: 128 },
    { id: "PRD-004", name: "Business Loan - SME", type: "Business", rate: "7.0% - 12.0%", minAmount: "$10,000", maxAmount: "$200,000", term: "12-84 months", status: "Active", applications: 96 },
    { id: "PRD-005", name: "BNPL - Merchant", type: "BNPL", rate: "0% - 3.0%", minAmount: "$100", maxAmount: "$5,000", term: "3-12 months", status: "Active", applications: 580 },
    { id: "PRD-006", name: "Student Loan", type: "Education", rate: "4.0% - 8.0%", minAmount: "$5,000", maxAmount: "$100,000", term: "60-120 months", status: "Draft", applications: 0 },
  ];
}
