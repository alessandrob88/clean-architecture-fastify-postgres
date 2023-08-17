import Todo from "../../domain/models/Todo"

export default interface ICreateTodoUseCase {
    execute(): Promise<Todo>
}
