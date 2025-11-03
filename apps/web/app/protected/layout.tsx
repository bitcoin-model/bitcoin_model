import { ReactNode } from 'react';
import { AppShell } from '@bitcoin24/ui';
import { AuthGuard } from '../../src/components/AuthGuard';
import { ScenarioIndicator } from '../../src/components/ScenarioIndicator';
import { PricingTicker } from '../../src/components/PricingTicker';
import { PageTransition } from '../../src/components/PageTransition';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <AppShell header={<PricingTicker />} sidebar={<ScenarioIndicator />}>
        <PageTransition>{children}</PageTransition>
      </AppShell>
    </AuthGuard>
  );
}
