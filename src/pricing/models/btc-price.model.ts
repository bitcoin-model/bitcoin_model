import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BtcPriceModel {
  @Field(() => ID)
  id!: number;

  @Field()
  priceUsd!: string;

  @Field()
  source!: string;

  @Field()
  asOf!: Date;

  @Field()
  createdAt!: Date;
}
