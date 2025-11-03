import { BTCInputs, MacroInputs, ModelInputs, ModelKind, ScenarioDetail, ScenarioSummary, YearlyBTCRow, MacroOutputs, ModelOutputs } from '@/src/types/scenario';
import { nanoid } from 'nanoid';

const START_YEAR = 2024;
const HORIZON = 21;

export function createDefaultBTCInputs(): BTCInputs {
  return {
    currentPrice: 68000,
    arrStart: 0.38,
    arrDecay: 0.06,
    steadyStateArr: 0.08,
    steadyStateYear: 2032
  };
}

export function createDefaultMacroInputs(): MacroInputs {
  return {
    globalAssetBase: 900, // trillions
    adoptionStart: 0.03,
    adoptionEnd: 0.18,
    inflationDrift: 0.025,
    productivityBoost: 0.02
  };
}

export function createDefaultModelInputs(kind: ModelKind): ModelInputs {
  switch (kind) {
    case 'individual':
      return { allocation: 0.15, treasuryShare: 0, cashflows: 120000, leverage: 0 };
    case 'corporate':
      return { allocation: 0.05, treasuryShare: 0.12, cashflows: 60000000, leverage: 0.4 };
    case 'institution':
      return { allocation: 0.08, treasuryShare: 0.2, cashflows: 450000000, leverage: 0.25 };
    case 'nation':
      return { allocation: 0.05, treasuryShare: 0.35, cashflows: 1200000000, leverage: 0.1 };
  }
}

export function generateBTCProjection(inputs: BTCInputs): YearlyBTCRow[] {
  const rows: YearlyBTCRow[] = [];
  let arr = inputs.arrStart;
  let price = inputs.currentPrice;
  for (let i = 0; i < HORIZON; i++) {
    const year = START_YEAR + i;
    if (year > inputs.steadyStateYear) {
      arr = Math.max(inputs.steadyStateArr, arr - inputs.arrDecay * 0.25);
    } else if (i > 0) {
      arr = Math.max(inputs.steadyStateArr, arr - inputs.arrDecay);
    }
    price = price * (1 + arr);
    const supply = 21000000 - Math.min(i * 350000, 21000000 * 0.1);
    const marketCap = price * supply;
    rows.push({ year, arr, price, marketCap });
  }
  return rows;
}

export function deriveMacroOutputs(inputs: MacroInputs, btcRows: YearlyBTCRow[]): MacroOutputs {
  const gdp: number[] = [];
  const adoptionShare: number[] = [];
  const liquidity: number[] = [];
  const baseGDP = inputs.globalAssetBase;
  const adoptionRange = inputs.adoptionEnd - inputs.adoptionStart;
  btcRows.forEach((row, index) => {
    const yearsFromStart = index;
    const gdpValue = baseGDP * Math.pow(1 + inputs.productivityBoost, yearsFromStart) * (1 + inputs.inflationDrift);
    const adoption = inputs.adoptionStart + (adoptionRange * index) / (btcRows.length - 1);
    const liquidityValue = row.marketCap * adoption;
    gdp.push(gdpValue);
    adoptionShare.push(adoption);
    liquidity.push(liquidityValue);
  });
  return { gdp, adoptionShare, liquidity };
}

export function deriveModelOutputs(kind: ModelKind, btcRows: YearlyBTCRow[], inputs: ModelInputs): ModelOutputs {
  const holdings: number[] = [];
  const coverage: number[] = [];
  let btcHeld = inputs.allocation * inputs.cashflows;
  btcRows.forEach((row) => {
    btcHeld = btcHeld * (1 + inputs.treasuryShare) + inputs.cashflows * inputs.allocation;
    const coverageRatio = (btcHeld * row.price) / (inputs.cashflows * (1 + inputs.leverage));
    holdings.push(btcHeld);
    coverage.push(coverageRatio);
  });
  const terminalValue = btcHeld * btcRows[btcRows.length - 1]?.price;
  return { terminalValue, btcHoldings: holdings, cashflowCoverage: coverage };
}

export function createScenarioSummary(name: string, model: ModelKind): ScenarioSummary {
  const btcAssumptions = createDefaultBTCInputs();
  const macroAssumptions = createDefaultMacroInputs();
  const now = new Date().toISOString();
  return {
    id: nanoid(),
    name,
    createdAt: now,
    updatedAt: now,
    status: 'draft',
    model,
    btcAssumptions,
    macroAssumptions
  };
}

export function hydrateScenarioDetail(summary: ScenarioSummary): ScenarioDetail {
  const btcOutputs = generateBTCProjection(summary.btcAssumptions);
  const macroOutputs = deriveMacroOutputs(summary.macroAssumptions, btcOutputs);
  const modelInputs: Record<ModelKind, ModelInputs> = {
    individual: createDefaultModelInputs('individual'),
    corporate: createDefaultModelInputs('corporate'),
    institution: createDefaultModelInputs('institution'),
    nation: createDefaultModelInputs('nation')
  };
  const modelOutputs: Record<ModelKind, ModelOutputs> = {
    individual: deriveModelOutputs('individual', btcOutputs, modelInputs.individual),
    corporate: deriveModelOutputs('corporate', btcOutputs, modelInputs.corporate),
    institution: deriveModelOutputs('institution', btcOutputs, modelInputs.institution),
    nation: deriveModelOutputs('nation', btcOutputs, modelInputs.nation)
  };
  return {
    ...summary,
    btcOutputs,
    macroOutputs,
    modelOutputs,
    modelInputs
  };
}

export function formatCurrency(value: number, options: Intl.NumberFormatOptions = {}): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    notation: 'compact',
    ...options
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
}
