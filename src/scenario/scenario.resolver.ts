import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { UpdateScenarioDto } from './dto/update-scenario.dto';
import { ScenarioModel } from './models/scenario.model';
import { ScenarioService } from './scenario.service';

@Resolver(() => ScenarioModel)
@UseGuards(JwtAuthGuard)
export class ScenarioResolver {
  constructor(private readonly scenarioService: ScenarioService) {}

  @Mutation(() => ScenarioModel)
  createScenario(@CurrentUser() user: any, @Args('input') input: CreateScenarioDto) {
    return this.scenarioService.create(user.id, input);
  }

  @Query(() => [ScenarioModel])
  scenarios(@CurrentUser() user: any) {
    return this.scenarioService.findAll(user.id);
  }

  @Query(() => ScenarioModel)
  scenario(@CurrentUser() user: any, @Args('id', { type: () => Int }) id: number) {
    return this.scenarioService.findOne(user.id, id);
  }

  @Mutation(() => ScenarioModel)
  updateScenario(@CurrentUser() user: any, @Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateScenarioDto) {
    return this.scenarioService.update(user.id, id, input);
  }

  @Mutation(() => Boolean)
  deleteScenario(@CurrentUser() user: any, @Args('id', { type: () => Int }) id: number) {
    return this.scenarioService.remove(user.id, id);
  }
}
