import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Interceptor de logging que implementa el principio de la
 * Programación Orientada a Aspectos (AOP).
 *
 * Este interceptor "envuelve" cada operación GraphQL de forma transversal,
 * registrando en consola el nombre de la operación y el tiempo que tardó
 * en completarse, sin modificar ni contaminar la lógica de negocio de los servicios.
 *
 * Al registrarse globalmente en el AppModule mediante APP_INTERCEPTOR,
 * actúa como un "aspecto" que se aplica automáticamente a todos los resolvers.
 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  /** Instancia del logger de NestJS con el contexto del interceptor. */
  private readonly logger = new Logger(LoggerInterceptor.name);

  /**
   * Método principal del interceptor. Se ejecuta antes y después de cada operación GraphQL.
   * Registra el nombre de la operación al inicio y la duración total al finalizar.
   * Si la operación falla, registra el error junto con el tiempo transcurrido.
   *
   * @param context - El contexto de ejecución de la petición entrante.
   * @param next - El manejador que invoca el método del resolver correspondiente.
   * @returns Un Observable con la respuesta del resolver.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();

    const nombreOperacion = info?.fieldName ?? 'Operación desconocida';
    const tipoOperacion = info?.parentType?.name ?? '';

    const inicio = Date.now();
    this.logger.log(`[INICIO] ${tipoOperacion}.${nombreOperacion}`);

    return next.handle().pipe(
      tap({
        next: () => {
          const duracion = Date.now() - inicio;
          this.logger.log(
            `[FIN] ${tipoOperacion}.${nombreOperacion} — completado en ${duracion}ms`,
          );
        },
        error: (err: Error) => {
          const duracion = Date.now() - inicio;
          this.logger.error(
            `[ERROR] ${tipoOperacion}.${nombreOperacion} — falló en ${duracion}ms | ${err.message}`,
          );
        },
      }),
    );
  }
}