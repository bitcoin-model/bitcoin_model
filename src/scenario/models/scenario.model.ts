import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { UserModel } from '../../auth/models/user.model';

@ObjectType()
export class ScenarioModel {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLJSONObject)
  parameters!: Record<string, any>;

  @Field()
  ownerId!: number;

  @Field(() => UserModel)
  owner!: UserModel;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
