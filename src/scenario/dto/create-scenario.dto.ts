import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateScenarioDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => GraphQLJSONObject)
  @IsObject()
  parameters!: Record<string, any>;
}
