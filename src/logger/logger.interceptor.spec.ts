import { LoggerInterceptor } from './logger.interceptor';

/**
 * Suite de pruebas para el LoggerInterceptor.
 * Verifica que el interceptor pueda ser instanciado correctamente.
 */
describe('LoggerInterceptor', () => {
  /** Verifica que el interceptor se define sin errores al instanciarse. */
  it('debería estar definido', () => {
    expect(new LoggerInterceptor()).toBeDefined();
  });
});
