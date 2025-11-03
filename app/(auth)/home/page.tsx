import { HomeHero } from '@/src/components/home/HomeHero';
import { GuidedFlowBanner } from '@/src/components/home/GuidedFlowBanner';
import { LivePriceBanner } from '@/src/components/home/LivePriceBanner';
import { ModelCatalog } from '@/src/components/home/ModelCatalog';
import { ScenarioLibrary } from '@/src/components/home/ScenarioLibrary';

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HomeHero />
      <GuidedFlowBanner />
      <LivePriceBanner />
      <ModelCatalog />
      <ScenarioLibrary />
    </div>
  );
}
