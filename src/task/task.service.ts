import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { TaskStatus } from './enums/task-status.enum';

/**
 * Servicio responsable de gestionar los datos de las tareas.
 * Utiliza un arreglo en memoria como almacenamiento de datos.
 * Provee operaciones CRUD completas para las tareas.
 */
@Injectable()
export class TaskService {
  /** Almacén en memoria de todas las tareas del sistema. */
  private readonly tasks: Task[] = [];

  /**
   * Crea una nueva tarea y la almacena en memoria.
   * Genera automáticamente un UUID y establece la marca de tiempo de creación.
   *
   * @param createTaskInput - Los datos necesarios para crear la tarea.
   * @returns El objeto de la tarea recién creada.
   */
  create(createTaskInput: CreateTaskInput): Task {
    const nuevaTarea: Task = {
      id: uuidv4(),
      title: createTaskInput.title,
      description: createTaskInput.description,
      status: createTaskInput.status ?? TaskStatus.BACKLOG,
      tags: createTaskInput.tags ?? [],
      createdAt: new Date().toISOString(),
      assignedUser: createTaskInput.assignedUser,
      project: createTaskInput.project,
    };

    this.tasks.push(nuevaTarea);
    return nuevaTarea;
  }

  /**
   * Recupera todas las tareas almacenadas en memoria.
   *
   * @returns Un arreglo con todas las tareas existentes.
   */
  findAll(): Task[] {
    return this.tasks;
  }

  /**
   * Recupera una tarea individual por su identificador único.
   *
   * @param id - El UUID de la tarea a buscar.
   * @returns La tarea que coincide con el ID dado.
   * @throws {NotFoundException} Si no existe ninguna tarea con el ID proporcionado.
   */
  findOne(id: string): Task {
    const tarea = this.tasks.find((t) => t.id === id);
    if (!tarea) {
      throw new NotFoundException(`No se encontró una tarea con el ID "${id}".`);
    }
    return tarea;
  }

  /**
   * Actualiza una tarea existente con los datos proporcionados.
   * Solo se modificarán los campos incluidos en `updateTaskInput`.
   *
   * @param id - El UUID de la tarea a actualizar.
   * @param updateTaskInput - Objeto con los campos a modificar.
   * @returns El objeto de la tarea actualizada.
   * @throws {NotFoundException} Si no existe ninguna tarea con el ID proporcionado.
   */
  update(id: string, updateTaskInput: UpdateTaskInput): Task {
    const tarea = this.findOne(id);
    const indice = this.tasks.indexOf(tarea);

    const tareaActualizada: Task = {
      ...tarea,
      ...updateTaskInput,
      id,
    };

    this.tasks[indice] = tareaActualizada;
    return tareaActualizada;
  }

  /**
   * Elimina una tarea del almacén en memoria por su ID.
   *
   * @param id - El UUID de la tarea a eliminar.
   * @returns La tarea que fue eliminada.
   * @throws {NotFoundException} Si no existe ninguna tarea con el ID proporcionado.
   */
  remove(id: string): Task {
    const tarea = this.findOne(id);
    const indice = this.tasks.indexOf(tarea);
    this.tasks.splice(indice, 1);
    return tarea;
  }
}
