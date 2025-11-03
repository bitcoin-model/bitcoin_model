import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';
import { ModelModule } from '../model/model.module';
import { PricingModule } from '../pricing/pricing.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ScenarioModule } from '../scenario/scenario.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'dist/schema.gql'),
      sortSchema: true,
      context: ({ req, reply }) => ({ req, reply }),
      cors: false,
    }),
    PrismaModule,
    AuthModule,
    ScenarioModule,
    PricingModule,
    ModelModule,
  ],
})
export class AppModule {}
