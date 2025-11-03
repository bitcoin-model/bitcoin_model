import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { BtcPriceModel } from './models/btc-price.model';
import { PricingService } from './pricing.service';

@Resolver(() => BtcPriceModel)
@UseGuards(JwtAuthGuard)
export class PricingResolver {
  constructor(private readonly pricingService: PricingService) {}

  @Query(() => BtcPriceModel, { nullable: true })
  latestBtcPrice() {
    return this.pricingService.getLatestPrice();
  }
}
