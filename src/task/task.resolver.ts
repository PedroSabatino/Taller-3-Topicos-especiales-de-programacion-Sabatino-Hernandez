import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

/**
 * Resolver de GraphQL para las operaciones sobre tareas.
 * Expone las consultas y mutaciones del sistema de gestión de tareas.
 * Delega toda la lógica de negocio al `TaskService`.
 */
@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Mutación para crear una nueva tarea.
   *
   * @param createTaskInput - Los datos de entrada para la nueva tarea.
   * @returns La tarea recién creada.
   */
  @Mutation(() => Task, { name: 'createTask', description: 'Crea una nueva tarea en el sistema.' })
  createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Task {
    return this.taskService.create(createTaskInput);
  }

  /**
   * Consulta para obtener todas las tareas del sistema.
   *
   * @returns Un arreglo con todas las tareas existentes.
   */
  @Query(() => [Task], { name: 'tasks', description: 'Obtiene todas las tareas del sistema.' })
  findAll(): Task[] {
    return this.taskService.findAll();
  }

  /**
   * Consulta para obtener una sola tarea por su ID único.
   *
   * @param id - El UUID de la tarea a buscar.
   * @returns La tarea que coincide con el ID dado.
   */
  @Query(() => Task, { name: 'task', description: 'Obtiene una tarea específica por su UUID.' })
  findOne(
    @Args('id', { type: () => ID, description: 'UUID de la tarea a consultar.' }) id: string,
  ): Task {
    return this.taskService.findOne(id);
  }

  /**
   * Mutación para actualizar una tarea existente.
   * Solo se modificarán los campos proporcionados en la entrada.
   *
   * @param updateTaskInput - Los datos a actualizar, incluyendo el ID de la tarea.
   * @returns La tarea actualizada.
   */
  @Mutation(() => Task, { name: 'updateTask', description: 'Actualiza una tarea existente por su UUID.' })
  updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Task {
    return this.taskService.update(updateTaskInput.id, updateTaskInput);
  }

  /**
   * Mutación para eliminar permanentemente una tarea.
   *
   * @param id - El UUID de la tarea a eliminar.
   * @returns La tarea que fue eliminada.
   */
  @Mutation(() => Task, { name: 'removeTask', description: 'Elimina permanentemente una tarea por su UUID.' })
  removeTask(
    @Args('id', { type: () => ID, description: 'UUID de la tarea a eliminar.' }) id: string,
  ): Task {
    return this.taskService.remove(id);
  }
}
