import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as XLSX from 'xlsx';

const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(ROOT_DIR, '..');
const WORKBOOK_PATH = path.resolve(PROJECT_ROOT, 'Bitcoin24 v1.0.xlsm');
const OUTPUT_DIR = path.resolve(PROJECT_ROOT, 'packages/models/fixtures');

const workbook = XLSX.readFile(WORKBOOK_PATH, { cellNF: false, cellStyles: false, raw: true });

function getSheet(name: string) {
  const sheet = workbook.Sheets[name];
  if (!sheet) {
    throw new Error(`Sheet ${name} not found in workbook`);
  }
  return sheet;
}

function getCellValue(sheet: XLSX.WorkSheet, cell: string): unknown {
  const ref = sheet[cell];
  if (!ref) {
    return null;
  }
  return ref.v ?? null;
}

function ensureNumber(value: unknown, cell: string): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`Expected numeric value at ${cell}, received ${String(value)}`);
  }
  return value;
}

function columnToIndex(column: string): number {
  return [...column].reduce((acc, char) => acc * 26 + (char.charCodeAt(0) - 64), 0);
}

function indexToColumn(index: number): string {
  let current = index;
  let result = '';
  while (current > 0) {
    const remainder = (current - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    current = Math.floor((current - 1) / 26);
  }
  return result;
}

function generateColumnRange(start: string, end: string): string[] {
  const startIndex = columnToIndex(start);
  const endIndex = columnToIndex(end);
  const columns: string[] = [];
  for (let index = startIndex; index <= endIndex; index += 1) {
    columns.push(indexToColumn(index));
  }
  return columns;
}

function extractScenarioTable(sheetName: string): Array<{ id: string; label: string; netWorth: number; cagr: number; btc: number }> {
  const sheet = getSheet(sheetName);
  const range = XLSX.utils.decode_range(sheet['!ref'] ?? 'A1');
  let startRow: number | null = null;

  for (let row = range.s.r; row <= range.e.r; row += 1) {
    const label = getCellValue(sheet, `B${row + 1}`);
    if (label === 'Scenario Comparison') {
      startRow = row + 2;
      break;
    }
  }

  if (startRow === null) {
    throw new Error(`Unable to locate scenario comparison table in sheet ${sheetName}`);
  }

  const scenarios: Array<{ id: string; label: string; netWorth: number; cagr: number; btc: number }> = [];
  let currentRow = startRow;

  while (true) {
    const label = getCellValue(sheet, `B${currentRow}`);
    if (typeof label !== 'string' || label.trim().length === 0) {
      break;
    }

    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    const netWorth = ensureNumber(getCellValue(sheet, `C${currentRow}`), `C${currentRow}`);
    const cagr = ensureNumber(getCellValue(sheet, `D${currentRow}`), `D${currentRow}`);
    const btc = ensureNumber(getCellValue(sheet, `E${currentRow}`), `E${currentRow}`);

    scenarios.push({ id, label, netWorth, cagr, btc });
    currentRow += 1;
  }

  return scenarios;
}

function buildTimeSeries() {
  const sheet = getSheet('BTC');
  const series: Array<{ year: number; priceMillion: number; arr: number | null }> = [];
  for (let row = 13; row <= 35; row += 1) {
    const year = getCellValue(sheet, `B${row}`);
    if (typeof year !== 'number') {
      continue;
    }
    const price = ensureNumber(getCellValue(sheet, `C${row}`), `C${row}`);
    const arrValue = getCellValue(sheet, `D${row}`);
    series.push({
      year,
      priceMillion: price,
      arr: typeof arrValue === 'number' ? arrValue : null
    });
  }
  return { btc: { base: series } };
}

function buildBtcFixture() {
  const sheet = getSheet('BTC');
  const macroSheet = getSheet('Macro');
  const columns = generateColumnRange('C', 'X');

  const assumptions = {
    base: {
      arrStart: ensureNumber(getCellValue(sheet, 'D7'), 'D7'),
      arrReduction: ensureNumber(getCellValue(sheet, 'D8'), 'D8'),
      steadyStateArr: ensureNumber(getCellValue(sheet, 'D9'), 'D9'),
      startPriceK: ensureNumber(getCellValue(sheet, 'D4'), 'D4')
    },
    bear: {
      arrStart: ensureNumber(getCellValue(sheet, 'E7'), 'E7'),
      arrReduction: ensureNumber(getCellValue(sheet, 'E8'), 'E8'),
      steadyStateArr: ensureNumber(getCellValue(sheet, 'E9'), 'E9'),
      startPriceK: ensureNumber(getCellValue(sheet, 'D4'), 'D4')
    },
    bull: {
      arrStart: ensureNumber(getCellValue(sheet, 'G7'), 'G7'),
      arrReduction: ensureNumber(getCellValue(sheet, 'G8'), 'G8'),
      steadyStateArr: ensureNumber(getCellValue(sheet, 'G9'), 'G9'),
      startPriceK: ensureNumber(getCellValue(sheet, 'D4'), 'D4')
    }
  } as const;

  const summary = {
    base: {
      price2045Million: ensureNumber(getCellValue(sheet, 'K6'), 'K6'),
      marketCap2045Trillion: ensureNumber(getCellValue(sheet, 'K7'), 'K7'),
      twentyOneYearArr: ensureNumber(getCellValue(sheet, 'K8'), 'K8'),
      assetShare: ensureNumber(getCellValue(sheet, 'K9'), 'K9')
    },
    bear: {
      price2045Million: ensureNumber(getCellValue(sheet, 'L6'), 'L6'),
      marketCap2045Trillion: ensureNumber(getCellValue(sheet, 'L7'), 'L7'),
      twentyOneYearArr: ensureNumber(getCellValue(sheet, 'L8'), 'L8'),
      assetShare: ensureNumber(getCellValue(sheet, 'L9'), 'L9')
    },
    bull: {
      price2045Million: ensureNumber(getCellValue(sheet, 'N6'), 'N6'),
      marketCap2045Trillion: ensureNumber(getCellValue(sheet, 'N7'), 'N7'),
      twentyOneYearArr: ensureNumber(getCellValue(sheet, 'N8'), 'N8'),
      assetShare: ensureNumber(getCellValue(sheet, 'N9'), 'N9')
    }
  } as const;

  const supplyMillions = columns.map((column) => ({
    year: ensureNumber(getCellValue(macroSheet, `${column}17`), `${column}17`),
    supply: ensureNumber(getCellValue(macroSheet, `${column}21`), `${column}21`)
  }));

  return { assumptions, summary, supplyMillions };
}

function readSeries(sheet: XLSX.WorkSheet, columns: string[], row: number, allowNull = false) {
  return columns.map((column) => {
    const value = getCellValue(sheet, `${column}${row}`);
    if (value === null) {
      if (allowNull) {
        return null;
      }
      throw new Error(`Missing value at ${column}${row}`);
    }
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new Error(`Expected numeric value at ${column}${row}, received ${String(value)}`);
    }
    return value;
  });
}

function buildMacroFixture() {
  const sheet = getSheet('Macro');
  const columns = generateColumnRange('C', 'X');
  const years = columns.map((column) => ensureNumber(getCellValue(sheet, `${column}17`), `${column}17`));

  const assetValues = {
    BTC: readSeries(sheet, columns, 22),
    Gold: readSeries(sheet, columns, 23),
    Art: readSeries(sheet, columns, 24),
    Equity: readSeries(sheet, columns, 25),
    RealEstate: readSeries(sheet, columns, 26),
    Bonds: readSeries(sheet, columns, 27),
    Currency: readSeries(sheet, columns, 28)
  } as const;

  const totals = {
    nominal: readSeries(sheet, columns, 29),
    nominalGrowth: readSeries(sheet, columns, 30, true),
    real: readSeries(sheet, columns, 31),
    realGrowth: readSeries(sheet, columns, 32, true),
    realCpi2: readSeries(sheet, columns, 33),
    realCpi2Growth: readSeries(sheet, columns, 34, true)
  };

  const inefficiency = {
    total: readSeries(sheet, columns, 37),
    shareOfAssets: readSeries(sheet, columns, 38)
  };

  return { years, assetValues, totals, inefficiency };
}

function main() {
  const timeSeries = buildTimeSeries();
  const btc = buildBtcFixture();
  const macro = buildMacroFixture();
  const micro = {
    individual: extractScenarioTable('Individual'),
    corporate: extractScenarioTable('Corporate'),
    institution: extractScenarioTable('Institution')
  };
  const nation = {
    indebted: extractScenarioTable('Indebted Nation'),
    wealthy: extractScenarioTable('Wealthy Nation'),
    united_states: extractScenarioTable('United States')
  };

  mkdirSync(OUTPUT_DIR, { recursive: true });

  writeFileSync(path.join(OUTPUT_DIR, 'time-series.json'), JSON.stringify(timeSeries, null, 2));
  writeFileSync(path.join(OUTPUT_DIR, 'btc.json'), JSON.stringify(btc, null, 2));
  writeFileSync(path.join(OUTPUT_DIR, 'macro.json'), JSON.stringify(macro, null, 2));
  writeFileSync(path.join(OUTPUT_DIR, 'micro.json'), JSON.stringify(micro, null, 2));
  writeFileSync(path.join(OUTPUT_DIR, 'nation.json'), JSON.stringify(nation, null, 2));

  // eslint-disable-next-line no-console
  console.log('Workbook ingested successfully.');
}

main();
