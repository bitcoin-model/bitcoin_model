"use client";

import { useRouter } from 'next/navigation';
import { FlowShell } from '@/src/components/flow/FlowShell';
import { MacroPanel } from '@/src/components/models/MacroPanel';
import { MacroResults } from '@/src/components/models/MacroResults';
import { useGuidedFlowStore } from '@/src/state/guidedFlowStore';

export default function MacroModelPage() {
  const markStep = useGuidedFlowStore((state) => state.markStep);
  const router = useRouter();

  return (
    <FlowShell
      step="macro"
      onBack={() => {
        markStep('macro', { status: 'draft' });
        router.push('/models/btc');
      }}
      onNext={() => {
        markStep('macro', { status: 'complete' });
        router.push('/models/individual');
      }}
      backLabel="Back: BTC"
      nextLabel="Next: Model"
    >
      <MacroPanel />
      <MacroResults />
    </FlowShell>
  );
}
