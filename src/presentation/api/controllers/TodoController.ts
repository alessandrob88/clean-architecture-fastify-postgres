import { FastifyRequest, FastifyReply } from 'fastify';
import EntityAlreadyExistsError from '../../../domain/exceptions/EntityAlreadyExistsError';
import NotFoundError from '../../../domain/exceptions/NotFoundError';
import { ITodoController } from '../../../interfaces/controllers/ITodoController';
import { ITodoRouteParams, ITodoQueryParams } from '../../../interfaces/presentation/ITodoRoutesRequest';
import ICreateTodoUseCase from '../../../interfaces/useCases/ICreateTodoUseCase';
import IDeleteTodoUseCase from '../../../interfaces/useCases/IDeleteTodoUseCase';
import IGetAllTodosUseCase from '../../../interfaces/useCases/IGetAllTodosUseCase';
import IGetTodoUseCase from '../../../interfaces/useCases/IGetTodoUseCase';
import IUpdateTodoUseCase from '../../../interfaces/useCases/IUpdateTodoUseCase';

export class TodoController implements ITodoController {
  constructor(
    private readonly createTodoUseCase: ICreateTodoUseCase,
    private readonly getAllTodosUseCase: IGetAllTodosUseCase,
    private readonly getTodoUseCase: IGetTodoUseCase,
    private readonly updateTodoUseCase: IUpdateTodoUseCase,
    private readonly deleteTodoUseCase: IDeleteTodoUseCase,
  ) {}

  async getTodo(request: FastifyRequest, reply: FastifyReply) : Promise<void> {
    const { id } = request.params as ITodoRouteParams;
    const { limit = 10, offset = 0 } = request.query as ITodoQueryParams;
    
    try {
      if (id) {
        const todo = await this.getTodoUseCase.execute(id);
        reply.status(200).send(todo);
      } else {
        const todoList = await this.getAllTodosUseCase.execute(limit, offset);
        reply.status(200).send(todoList);
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        reply.status(404).send({
          statusCode: 404,
          error: "Not Found",
          message: `Item ${id} not found`,
        });
      } else {
        reply.status(500).send({
          statusCode: 500,
          message: "Internal Server Error",
        });
      }
    }
  }

  async createTodo(request: FastifyRequest, reply: FastifyReply) : Promise<void> {
    const { description, completed } = request.body as any;
    
    try {
      const todo = await this.createTodoUseCase.execute({ description, completed });
      reply.status(201).send(todo);
    } catch (error) {
      if (error instanceof EntityAlreadyExistsError) {
        reply.status(409).send({
          statusCode: 409,
          error: "Conflict",
          message: error.message,
        });
      } else {
        reply.status(500).send({
          statusCode: 500,
          error: "Internal Server Error",
        });
      }
    }
  }

  async updateTodo(request: FastifyRequest, reply: FastifyReply) : Promise<void> {
    const { id } = request.params as ITodoRouteParams;
    const { description, completed } = request.body as any;

    try {
      const todo = await this.updateTodoUseCase.execute(
        id as number, 
        { description, completed },
      );
      reply.status(200).send(todo);
    } catch (error) {
      if (error instanceof NotFoundError) {
        reply.status(404).send({
          statusCode: 404,
          error: "Not Found",
          message: `Item ${id} not found`,
        });
      } else {
        reply.status(500).send({
          statusCode: 500,
          error: "Internal Server Error",
        });
      }
    }
  }

  async deleteTodo(request: FastifyRequest, reply: FastifyReply) : Promise<void> {
    const { id } = request.params as ITodoRouteParams;

    try {
      const todo = await this.deleteTodoUseCase.execute(id as number);
      reply.status(200).send(todo);
    } catch (error) {
      if (error instanceof NotFoundError) {
        reply.status(404).send({
          statusCode: 404,
          error: "Not Found",
          message: `Item ${id} not found`,
        });
      } else {
        reply.status(500).send({
          statusCode: 500,
          error: "Internal Server Error",
        });
      }
    }
  }
}
