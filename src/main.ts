import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Función de arranque de la aplicación NestJS.
 * Crea la instancia de la aplicación con logging habilitado
 * y la pone a escuchar en el puerto configurado.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });
  const puerto = process.env.PORT ?? 3000;
  await app.listen(puerto);
  console.log(`🚀 Servidor GraphQL corriendo en: http://localhost:${puerto}/graphql`);
}

bootstrap();
