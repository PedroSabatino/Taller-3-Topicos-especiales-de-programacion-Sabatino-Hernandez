import { registerEnumType } from '@nestjs/graphql';

/**
 * Enumeración que representa los posibles estados de una tarea
 * en el sistema de gestión de proyectos de software.
 */
export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
  description: 'Estado actual de una tarea en el flujo de trabajo.',
  valuesMap: {
    BACKLOG: { description: 'La tarea está en el backlog, aún no ha sido planificada.' },
    TODO: { description: 'La tarea está planificada y lista para ser trabajada.' },
    IN_PROGRESS: { description: 'La tarea está siendo trabajada actualmente.' },
    DONE: { description: 'La tarea ha sido completada.' },
  },
});
