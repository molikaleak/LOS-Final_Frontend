export type FraudAlert = {
  id: string;
  type: string;
  application: string;
  name: string;
  severity: string;
  score: number;
  status: string;
  time: string;
};

export type FraudByType = {
  type: string;
  count: number;
  pct: number;
};

export type FraudData = {
  alerts: FraudAlert[];
  byType: FraudByType[];
};
