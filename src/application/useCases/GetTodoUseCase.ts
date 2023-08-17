import NotFoundError from "../../domain/exceptions/NotFoundError";
import Todo from "../../domain/models/Todo";
import ITodoRepository from "../../domain/repositories/ITodoRepository";
import IGetTodoUseCase from "../../interfaces/useCases/IGetTodoUseCase";

export class GetTodoUseCase implements IGetTodoUseCase {
    constructor(private readonly todoRepository: ITodoRepository) {}

    async execute(id: number): Promise<Todo> {
        const todo = await this.todoRepository.getById(id);

        if (!todo) {
            throw new NotFoundError();
        }
        
        return todo;
    }
}
