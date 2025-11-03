import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { BtcPriceModel } from '../../pricing/models/btc-price.model';
import { ScenarioModel } from '../../scenario/models/scenario.model';

@ObjectType()
export class ModelExecutionResult {
  @Field(() => ScenarioModel)
  scenario!: ScenarioModel;

  @Field(() => BtcPriceModel, { nullable: true })
  latestPrice?: BtcPriceModel | null;

  @Field(() => GraphQLJSONObject)
  summary!: Record<string, any>;
}
