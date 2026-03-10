import type { FraudData } from "../types";

export async function getFraudData(): Promise<FraudData> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    alerts: [
      { id: "FRD-2891", type: "Identity Fraud", application: "LN-8945", name: "Unknown Applicant", severity: "Critical", score: 95, status: "Under Investigation", time: "12 min ago" },
      { id: "FRD-2890", type: "Income Fabrication", application: "LN-8942", name: "Robert Liu", severity: "High", score: 82, status: "Investigating", time: "1h ago" },
      { id: "FRD-2889", type: "Duplicate Application", application: "LN-8940", name: "Anna Smith", severity: "Medium", score: 68, status: "Reviewing", time: "3h ago" },
      { id: "FRD-2888", type: "Document Tampering", application: "LN-8938", name: "Mark Johnson", severity: "High", score: 78, status: "Confirmed Fraud", time: "5h ago" },
      { id: "FRD-2887", type: "Synthetic Identity", application: "LN-8935", name: "Kevin Brown", severity: "Critical", score: 91, status: "Escalated", time: "8h ago" },
      { id: "FRD-2886", type: "Stacking", application: "LN-8933", name: "Jessica Wong", severity: "Low", score: 45, status: "Cleared", time: "1d ago" },
    ],
    byType: [
      { type: "Identity Fraud", count: 8, pct: 35 },
      { type: "Document Tampering", count: 5, pct: 22 },
      { type: "Income Fabrication", count: 4, pct: 17 },
      { type: "Synthetic Identity", count: 3, pct: 13 },
      { type: "Application Stacking", count: 2, pct: 9 },
      { type: "Other", count: 1, pct: 4 },
    ],
  };
}
