import type { RiskAnalyticsData } from "../types";

export async function getRiskData(): Promise<RiskAnalyticsData> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    trends: [
      { month: "Oct", par: 4.2, default: 2.1 },
      { month: "Nov", par: 3.8, default: 1.9 },
      { month: "Dec", par: 3.5, default: 1.7 },
      { month: "Jan", par: 3.6, default: 1.8 },
      { month: "Feb", par: 3.4, default: 1.6 },
      { month: "Mar", par: 3.2, default: 1.8 },
    ],
    categories: [
      { label: "Low Risk", value: 58, amount: "$24.6M" },
      { label: "Medium Risk", value: 28, amount: "$11.9M" },
      { label: "High Risk", value: 11, amount: "$4.7M" },
      { label: "Very High Risk", value: 3, amount: "$1.3M" },
    ],
    byProduct: [
      { product: "Personal Loans", exposure: "$12.5M", par: "4.1%", trend: "down" },
      { product: "Auto Loans", exposure: "$8.3M", par: "2.8%", trend: "down" },
      { product: "Home Mortgages", exposure: "$15.2M", par: "1.5%", trend: "stable" },
      { product: "Business Loans", exposure: "$4.8M", par: "5.2%", trend: "up" },
      { product: "BNPL", exposure: "$1.7M", par: "3.5%", trend: "down" },
    ],
    earlyWarnings: [
      { indicator: "Late Payment Increase (>30 days)", severity: "Warning", count: 23, delta: "+5 this week" },
      { indicator: "Credit Score Deterioration", severity: "Alert", count: 8, delta: "+2 this week" },
      { indicator: "High DTI Ratio Applications", severity: "Watch", count: 15, delta: "-3 this week" },
      { indicator: "Concentration Risk - Sector", severity: "Info", count: 2, delta: "Stable" },
    ],
  };
}
