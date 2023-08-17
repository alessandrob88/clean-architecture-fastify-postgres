import Todo from "../../domain/models/Todo";

export default interface IGetTodoUseCase {
    execute(id: number): Promise<Todo>
}