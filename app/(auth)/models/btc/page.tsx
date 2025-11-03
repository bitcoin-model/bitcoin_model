"use client";

import { useRouter } from 'next/navigation';
import { FlowShell } from '@/src/components/flow/FlowShell';
import { BTCInputsPanel } from '@/src/components/models/BTCInputsPanel';
import { BTCResults } from '@/src/components/models/BTCResults';
import { useGuidedFlowStore } from '@/src/state/guidedFlowStore';

export default function BTCModelPage() {
  const markStep = useGuidedFlowStore((state) => state.markStep);
  const router = useRouter();

  return (
    <FlowShell
      step="btc"
      onBack={() => {
        markStep('btc', { status: 'draft' });
        router.push('/home');
      }}
      onNext={() => {
        markStep('btc', { status: 'complete' });
        router.push('/models/macro');
      }}
      nextLabel="Next: Macro"
    >
      <BTCInputsPanel />
      <BTCResults />
    </FlowShell>
  );
}
