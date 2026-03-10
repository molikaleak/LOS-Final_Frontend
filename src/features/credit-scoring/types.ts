export type ScoringModel = {
  name: string;
  version: string;
  accuracy: number;
  status: string;
  lastUpdated: string;
};

export type ScoreDistribution = {
  range: string;
  count: number;
  pct: number;
};

export type CreditAssessment = {
  id: string;
  name: string;
  fico: number;
  internal: number;
  behavioral: number;
  final: number;
  risk: string;
};

export type CreditScoringData = {
  models: ScoringModel[];
  distribution: ScoreDistribution[];
  recentScores: CreditAssessment[];
};
