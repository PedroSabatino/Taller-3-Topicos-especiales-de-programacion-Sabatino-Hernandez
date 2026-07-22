import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TaskStatus } from '../enums/task-status.enum';

/**
 * Representa una tarea dentro del sistema de gestión de proyectos.
 * Es el ObjectType de GraphQL que retornan las consultas y mutaciones.
 */
@ObjectType({ description: 'Una tarea dentro de un proyecto de desarrollo de software.' })
export class Task {
  /** Identificador único de la tarea (UUID). */
  @Field(() => ID, { description: 'Identificador único de la tarea (UUID).' })
  id: string;

  /** Título corto que resume la tarea. */
  @Field({ description: 'Título corto y descriptivo de la tarea.' })
  title: string;

  /** Explicación detallada del propósito y los requisitos de la tarea. */
  @Field({ description: 'Descripción detallada de lo que implica la tarea.' })
  description: string;

  /** Estado actual de la tarea en el flujo de trabajo. */
  @Field(() => TaskStatus, { description: 'Estado actual de la tarea en el flujo de trabajo.' })
  status: TaskStatus;

  /** Arreglo de etiquetas o categorías asociadas a la tarea. */
  @Field(() => [String], { description: 'Lista de etiquetas asociadas a la tarea.' })
  tags: string[];

  /** Marca de tiempo ISO de cuándo fue creada la tarea. */
  @Field({ description: 'Fecha y hora de creación de la tarea (formato ISO 8601).' })
  createdAt: string;

  /** Nombre o identificador del usuario asignado a esta tarea. */
  @Field({ description: 'El usuario responsable de trabajar en esta tarea.' })
  assignedUser: string;

  /** Nombre o identificador del proyecto al que pertenece esta tarea. */
  @Field({ description: 'El proyecto al que pertenece esta tarea.' })
  project: string;
}
