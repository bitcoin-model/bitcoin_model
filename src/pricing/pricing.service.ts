import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import fetch from 'node-fetch';

interface ExternalPriceResponse {
  priceUsd: number;
  asOf: string;
  source: string;
}

@Injectable()
export class PricingService {
  private readonly logger = new Logger(PricingService.name);

  constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) {}

  async getLatestPrice() {
    return this.prisma.btcPrice.findFirst({ orderBy: { asOf: 'desc' } });
  }

  async syncLatestPrice(): Promise<void> {
    const externalPrice = await this.fetchExternalPrice();
    if (!externalPrice) {
      this.logger.warn('No price returned from external provider');
      return;
    }

    await this.prisma.btcPrice.upsert({
      where: { asOf: new Date(externalPrice.asOf) },
      update: {
        priceUsd: externalPrice.priceUsd.toString(),
        source: externalPrice.source,
      },
      create: {
        priceUsd: externalPrice.priceUsd.toString(),
        source: externalPrice.source,
        asOf: new Date(externalPrice.asOf),
      },
    });
  }

  private async fetchExternalPrice(): Promise<ExternalPriceResponse | null> {
    const endpoint = this.configService.get<string>('BTC_PRICE_API', 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json');

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        this.logger.error(`Failed to fetch BTC price: ${response.status}`);
        return null;
      }
      const data = (await response.json()) as any;

      const price = Number(data?.bpi?.USD?.rate_float ?? data?.priceUsd ?? data?.price);
      if (!price || Number.isNaN(price)) {
        this.logger.error('Unable to parse price from response');
        return null;
      }

      const timestamp = data?.time?.updatedISO ?? data?.asOf ?? new Date().toISOString();
      const source = data?.chartName ?? data?.source ?? 'coindesk';

      return {
        priceUsd: price,
        asOf: timestamp,
        source,
      };
    } catch (error) {
      this.logger.error('Error fetching BTC price', error as Error);
      return null;
    }
  }
}
