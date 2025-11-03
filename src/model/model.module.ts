import { Module } from '@nestjs/common';
import { PricingModule } from '../pricing/pricing.module';
import { ScenarioModule } from '../scenario/scenario.module';
import { ModelController } from './model.controller';
import { ModelResolver } from './model.resolver';
import { ModelService } from './model.service';

@Module({
  imports: [ScenarioModule, PricingModule],
  controllers: [ModelController],
  providers: [ModelService, ModelResolver],
})
export class ModelModule {}
