import { ICreateTodo, ITodo } from "../../domain/models/ITodo"

export default interface ICreateTodoUseCase {
    execute(todo: ICreateTodo): Promise<ITodo>
}
