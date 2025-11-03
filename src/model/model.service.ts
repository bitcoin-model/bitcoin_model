import { Injectable } from '@nestjs/common';
import { PricingService } from '../pricing/pricing.service';
import { ScenarioService } from '../scenario/scenario.service';

@Injectable()
export class ModelService {
  constructor(
    private readonly scenarioService: ScenarioService,
    private readonly pricingService: PricingService,
  ) {}

  async executeScenario(ownerId: number, scenarioId: number) {
    const scenario = await this.scenarioService.findOne(ownerId, scenarioId);
    const latestPrice = await this.pricingService.getLatestPrice();

    const targetPrice = Number((scenario.parameters as any)?.targetPrice ?? 0);
    const latestPriceValue = latestPrice ? Number(latestPrice.priceUsd) : null;
    const delta = targetPrice && latestPriceValue ? targetPrice - latestPriceValue : null;

    return {
      scenario,
      latestPrice,
      summary: {
        targetPrice: targetPrice || null,
        latestPrice: latestPriceValue,
        differenceToTarget: delta,
        generatedAt: new Date().toISOString(),
      },
    };
  }
}
