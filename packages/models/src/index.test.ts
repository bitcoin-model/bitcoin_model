import { describe, expect, it } from 'vitest';
import {
  generateGrowthSeries,
  getBtcBaseSeries,
  getMacroProjections,
  getAssetShare,
  projectScenario,
  getScenarioSummaryFromFixture,
  getScenarioAssumptions,
  getMicroScenarios,
  findMicroScenario,
  getNationScenarios,
  findNationScenario
} from './index';

const TOLERANCE = 1e-9;

const expectClose = (actual: number, expected: number, tolerance = TOLERANCE) => {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);
};

describe('time-series', () => {
  it('reconstructs the BTC base scenario from the fixture inputs', () => {
    const baseSeries = getBtcBaseSeries();
    const assumptions = getScenarioAssumptions('base');
    const generated = generateGrowthSeries({
      startYear: 2024,
      endYear: 2045,
      initialValue: baseSeries[0].priceMillion,
      arrStart: baseSeries[1].arr ?? assumptions.arrStart,
      arrReduction: assumptions.arrReduction,
      steadyStateArr: assumptions.steadyStateArr
    });

    expect(generated.length).toBe(baseSeries.length);
    generated.forEach((point, index) => {
      const reference = baseSeries[index];
      expect(point.year).toBe(reference.year);
      expectClose(point.priceMillion, reference.priceMillion);
      if (point.arr === null || reference.arr === null) {
        expect(point.arr).toBe(reference.arr);
      } else {
        expectClose(point.arr, reference.arr);
      }
    });
  });

  it('does not allow the ARR to fall below the steady state rate', () => {
    const steadyStateArr = 0.05;
    const generated = generateGrowthSeries({
      startYear: 2024,
      endYear: 2027,
      initialValue: 1,
      arrStart: 0.12,
      arrReduction: 0.05,
      steadyStateArr
    });

    const arrValues = generated.slice(1).map((point) => point.arr);
    expect(arrValues.every((value) => value === null || value >= steadyStateArr)).toBe(true);
    expect(arrValues[arrValues.length - 1]).toBe(steadyStateArr);
  });

  it('throws when the end year is before the start year', () => {
    expect(() =>
      generateGrowthSeries({
        startYear: 2030,
        endYear: 2029,
        initialValue: 1,
        arrStart: 0.1,
        arrReduction: 0.01,
        steadyStateArr: 0.01
      })
    ).toThrowError(RangeError);
  });
});

describe('btc scenarios', () => {
  const scenarios = ['base', 'bear', 'bull'] as const;

  scenarios.forEach((scenario) => {
    it(`matches the spreadsheet summary for ${scenario}`, () => {
      const projection = projectScenario(scenario);
      const expected = getScenarioSummaryFromFixture(scenario);

      expectClose(projection.summary.price2045Million, expected.price2045Million, 1e-6);
      expectClose(projection.summary.marketCap2045Trillion, expected.marketCap2045Trillion, 1e-6);
      expectClose(projection.summary.twentyOneYearArr, expected.twentyOneYearArr, 1e-9);
      expectClose(projection.summary.assetShare, expected.assetShare, 1e-9);
    });
  });
});

describe('macro projections', () => {
  it('exposes the 2045 nominal asset total from the workbook', () => {
    const projections = getMacroProjections();
    const lastIndex = projections.years.indexOf(2045);
    expect(lastIndex).toBeGreaterThan(-1);
    expectClose(projections.totals.nominal[lastIndex], 3985.5666327367317, 1e-6);
  });

  it('computes BTC share of assets for 2045', () => {
    const share = getAssetShare(2045, 'BTC');
    expectClose(share, 0.07049489533594591, 1e-9);
  });
});

describe('micro scenarios', () => {
  it('returns the BTC Maxi individual trajectory', () => {
    const scenario = findMicroScenario('individual', 'btc_maxi');
    expect(scenario).toBeDefined();
    expectClose(scenario!.netWorth, 107.75238108308346, 1e-6);
    expectClose(scenario!.cagr, 0.26686896104470104, 1e-9);
    expectClose(scenario!.btc, 7.9044255694090175, 1e-9);
  });

  it('returns all corporate scenarios', () => {
    const corporate = getMicroScenarios('corporate');
    expect(corporate).toHaveLength(5);
  });
});

describe('nation scenarios', () => {
  it('exposes the indebted nation triple maxi outlook', () => {
    const scenario = findNationScenario('indebted', 'triple_maxi');
    expect(scenario).toBeDefined();
    expectClose(scenario!.netWorth, 18.722791305577122, 1e-6);
    expectClose(scenario!.cagr, 0.3147295785430766, 1e-9);
    expectClose(scenario!.btc, 1868.8065977599676, 1e-6);
  });

  it('lists wealthy nation options', () => {
    const wealthy = getNationScenarios('wealthy');
    expect(wealthy).toHaveLength(5);
  });
});
