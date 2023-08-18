import NotFoundError from "../../domain/exceptions/NotFoundError";
import { ITodo } from "../../domain/models/ITodo";
import ITodoRepository from "../../domain/repositories/ITodoRepository";
import IDeleteTodoUseCase from "../../interfaces/useCases/IDeleteTodoUseCase";

export class DeleteTodoUseCase implements IDeleteTodoUseCase {
    constructor(private readonly todoRepository: ITodoRepository) {}

    async execute(id: number): Promise<ITodo> {
        const todo = await this.todoRepository.deleteById(id);

        if (!todo) {
            throw new NotFoundError();
        }
        
        return todo;
    }
}
