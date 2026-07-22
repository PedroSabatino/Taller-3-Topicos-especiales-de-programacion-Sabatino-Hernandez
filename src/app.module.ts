import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * Root module of the application.
 * Configures the GraphQL module using the Code First approach with Apollo Driver.
 * The schema is auto-generated from TypeScript decorators and saved to `schema.gql`.
 * Apollo Server v5 provides Apollo Explorer as the default dev UI at /graphql.
 */
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
