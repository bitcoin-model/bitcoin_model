export type ScenarioStatus = 'draft' | 'in-progress' | 'complete';

export type ModelKind = 'individual' | 'corporate' | 'institution' | 'nation';

export interface ScenarioSummary {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: ScenarioStatus;
  model: ModelKind;
  btcAssumptions: BTCInputs;
  macroAssumptions: MacroInputs;
}

export interface BTCInputs {
  currentPrice: number;
  arrStart: number;
  arrDecay: number;
  steadyStateArr: number;
  steadyStateYear: number;
}

export interface MacroInputs {
  globalAssetBase: number;
  adoptionStart: number;
  adoptionEnd: number;
  inflationDrift: number;
  productivityBoost: number;
}

export interface ModelInputs {
  allocation: number;
  treasuryShare: number;
  cashflows: number;
  leverage: number;
}

export interface ScenarioDetail extends ScenarioSummary {
  btcOutputs: Array<YearlyBTCRow>;
  macroOutputs: MacroOutputs;
  modelOutputs: Record<ModelKind, ModelOutputs>;
  modelInputs: Record<ModelKind, ModelInputs>;
}

export interface YearlyBTCRow {
  year: number;
  arr: number;
  price: number;
  marketCap: number;
}

export interface MacroOutputs {
  gdp: number[];
  adoptionShare: number[];
  liquidity: number[];
}

export interface ModelOutputs {
  terminalValue: number;
  btcHoldings: number[];
  cashflowCoverage: number[];
}
