import ITodoRepository from '../../domain/repositories/ITodoRepository';
import ICreateTodoUseCase from '../../interfaces/useCases/ICreateTodoUseCase';
import { ICreateTodo, ITodo } from '../../domain/models/ITodo';
import EntityAlreadyExistsError from '../../domain/exceptions/EntityAlreadyExistsError';

export class CreateTodoUseCase implements ICreateTodoUseCase {
    constructor(private readonly todoRepository: ITodoRepository) {}
    
    async execute(todo: ICreateTodo): Promise<ITodo> {
        const alreadyExistentTodo = await this.todoRepository.getByDescription(todo.description);

        if (alreadyExistentTodo) {
            throw new EntityAlreadyExistsError(`Entity with '${alreadyExistentTodo.description}' description already exists`);
        }

        const createdTodo = await this.todoRepository.create(todo);
        return createdTodo;
    }

}
