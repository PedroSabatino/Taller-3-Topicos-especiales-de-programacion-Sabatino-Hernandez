import { InputType, Field } from '@nestjs/graphql';
import { TaskStatus } from '../enums/task-status.enum';

/**
 * Tipo de entrada para crear una nueva tarea.
 * Todos los campos son requeridos, excepto `tags` y `status`.
 */
@InputType({ description: 'Datos necesarios para crear una nueva tarea.' })
export class CreateTaskInput {
  /** Título de la tarea. Debe ser una cadena de texto no vacía. */
  @Field({ description: 'Título corto y descriptivo para la nueva tarea.' })
  title: string;

  /** Descripción detallada de lo que implica la tarea. */
  @Field({ description: 'Descripción detallada de los requisitos de la tarea.' })
  description: string;

  /**
   * Estado inicial de la tarea.
   * Si no se proporciona, toma el valor BACKLOG por defecto.
   */
  @Field(() => TaskStatus, {
    nullable: true,
    defaultValue: TaskStatus.BACKLOG,
    description: 'Estado inicial de la tarea. Por defecto es BACKLOG.',
  })
  status?: TaskStatus;

  /** Lista opcional de etiquetas para categorizar la tarea. */
  @Field(() => [String], {
    nullable: true,
    defaultValue: [],
    description: 'Lista opcional de etiquetas o categorías para la tarea.',
  })
  tags?: string[];

  /** Nombre o identificador del usuario al que se asigna la tarea. */
  @Field({ description: 'El usuario que será responsable de esta tarea.' })
  assignedUser: string;

  /** Nombre o identificador del proyecto al que pertenece la tarea. */
  @Field({ description: 'El proyecto con el que se asocia esta tarea.' })
  project: string;
}
