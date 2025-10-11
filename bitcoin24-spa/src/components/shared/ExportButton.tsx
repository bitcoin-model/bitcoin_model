'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { useResultsStore } from '@/lib/store';

export function ExportButton() {
  const { exportCSV, exportJSON } = useResultsStore();

  const handleExportCSV = () => {
    const csvData = exportCSV();
    if (!csvData) {
      alert('沒有可匯出的資料');
      return;
    }

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bitcoin24-forecast-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const jsonData = exportJSON();
    if (!jsonData) {
      alert('沒有可匯出的資料');
      return;
    }

    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bitcoin24-forecast-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          匯出資料
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleExportCSV} className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4" />
          匯出為 CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportJSON} className="flex items-center gap-2">
          <FileJson className="w-4 h-4" />
          匯出為 JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

