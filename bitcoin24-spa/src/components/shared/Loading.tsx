import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  text?: string;
  className?: string;
}

export function Loading({ text = '載入中...', className }: LoadingProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-12', className)}>
      <Loader2 className="w-12 h-12 animate-spin text-bitcoin-500" />
      {text && <p className="text-muted-foreground">{text}</p>}
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Loading />
    </div>
  );
}

