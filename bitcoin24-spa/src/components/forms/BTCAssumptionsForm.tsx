'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BTCAssumptions } from '@/types/assumptions';
import { btcAssumptionsSchema } from '@/lib/schemas';
import { useAssumptions } from '@/lib/hooks';
import { RotateCcw } from 'lucide-react';

export function BTCAssumptionsForm() {
  const { btc, updateBTC, resetBTC } = useAssumptions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<BTCAssumptions>({
    resolver: zodResolver(btcAssumptionsSchema),
    defaultValues: btc,
  });

  const onSubmit = (data: BTCAssumptions) => {
    updateBTC(data);
  };

  const handleReset = () => {
    resetBTC();
    reset();
  };

  const adoptionCurve = watch('adoptionCurve');

  return (
    <Card>
      <CardHeader>
        <CardTitle>比特幣假設</CardTitle>
        <CardDescription>設定比特幣價格預測參數</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 當前價格 */}
          <div className="space-y-2">
            <Label htmlFor="currentPrice">當前價格 (USD)</Label>
            <Input
              id="currentPrice"
              type="number"
              step="100"
              {...register('currentPrice', { valueAsNumber: true })}
            />
            {errors.currentPrice && (
              <p className="text-sm text-red-500">{errors.currentPrice.message}</p>
            )}
          </div>

          {/* 採用曲線 */}
          <div className="space-y-2">
            <Label htmlFor="adoptionCurve">採用曲線模型</Label>
            <Select
              value={adoptionCurve}
              onValueChange={(value) =>
                setValue('adoptionCurve', value as 'linear' | 'exponential' | 's-curve')
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">線性增長</SelectItem>
                <SelectItem value="exponential">指數增長</SelectItem>
                <SelectItem value="s-curve">S曲線（推薦）</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 最大採用率 */}
          <div className="space-y-2">
            <Label htmlFor="maxAdoptionRate">最大採用率 (%)</Label>
            <Input
              id="maxAdoptionRate"
              type="number"
              step="0.1"
              {...register('maxAdoptionRate', { valueAsNumber: true })}
            />
            {errors.maxAdoptionRate && (
              <p className="text-sm text-red-500">{errors.maxAdoptionRate.message}</p>
            )}
          </div>

          {/* 機構採用率 */}
          <div className="space-y-2">
            <Label htmlFor="institutionalAdoption">機構採用率 (%)</Label>
            <Input
              id="institutionalAdoption"
              type="number"
              step="0.1"
              {...register('institutionalAdoption', { valueAsNumber: true })}
            />
            {errors.institutionalAdoption && (
              <p className="text-sm text-red-500">{errors.institutionalAdoption.message}</p>
            )}
          </div>

          {/* 零售採用率 */}
          <div className="space-y-2">
            <Label htmlFor="retailAdoption">零售採用率 (%)</Label>
            <Input
              id="retailAdoption"
              type="number"
              step="0.1"
              {...register('retailAdoption', { valueAsNumber: true })}
            />
            {errors.retailAdoption && (
              <p className="text-sm text-red-500">{errors.retailAdoption.message}</p>
            )}
          </div>

          {/* 價格下限 */}
          <div className="space-y-2">
            <Label htmlFor="priceFloor">價格下限 (USD)</Label>
            <Input
              id="priceFloor"
              type="number"
              step="1000"
              {...register('priceFloor', { valueAsNumber: true })}
            />
            {errors.priceFloor && (
              <p className="text-sm text-red-500">{errors.priceFloor.message}</p>
            )}
          </div>

          {/* 價格上限 */}
          <div className="space-y-2">
            <Label htmlFor="priceCeiling">價格上限 (USD)</Label>
            <Input
              id="priceCeiling"
              type="number"
              step="100000"
              {...register('priceCeiling', { valueAsNumber: true })}
            />
            {errors.priceCeiling && (
              <p className="text-sm text-red-500">{errors.priceCeiling.message}</p>
            )}
          </div>

          {/* S2F 倍數 */}
          <div className="space-y-2">
            <Label htmlFor="s2fMultiplier">S2F 模型倍數</Label>
            <Input
              id="s2fMultiplier"
              type="number"
              step="0.1"
              {...register('s2fMultiplier', { valueAsNumber: true })}
            />
            {errors.s2fMultiplier && (
              <p className="text-sm text-red-500">{errors.s2fMultiplier.message}</p>
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

