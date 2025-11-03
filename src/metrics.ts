export type MetricKey = "lcp" | "accessibility" | "apiLatency";

export interface MetricBudget {
  key: MetricKey;
  threshold: number;
}

export interface MetricResult {
  key: MetricKey;
  value: number;
}

export const withinThreshold = (budget: MetricBudget, result: MetricResult): boolean => {
  if (budget.key !== result.key) {
    throw new Error(`Metric key mismatch: expected ${budget.key}, received ${result.key}`);
  }

  return result.value <= budget.threshold;
};
