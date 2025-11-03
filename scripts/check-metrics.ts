import fs from "node:fs";
import path from "node:path";

interface MetricBudget {
  unit: string;
  threshold: number;
  description: string;
}

interface MetricMap {
  [key: string]: MetricBudget;
}

interface MetricSnapshot {
  generatedAt: string;
  source: string;
  lcp: number;
  accessibility: number;
  apiLatency: number;
}

const root = process.cwd();

const sloPath = path.join(root, "config", "metrics", "slo.json");
const snapshotPath = path.join(root, "reports", "metrics-baseline.json");

if (!fs.existsSync(sloPath)) {
  throw new Error(`Missing SLO definition at ${sloPath}`);
}

if (!fs.existsSync(snapshotPath)) {
  throw new Error(`Missing metrics snapshot at ${snapshotPath}`);
}

const slo = JSON.parse(fs.readFileSync(sloPath, "utf-8")) as MetricMap;
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf-8")) as MetricSnapshot;

const failures: string[] = [];

const comparisons: Array<[keyof MetricSnapshot, keyof MetricMap]> = [
  ["lcp", "lcp"],
  ["accessibility", "accessibility"],
  ["apiLatency", "apiLatency"]
];

for (const [snapshotKey, sloKey] of comparisons) {
  const sloConfig = slo[sloKey as string];
  if (!sloConfig) {
    failures.push(`No SLO configuration defined for ${sloKey}`);
    continue;
  }

  const value = snapshot[snapshotKey];
  if (typeof value !== "number") {
    failures.push(`Metric ${String(snapshotKey)} is missing from snapshot`);
    continue;
  }

  if (value > sloConfig.threshold) {
    failures.push(
      `${String(snapshotKey)} value ${value} ${sloConfig.unit} exceeds threshold ${sloConfig.threshold} (${sloConfig.description})`
    );
  }
}

if (failures.length > 0) {
  console.error("Metric thresholds failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `All monitored metrics are within thresholds (source=${snapshot.source}, captured=${snapshot.generatedAt}).`
  );
}
