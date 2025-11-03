import { describe, expect, it } from "vitest";

import { withinThreshold } from "../../src/metrics";

describe("withinThreshold", () => {
  it("returns true when the metric value is within the SLO", () => {
    expect(
      withinThreshold(
        { key: "lcp", threshold: 2000 },
        { key: "lcp", value: 1500 }
      )
    ).toBe(true);
  });

  it("returns false when the metric value exceeds the SLO", () => {
    expect(
      withinThreshold(
        { key: "apiLatency", threshold: 400 },
        { key: "apiLatency", value: 450 }
      )
    ).toBe(false);
  });

  it("throws when comparing different metric keys", () => {
    expect(() =>
      withinThreshold(
        { key: "accessibility", threshold: 0.95 },
        { key: "lcp", value: 1800 }
      )
    ).toThrowError(/Metric key mismatch/);
  });
});
