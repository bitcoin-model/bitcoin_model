import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ExecuteModelDto } from './dto/execute-model.dto';
import { ModelService } from './model.service';
import { ModelExecutionResult } from './models/model-execution-result.model';

@Resolver(() => ModelExecutionResult)
@UseGuards(JwtAuthGuard)
export class ModelResolver {
  constructor(private readonly modelService: ModelService) {}

  @Mutation(() => ModelExecutionResult)
  executeScenario(@CurrentUser() user: any, @Args('input') input: ExecuteModelDto) {
    return this.modelService.executeScenario(user.id, input.scenarioId);
  }
}
