import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PricingService } from './pricing.service';

@Injectable()
export class PriceSyncService implements OnModuleInit {
  private readonly logger = new Logger(PriceSyncService.name);

  constructor(private readonly pricingService: PricingService) {}

  async onModuleInit() {
    await this.syncPrices('startup');
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    await this.syncPrices('scheduled');
  }

  private async syncPrices(trigger: 'startup' | 'scheduled') {
    this.logger.debug(`Triggering BTC price sync (${trigger})`);
    await this.pricingService.syncLatestPrice();
  }
}
