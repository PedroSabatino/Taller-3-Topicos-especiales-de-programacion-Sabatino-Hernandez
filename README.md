# Sistema de Gestión de Tareas — Taller #3

> **Tópicos Especiales de Programación**  
> Temas evaluados: Programación Orientada a Aspectos (AOP), GitFlow y Clean Code

Sistema de gestión de tareas para proyectos de desarrollo de software, implementado como un servidor **NestJS** que expone una **API GraphQL** con operaciones CRUD completas.

---

## Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|---|---|---|
| [NestJS](https://nestjs.com/) | ^11.0 | Framework principal del servidor |
| [Apollo Server](https://www.apollographql.com/) | ^5.0 | Motor del servidor GraphQL |
| [`@nestjs/graphql`](https://docs.nestjs.com/graphql/quick-start) | ^13.0 | Integración GraphQL (Code First) |
| [UUID](https://github.com/uuidjs/uuid) | ^11.0 | Generación de identificadores únicos |
| [TypeScript](https://www.typescriptlang.org/) | ^5.7 | Lenguaje de programación |

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/PedroSabatino/Taller-3-Topicos-especiales-de-programacion-Sabatino-Hernandez.git

# Instalar dependencias
npm install
```

---

## Ejecución del Servidor

```bash
# Modo desarrollo (con recarga automática)
npm run start:dev

# Modo producción
npm run start:prod

# Modo normal
npm run start
```

Una vez iniciado, el servidor estará disponible en:

- **API GraphQL:** `http://localhost:3000/graphql`
- **Apollo Explorer (interfaz interactiva):** `http://localhost:3000/graphql`

---

## Arquitectura del Taller

```
src/
├── app.module.ts              # Módulo raíz — configura GraphQL y registra el interceptor (AOP)
├── main.ts                    # Bootstrap de la aplicación
├── logger/
│   ├── logger.interceptor.ts  # Interceptor de AOP — logging transversal de operaciones
│   └── logger.interceptor.spec.ts
└── task/
    ├── dto/
    │   ├── create-task.input.ts   # Tipo de entrada para crear tareas
    │   └── update-task.input.ts   # Tipo de entrada para actualizar tareas
    ├── entities/
    │   └── task.entity.ts         # Entidad Task (ObjectType de GraphQL)
    ├── enums/
    │   └── task-status.enum.ts    # Enum de estados de la tarea
    ├── task.module.ts
    ├── task.resolver.ts           # Resolver GraphQL (queries y mutations)
    └── task.service.ts            # Servicio con lógica de negocio (almacenamiento en memoria)
```

---

## Modelo de Datos — Entidad `Task`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `ID` (UUID) | Identificador único auto-generado |
| `title` | `String` | Título corto y descriptivo de la tarea |
| `description` | `String` | Descripción detallada de la tarea |
| `status` | `TaskStatus` | Estado actual en el flujo de trabajo |
| `tags` | `[String]` | Arreglo dinámico de etiquetas |
| `createdAt` | `String` | Fecha de creación en formato ISO 8601 |
| `assignedUser` | `String` | Usuario responsable de la tarea |
| `project` | `String` | Proyecto al que pertenece la tarea |

### Estados disponibles (`TaskStatus`)

| Valor | Descripción |
|---|---|
| `BACKLOG` | La tarea está en el backlog, aún no planificada |
| `TODO` | La tarea está planificada y lista para trabajarse |
| `IN_PROGRESS` | La tarea está siendo trabajada actualmente |
| `DONE` | La tarea ha sido completada |

---

## API GraphQL — Operaciones Disponibles

### Queries (Consultas)

#### Obtener todas las tareas
```graphql
query {
  tasks {
    id
    title
    description
    status
    tags
    createdAt
    assignedUser
    project
  }
}
```

#### Obtener una tarea por ID
```graphql
query {
  task(id: "uuid-de-la-tarea") {
    id
    title
    status
    assignedUser
  }
}
```

### Mutations (Mutaciones)

#### Crear una nueva tarea
```graphql
mutation {
  createTask(createTaskInput: {
    title: "Implementar autenticación"
    description: "Agregar JWT al servidor NestJS"
    status: IN_PROGRESS
    tags: ["backend", "seguridad"]
    assignedUser: "pedro.sabatino"
    project: "Taller #3"
  }) {
    id
    title
    status
    createdAt
  }
}
```

#### Actualizar una tarea (campos opcionales)
```graphql
mutation {
  updateTask(updateTaskInput: {
    id: "uuid-de-la-tarea"
    status: DONE
    tags: ["backend", "seguridad", "completado"]
    assignedUser: "nuevo.usuario"
  }) {
    id
    title
    status
    tags
    assignedUser
  }
}
```

#### Eliminar una tarea
```graphql
mutation {
  removeTask(id: "uuid-de-la-tarea") {
    id
    title
  }
}
```

---

## Programación Orientada a Aspectos (AOP)

La AOP se implementa mediante el `LoggerInterceptor` ubicado en `src/logger/logger.interceptor.ts`.

### ¿Cómo funciona?

El interceptor actúa como un **aspecto transversal** que envuelve automáticamente cada operación GraphQL sin modificar la lógica de negocio de los servicios ni resolvers.

```
Petición GraphQL
      │
      ▼
┌─────────────────────────┐
│   LoggerInterceptor     │ ← Aspecto (AOP)
│   [INICIO] registrado   │
│         │               │
│         ▼               │
│   TaskResolver          │ ← Lógica de negocio (no sabe del log)
│   TaskService           │
│         │               │
│   [FIN/ERROR] registrado│
└─────────────────────────┘
      │
      ▼
 Respuesta GraphQL
```

### Ejemplo de logs en consola

```
[LoggerInterceptor] [INICIO] Mutation.createTask
[LoggerInterceptor] [FIN] Mutation.createTask — completado en 2ms

[LoggerInterceptor] [INICIO] Query.tasks
[LoggerInterceptor] [FIN] Query.tasks — completado en 1ms

[LoggerInterceptor] [INICIO] Query.task
[LoggerInterceptor] [ERROR] Query.task — falló en 1ms | No se encontró una tarea con el ID "xyz".
```

El interceptor se registra de forma **global** en el `AppModule` mediante el token `APP_INTERCEPTOR`, lo que lo aplica a todos los resolvers sin necesidad de decorar cada uno individualmente.

---

## Flujo de Trabajo — GitFlow

Este proyecto sigue la metodología **GitFlow**:

```
main          ●─────────────────────────────────────● v1.0.0
              │                                     │
develop       ●──●──●──●──●──●──●──●──●──●──●──●──●
                 │        │             │
feature/      setup-   crud-        logging-
              graphql  tareas        aop
```

### Ramas utilizadas

| Rama | Propósito |
|---|---|
| `main` | Código de producción — solo recibe merges de `release` |
| `develop` | Rama de integración — base de todos los features |
| `feature/setup-graphql` | Configuración inicial del módulo GraphQL |
| `feature/crud-tareas` | Implementación del CRUD de tareas |
| `feature/logging-aop` | Implementación del interceptor de AOP |
| `release/v1.0` | Preparación de la versión final |

---

## Pruebas

```bash
# Pruebas unitarias
npm run test

# Pruebas con cobertura
npm run test:cov

# Pruebas end-to-end
npm run test:e2e
```

---

## Scripts Disponibles

```bash
npm run build        # Compila el proyecto TypeScript
npm run start        # Inicia el servidor en modo normal
npm run start:dev    # Inicia con recarga automática (desarrollo)
npm run start:debug  # Inicia en modo debug
npm run start:prod   # Inicia desde el build compilado
npm run lint         # Analiza el código con ESLint
npm run format       # Formatea el código con Prettier
npm run test         # Ejecuta las pruebas unitarias
npm run test:cov     # Ejecuta pruebas con reporte de cobertura
```

---

## 📚 Recursos

- [Documentación oficial de NestJS](https://docs.nestjs.com)
- [GraphQL Code First con NestJS](https://docs.nestjs.com/graphql/quick-start)
- [Interceptores en NestJS (AOP)](https://docs.nestjs.com/interceptors)
- [GitFlow — documentación](https://nvie.com/posts/a-successful-git-branching-model/)
- [Apollo Server v5](https://www.apollographql.com/docs/apollo-server/)
