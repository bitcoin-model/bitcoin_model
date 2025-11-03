import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ExecuteModelDto } from './dto/execute-model.dto';
import { ModelService } from './model.service';

@Controller('model')
@UseGuards(JwtAuthGuard)
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post('execute')
  execute(@CurrentUser() user: any, @Body() dto: ExecuteModelDto) {
    return this.modelService.executeScenario(user.id, dto.scenarioId);
  }
}
