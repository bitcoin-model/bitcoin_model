import assert from 'node:assert/strict';
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
} from '../src/index.js';

const TOLERANCE = 1e-9;

function expectClose(actual, expected, tolerance = TOLERANCE) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} !== ${expected}`);
}

function testTimeSeries() {
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

  assert.equal(generated.length, baseSeries.length);
  generated.forEach((point, index) => {
    const reference = baseSeries[index];
    assert.equal(point.year, reference.year);
    expectClose(point.priceMillion, reference.priceMillion);
    if (point.arr === null || reference.arr === null) {
      assert.equal(point.arr, reference.arr);
    } else {
      expectClose(point.arr, reference.arr);
    }
  });

  const steadyStateArr = 0.05;
  const guardrail = generateGrowthSeries({
    startYear: 2024,
    endYear: 2027,
    initialValue: 1,
    arrStart: 0.12,
    arrReduction: 0.05,
    steadyStateArr
  });

  const arrValues = guardrail.slice(1).map((point) => point.arr);
  assert.ok(arrValues.every((value) => value === null || value >= steadyStateArr));
  assert.equal(arrValues[arrValues.length - 1], steadyStateArr);

  assert.throws(
    () =>
      generateGrowthSeries({
        startYear: 2030,
        endYear: 2029,
        initialValue: 1,
        arrStart: 0.1,
        arrReduction: 0.01,
        steadyStateArr: 0.01
      }),
    RangeError
  );
}

function testBtcScenarios() {
  ['base', 'bear', 'bull'].forEach((scenario) => {
    const projection = projectScenario(scenario);
    const expected = getScenarioSummaryFromFixture(scenario);

    expectClose(projection.summary.price2045Million, expected.price2045Million, 1e-6);
    expectClose(projection.summary.marketCap2045Trillion, expected.marketCap2045Trillion, 1e-6);
    expectClose(projection.summary.twentyOneYearArr, expected.twentyOneYearArr, 1e-9);
    expectClose(projection.summary.assetShare, expected.assetShare, 1e-9);
  });
}

function testMacro() {
  const projections = getMacroProjections();
  const lastIndex = projections.years.indexOf(2045);
  assert.ok(lastIndex > -1);
  expectClose(projections.totals.nominal[lastIndex], 3985.5666327367317, 1e-6);

  const share = getAssetShare(2045, 'BTC');
  expectClose(share, 0.07049489533594591, 1e-9);
}

function testMicro() {
  const scenario = findMicroScenario('individual', 'btc_maxi');
  assert.ok(scenario);
  expectClose(scenario.netWorth, 107.75238108308346, 1e-6);
  expectClose(scenario.cagr, 0.26686896104470104, 1e-9);
  expectClose(scenario.btc, 7.9044255694090175, 1e-9);

  const corporate = getMicroScenarios('corporate');
  assert.equal(corporate.length, 5);
}

function testNation() {
  const scenario = findNationScenario('indebted', 'triple_maxi');
  assert.ok(scenario);
  expectClose(scenario.netWorth, 18.722791305577122, 1e-6);
  expectClose(scenario.cagr, 0.3147295785430766, 1e-9);
  expectClose(scenario.btc, 1868.8065977599676, 1e-6);

  const wealthy = getNationScenarios('wealthy');
  assert.equal(wealthy.length, 5);
}

export function run() {
  testTimeSeries();
  testBtcScenarios();
  testMacro();
  testMicro();
  testNation();
}
