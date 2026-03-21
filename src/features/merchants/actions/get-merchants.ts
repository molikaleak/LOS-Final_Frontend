import type { Merchant } from "../types";

export async function getMerchants(): Promise<Merchant[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    { id: "MCH-001", name: "TechMart Electronics", category: "Electronics", volume: "$245,000", transactions: 1250, status: "Active", rate: "2.5%", joined: "Jan 2025" },
    { id: "MCH-002", name: "HomeStyle Furniture", category: "Furniture", volume: "$180,000", transactions: 420, status: "Active", rate: "2.0%", joined: "Mar 2025" },
    { id: "MCH-003", name: "AutoZone Plus", category: "Automotive", volume: "$320,000", transactions: 890, status: "Active", rate: "1.8%", joined: "Feb 2025" },
    { id: "MCH-004", name: "MedCare Pharmacy", category: "Healthcare", volume: "$95,000", transactions: 620, status: "Under Review", rate: "3.0%", joined: "Jun 2025" },
    { id: "MCH-005", name: "EduLearn Academy", category: "Education", volume: "$150,000", transactions: 310, status: "Active", rate: "1.5%", joined: "Apr 2025" },
  ];
}
