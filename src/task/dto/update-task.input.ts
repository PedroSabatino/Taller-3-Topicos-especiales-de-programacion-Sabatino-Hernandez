import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateTaskInput } from './create-task.input';

/**
 * Tipo de entrada para actualizar una tarea existente.
 * Extiende `CreateTaskInput` con todos los campos opcionales mediante `PartialType`,
 * más el campo `id` requerido para identificar qué tarea se va a modificar.
 */
@InputType({ description: 'Datos para actualizar una tarea existente. Todos los campos excepto el id son opcionales.' })
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  /** Identificador único (UUID) de la tarea a actualizar. */
  @Field(() => ID, { description: 'El UUID de la tarea a actualizar.' })
  id: string;
}
