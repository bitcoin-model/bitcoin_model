import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { PriceSyncService } from './price-sync.service';
import { PricingController } from './pricing.controller';
import { PricingResolver } from './pricing.resolver';
import { PricingService } from './pricing.service';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [PricingController],
  providers: [PricingService, PricingResolver, PriceSyncService],
  exports: [PricingService],
})
export class PricingModule {}
