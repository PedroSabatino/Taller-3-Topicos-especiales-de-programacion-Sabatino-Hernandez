import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';

/**
 * Módulo de tareas.
 * Agrupa el resolver y el servicio del recurso `Task`,
 * encapsulando toda la lógica de gestión de tareas del sistema.
 */
@Module({
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
