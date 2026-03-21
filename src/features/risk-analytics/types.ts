export type RiskTrend = {
  month: string;
  par: number;
  default: number;
};

export type RiskCategory = {
  label: string;
  value: number;
  amount: string;
};

export type RiskByProduct = {
  product: string;
  exposure: string;
  par: string;
  trend: "up" | "down" | "stable";
};

export type EarlyWarning = {
  indicator: string;
  severity: string;
  count: number;
  delta: string;
};

export type RiskAnalyticsData = {
  trends: RiskTrend[];
  categories: RiskCategory[];
  byProduct: RiskByProduct[];
  earlyWarnings: EarlyWarning[];
};
