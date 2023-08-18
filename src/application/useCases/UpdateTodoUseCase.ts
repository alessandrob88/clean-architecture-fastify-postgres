import NotFoundError from "../../domain/exceptions/NotFoundError";
import { ITodo, IUpdateTodo } from "../../domain/models/ITodo";
import ITodoRepository from "../../domain/repositories/ITodoRepository";
import IUpdateTodoUseCase from "../../interfaces/useCases/IUpdateTodoUseCase";

export class UpdateTodoUseCase implements IUpdateTodoUseCase {
    constructor(private readonly todoRepository: ITodoRepository) {}

    async execute(id: number, updateTodo: IUpdateTodo): Promise<ITodo> {
        const todo = await this.todoRepository.updateById(id, updateTodo);

        if (!todo) {
            throw new NotFoundError();
        }
        
        return todo;
    }
}
