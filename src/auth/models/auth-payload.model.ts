import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from './user.model';

@ObjectType()
export class AuthPayload {
  @Field(() => UserModel)
  user!: UserModel;

  @Field()
  expiresIn!: number;
}
