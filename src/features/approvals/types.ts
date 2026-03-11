import type { LoanDetail } from "@/features/loans/types";

export type Approval = {
  id: string;
  name: string;
  initials: string;
  amount: string;
  type: string;
  step: string;
  priority: string;
  submitted: string;
  score: number;
};

export type ApprovalDetail = Approval & {
  loanDetail: LoanDetail;
};
