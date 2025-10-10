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
import { InvestorProfile, InvestorType } from '@/types/investor';
import { investorProfileSchema } from '@/lib/schemas';
import { useAssumptions } from '@/lib/hooks';
import { RotateCcw, User, Building2, Building, Globe } from 'lucide-react';

const INVESTOR_ICONS = {
  individual: User,
  corporate: Building2,
  institution: Building,
  'nation-state': Globe,
};

export function InvestorProfileForm() {
  const { investor, updateInvestor, setInvestorType, resetInvestor } = useAssumptions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<InvestorProfile>({
    resolver: zodResolver(investorProfileSchema),
    defaultValues: investor,
  });

  const onSubmit = (data: InvestorProfile) => {
    updateInvestor(data);
  };

  const handleReset = () => {
    resetInvestor();
    reset();
  };

  const investorType = watch('type');
  const riskTolerance = watch('riskTolerance');
  const Icon = INVESTOR_ICONS[investorType];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          投資者檔案
        </CardTitle>
        <CardDescription>設定您的投資者資訊與風險承受度</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 投資者類型 */}
          <div className="space-y-2">
            <Label htmlFor="type">投資者類型</Label>
            <Select
              value={investorType}
              onValueChange={(value) => {
                setInvestorType(value as InvestorType);
                setValue('type', value as InvestorType);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">個人投資者</SelectItem>
                <SelectItem value="corporate">企業</SelectItem>
                <SelectItem value="institution">機構</SelectItem>
                <SelectItem value="nation-state">國家</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 名稱 */}
          <div className="space-y-2">
            <Label htmlFor="name">名稱</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* 初始資本 */}
          <div className="space-y-2">
            <Label htmlFor="initialCapital">初始資本 (USD)</Label>
            <Input
              id="initialCapital"
              type="number"
              step="1000"
              {...register('initialCapital', { valueAsNumber: true })}
            />
            {errors.initialCapital && (
              <p className="text-sm text-red-500">{errors.initialCapital.message}</p>
            )}
          </div>

          {/* 年度投入 */}
          <div className="space-y-2">
            <Label htmlFor="annualContribution">年度投入 (USD)</Label>
            <Input
              id="annualContribution"
              type="number"
              step="100"
              {...register('annualContribution', { valueAsNumber: true })}
            />
            {errors.annualContribution && (
              <p className="text-sm text-red-500">{errors.annualContribution.message}</p>
            )}
          </div>

          {/* 投入增長率 */}
          <div className="space-y-2">
            <Label htmlFor="contributionGrowthRate">年度投入增長率 (%)</Label>
            <Input
              id="contributionGrowthRate"
              type="number"
              step="0.1"
              {...register('contributionGrowthRate', { valueAsNumber: true })}
            />
            {errors.contributionGrowthRate && (
              <p className="text-sm text-red-500">{errors.contributionGrowthRate.message}</p>
            )}
          </div>

          {/* 稅率 */}
          <div className="space-y-2">
            <Label htmlFor="taxRate">資本利得稅率 (%)</Label>
            <Input
              id="taxRate"
              type="number"
              step="0.1"
              {...register('taxRate', { valueAsNumber: true })}
            />
            {errors.taxRate && (
              <p className="text-sm text-red-500">{errors.taxRate.message}</p>
            )}
          </div>

          {/* 風險承受度 */}
          <div className="space-y-2">
            <Label htmlFor="riskTolerance">風險承受度</Label>
            <Select
              value={riskTolerance}
              onValueChange={(value) => setValue('riskTolerance', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">低</SelectItem>
                <SelectItem value="medium">中</SelectItem>
                <SelectItem value="high">高</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 按鈕 */}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              更新檔案
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

