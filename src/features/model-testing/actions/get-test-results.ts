import type { TestResult } from "../types";

export async function getTestResults(): Promise<TestResult[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    { model: "FICO Standard v3.2", accuracy: 94.2, precision: 92.1, recall: 95.8, f1: 93.9, auc: 0.967, status: "Passed" },
    { model: "Internal Risk v2.1", accuracy: 91.8, precision: 90.5, recall: 93.1, f1: 91.8, auc: 0.945, status: "Passed" },
    { model: "Behavioral v1.5", accuracy: 88.5, precision: 87.2, recall: 89.8, f1: 88.5, auc: 0.921, status: "Warning" },
    { model: "ML Ensemble v4.0", accuracy: 96.1, precision: 95.4, recall: 96.8, f1: 96.1, auc: 0.982, status: "Testing" },
  ];
}
