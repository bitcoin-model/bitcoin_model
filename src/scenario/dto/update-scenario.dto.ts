import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { CreateScenarioDto } from './create-scenario.dto';

@InputType()
export class UpdateScenarioDto extends PartialType(CreateScenarioDto) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  @IsObject()
  parameters?: Record<string, any>;
}
