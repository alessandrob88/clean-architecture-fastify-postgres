import Todo from "../../domain/models/Todo";
import ITodoRepository from "../../domain/repositories/ITodoRepository";
import IGetAllTodosUseCase from "../../interfaces/useCases/IGetAllTodosUseCase";

export class GetAllTodosUseCase implements IGetAllTodosUseCase {
    constructor(private readonly todoRepository: ITodoRepository) {}
    
    async execute(limit: number, offset: number): Promise<Todo[]> {
        const todos = await this.todoRepository.getAll(limit, offset);
        return todos;
    }
}
