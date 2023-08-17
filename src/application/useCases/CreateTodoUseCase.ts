import ITodoRepository from '../../domain/repositories/ITodoRepository';
import Todo from '../../domain/models/Todo';
import ICreateTodoUseCase from '../../interfaces/useCases/ICreateTodoUseCase';

export class CreateTodoUseCase implements ICreateTodoUseCase {
    constructor(private readonly ITodoRepository: ITodoRepository) {}
    execute(): Promise<Todo> {
        throw new Error('Method not implemented.');
    }

}
