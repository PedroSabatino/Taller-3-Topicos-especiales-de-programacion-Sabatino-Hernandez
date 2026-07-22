import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';

/**
 * Módulo raíz de la aplicación.
 * Configura el módulo de GraphQL usando el enfoque Code First con el driver de Apollo.
 * El esquema se genera automáticamente a partir de los decoradores de TypeScript y se guarda en `schema.gql`.
 * Apollo Server v5 provee Apollo Explorer como interfaz de desarrollo en la ruta /graphql.
 */
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
