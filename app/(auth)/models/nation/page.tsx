"use client";

import { useRouter } from 'next/navigation';
import { FlowShell } from '@/src/components/flow/FlowShell';
import { ModelDetail } from '@/src/components/models/ModelDetail';
import { useGuidedFlowStore } from '@/src/state/guidedFlowStore';

export default function NationModelPage() {
  const markStep = useGuidedFlowStore((state) => state.markStep);
  const router = useRouter();

  return (
    <FlowShell
      step="model"
      onBack={() => {
        markStep('model', { status: 'draft' });
        router.push('/models/macro');
      }}
      onNext={() => {
        markStep('model', { status: 'complete' });
        router.push('/home');
      }}
      backLabel="Back: Macro"
      nextLabel="Finish & Save"
    >
      <ModelDetail model="nation" />
    </FlowShell>
  );
}
