import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ScenarioController } from './scenario.controller';
import { ScenarioResolver } from './scenario.resolver';
import { ScenarioService } from './scenario.service';

@Module({
  imports: [PrismaModule],
  controllers: [ScenarioController],
  providers: [ScenarioService, ScenarioResolver],
  exports: [ScenarioService],
})
export class ScenarioModule {}
