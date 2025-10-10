'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MacroAssumptions } from '@/types/assumptions';
import { macroAssumptionsSchema } from '@/lib/schemas';
import { useAssumptions } from '@/lib/hooks';
import { RotateCcw } from 'lucide-react';

export function MacroAssumptionsForm() {
  const { macro, updateMacro, resetMacro } = useAssumptions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MacroAssumptions>({
    resolver: zodResolver(macroAssumptionsSchema),
    defaultValues: macro,
  });

  const onSubmit = (data: MacroAssumptions) => {
    updateMacro(data);
  };

  const handleReset = () => {
    resetMacro();
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>宏觀經濟假設</CardTitle>
        <CardDescription>設定未來 21 年的宏觀經濟參數</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 起始年份 */}
          <div className="space-y-2">
            <Label htmlFor="startYear">起始年份</Label>
            <Input
              id="startYear"
              type="number"
              {...register('startYear', { valueAsNumber: true })}
            />
            {errors.startYear && (
              <p className="text-sm text-red-500">{errors.startYear.message}</p>
            )}
          </div>

          {/* 預測年數 */}
          <div className="space-y-2">
            <Label htmlFor="forecastYears">預測年數</Label>
            <Input
              id="forecastYears"
              type="number"
              {...register('forecastYears', { valueAsNumber: true })}
            />
            {errors.forecastYears && (
              <p className="text-sm text-red-500">{errors.forecastYears.message}</p>
            )}
          </div>

          {/* 通膨率 */}
          <div className="space-y-2">
            <Label htmlFor="inflationRate">通膨率 (%)</Label>
            <Input
              id="inflationRate"
              type="number"
              step="0.1"
              {...register('inflationRate', { valueAsNumber: true })}
            />
            {errors.inflationRate && (
              <p className="text-sm text-red-500">{errors.inflationRate.message}</p>
            )}
          </div>

          {/* 股市報酬率 */}
          <div className="space-y-2">
            <Label htmlFor="stockMarketReturn">股市年報酬率 (%)</Label>
            <Input
              id="stockMarketReturn"
              type="number"
              step="0.1"
              {...register('stockMarketReturn', { valueAsNumber: true })}
            />
            {errors.stockMarketReturn && (
              <p className="text-sm text-red-500">{errors.stockMarketReturn.message}</p>
            )}
          </div>

          {/* 債券報酬率 */}
          <div className="space-y-2">
            <Label htmlFor="bondReturn">債券年報酬率 (%)</Label>
            <Input
              id="bondReturn"
              type="number"
              step="0.1"
              {...register('bondReturn', { valueAsNumber: true })}
            />
            {errors.bondReturn && (
              <p className="text-sm text-red-500">{errors.bondReturn.message}</p>
            )}
          </div>

          {/* 房地產報酬率 */}
          <div className="space-y-2">
            <Label htmlFor="realEstateReturn">房地產年報酬率 (%)</Label>
            <Input
              id="realEstateReturn"
              type="number"
              step="0.1"
              {...register('realEstateReturn', { valueAsNumber: true })}
            />
            {errors.realEstateReturn && (
              <p className="text-sm text-red-500">{errors.realEstateReturn.message}</p>
            )}
          </div>

          {/* 現金報酬率 */}
          <div className="space-y-2">
            <Label htmlFor="cashReturn">現金年報酬率 (%)</Label>
            <Input
              id="cashReturn"
              type="number"
              step="0.1"
              {...register('cashReturn', { valueAsNumber: true })}
            />
            {errors.cashReturn && (
              <p className="text-sm text-red-500">{errors.cashReturn.message}</p>
            )}
          </div>

          {/* 按鈕 */}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              更新假設
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              重設
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

