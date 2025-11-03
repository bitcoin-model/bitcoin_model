import timeSeriesFixture from '../../fixtures/time-series.json' assert { type: 'json' };
import { z, type Infer } from '../validation/zod';

const TimeSeriesPointSchema = z.object({
  year: z.number(),
  priceMillion: z.number(),
  arr: z.number().nullable()
});

const TimeSeriesFixtureSchema = z.object({
  btc: z.object({
    base: z.array(TimeSeriesPointSchema)
  })
});

const ParsedTimeSeriesFixture = TimeSeriesFixtureSchema.parse(timeSeriesFixture);

const GrowthSeriesInputSchema = z.object({
  startYear: z.number(),
  endYear: z.number(),
  initialValue: z.number(),
  arrStart: z.number(),
  arrReduction: z.number(),
  steadyStateArr: z.number()
});

export type TimeSeriesPoint = Infer<typeof TimeSeriesPointSchema>;
export type GrowthSeriesInput = Infer<typeof GrowthSeriesInputSchema>;

export function generateGrowthSeries(input: GrowthSeriesInput): TimeSeriesPoint[] {
  const { startYear, endYear, initialValue, arrStart, arrReduction, steadyStateArr } = GrowthSeriesInputSchema.parse(input);

  if (endYear < startYear) {
    throw new RangeError('`endYear` must be greater than or equal to `startYear`.');
  }

  const series: TimeSeriesPoint[] = [];
  let currentValue = initialValue;
  let currentArr = arrStart;

  for (let year = startYear; year <= endYear; year += 1) {
    if (year === startYear) {
      series.push({ year, priceMillion: currentValue, arr: null });
      continue;
    }

    currentValue = currentValue * (1 + currentArr);
    series.push({ year, priceMillion: currentValue, arr: currentArr });
    currentArr = Math.max(currentArr - arrReduction, steadyStateArr);
  }

  return series;
}

export function getBtcBaseSeries(): TimeSeriesPoint[] {
  return ParsedTimeSeriesFixture.btc.base;
}
