import NotFoundError from "../../domain/exceptions/NotFoundError";
import { ITodo } from "../../domain/models/ITodo";
import ITodoRepository from "../../domain/repositories/ITodoRepository";
import IGetTodoUseCase from "../../interfaces/useCases/IGetTodoUseCase";

export class GetTodoUseCase implements IGetTodoUseCase {
    constructor(private readonly todoRepository: ITodoRepository) {}

    async execute(id: number): Promise<ITodo> {
        const todo = await this.todoRepository.getById(id);

        if (!todo) {
            throw new NotFoundError();
        }
        
        return todo;
    }
}
