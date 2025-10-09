'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAssumptions } from '@/lib/hooks';
import { RotateCcw, Save, Upload } from 'lucide-react';

export function QuickActions() {
  const { reset } = useAssumptions();

  const handleSaveScenario = () => {
    // TODO: 實現場景儲存功能
    alert('場景已儲存到本地儲存');
  };

  const handleLoadScenario = () => {
    // TODO: 實現場景載入功能
    alert('功能開發中');
  };

  const handleResetAll = () => {
    if (confirm('確定要重設所有假設為預設值嗎？')) {
      reset();
      alert('已重設為預設值');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>快速操作</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleSaveScenario} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          儲存場景
        </Button>
        <Button variant="outline" onClick={handleLoadScenario} className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          載入場景
        </Button>
        <Button
          variant="outline"
          onClick={handleResetAll}
          className="flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <RotateCcw className="w-4 h-4" />
          重設全部
        </Button>
      </CardContent>
    </Card>
  );
}

