import type { CreditScoringData } from "../types";

export async function getCreditData(): Promise<CreditScoringData> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    models: [
      { name: "FICO Standard", version: "v3.2", accuracy: 94.2, status: "Active", lastUpdated: "Feb 28, 2026" },
      { name: "Internal Risk Model", version: "v2.1", accuracy: 91.8, status: "Active", lastUpdated: "Mar 1, 2026" },
      { name: "Behavioral Score", version: "v1.5", accuracy: 88.5, status: "Active", lastUpdated: "Feb 15, 2026" },
      { name: "ML Ensemble Model", version: "v4.0", accuracy: 96.1, status: "Testing", lastUpdated: "Mar 5, 2026" },
    ],
    distribution: [
      { range: "800-850 (Excellent)", count: 180, pct: 14 },
      { range: "750-799 (Very Good)", count: 320, pct: 25 },
      { range: "700-749 (Good)", count: 385, pct: 30 },
      { range: "650-699 (Fair)", count: 250, pct: 19.5 },
      { range: "Below 650 (Poor)", count: 149, pct: 11.5 },
    ],
    recentScores: [
      { id: "LN-8932", name: "Sarah Mitchell", fico: 742, internal: 735, behavioral: 780, final: 752, risk: "Medium" },
      { id: "LN-8931", name: "David Chen", fico: 810, internal: 795, behavioral: 820, final: 808, risk: "Low" },
      { id: "LN-8930", name: "Emily Rodriguez", fico: 695, internal: 680, behavioral: 710, final: 695, risk: "Medium-High" },
      { id: "LN-8929", name: "Michael Scott", fico: 780, internal: 770, behavioral: 790, final: 780, risk: "Low" },
    ],
  };
}
