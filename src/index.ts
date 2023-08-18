import fastify from 'fastify';
import { fastifyPostgres } from '@fastify/postgres';
import { fastifyEnv } from '@fastify/env';
import todoRoutes from './presentation/api/routes/todoRoutes';
import { TodoController } from './presentation/api/controllers/TodoController';
import { CreateTodoUseCase } from './application/useCases/CreateTodoUseCase';
import PostgresTodoDataAccess from './infrastructure/database/PostgresTodoDataAccess';
import { GetAllTodosUseCase } from './application/useCases/GetAllTodosUseCase';
import { GetTodoUseCase } from './application/useCases/GetTodoUseCase';
import { UpdateTodoUseCase } from './application/useCases/UpdateTodoUseCase';
import { DeleteTodoUseCase } from './application/useCases/DeleteTodoUseCase';

async function startServer() {
  const server = fastify({ logger: true });

  await server.register(fastifyEnv, {
    dotenv: true,
    schema: {},
  });

  await server.register(fastifyPostgres, {
    connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}`+
      `@${process.env.POSTGRES_SERVICE}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
  });
  
  const client = await server.pg.connect();

  const todoRepository = new PostgresTodoDataAccess(client);
  const createTodoUseCase = new CreateTodoUseCase(todoRepository);
  const getAllTodoUseCase = new GetAllTodosUseCase(todoRepository);
  const getTodoUseCase = new GetTodoUseCase(todoRepository);
  const updateTodoUseCase = new UpdateTodoUseCase(todoRepository);
  const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);
  const todoController = new TodoController(
      createTodoUseCase,
      getAllTodoUseCase,
      getTodoUseCase,
      updateTodoUseCase,
      deleteTodoUseCase,
  );

  await server.register(todoRoutes, { todoController });

  server.listen({ port: (process.env.HTTP_PORT || 8080) as number }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });

}

startServer().catch((error) => {
  console.error('Error during setup:', error);
  process.exit(1);
});