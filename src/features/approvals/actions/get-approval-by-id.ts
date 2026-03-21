import type { ApprovalDetail } from "../types";
import { getLoanById } from "@/features/loans/actions/get-loan-by-id";

// Mock database function
export async function getApprovalById(id: string): Promise<ApprovalDetail | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // Since we don't have a real DB, we'll fetch the mocked loan details
  // and mock the wrapper approval container metadata
  const loanDetail = await getLoanById(id);
  
  if (!loanDetail) {
    return null;
  }

  // Generate some semi-random approval metadata based on the loan ID
  const isHighPriority = id.endsWith("0") || id.endsWith("5");
  
  return {
    id: loanDetail.id,
    name: loanDetail.applicant.name,
    initials: loanDetail.applicant.initials,
    amount: loanDetail.loan.amount,
    type: loanDetail.loan.type,
    step: "Credit Review", // Mock step
    priority: isHighPriority ? "High" : "Medium",
    submitted: "2h ago",
    score: 720,
    loanDetail: loanDetail,
  };
}
