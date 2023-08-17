import { FastifyRequest, FastifyReply } from 'fastify';
import NotFoundError from '../../../domain/exceptions/NotFoundError';
import ValidationError from '../../../domain/exceptions/ValidationError';
import { ITodoController } from '../../../interfaces/controllers/ITodoController';
import { ITodoGetParams } from '../../../interfaces/presentation/ITodoRoutesRequest';
import ICreateTodoUseCase from '../../../interfaces/useCases/ICreateTodoUseCase';
import IGetAllTodosUseCase from '../../../interfaces/useCases/IGetAllTodosUseCase';
import IGetTodoUseCase from '../../../interfaces/useCases/IGetTodoUseCase';

export class TodoController implements ITodoController {
  constructor(
    private readonly createTodoUseCase: ICreateTodoUseCase,
    private readonly getAllTodosUseCase: IGetAllTodosUseCase,
    private readonly getTodoUseCase: IGetTodoUseCase,
  ) {}

  async getTodo(request: FastifyRequest, reply: FastifyReply) : Promise<void> {
    const { id } = request.params as ITodoGetParams;
    const { limit = 10, offset = 0 } = request.query as any;
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
          message: `Item ${id} not found`,
        });
      } else if (error instanceof ValidationError) {
        reply.status(400).send({
          message: `Validation Error: ${error.message}`,
        });
      } else {
        reply.status(500).send({
          message: "Internal Server Error",
        });
      }
    }
  }

  async createTodo(request: FastifyRequest, reply: FastifyReply) : Promise<void> {
    throw new Error("Method not implemented.");
  }
}
