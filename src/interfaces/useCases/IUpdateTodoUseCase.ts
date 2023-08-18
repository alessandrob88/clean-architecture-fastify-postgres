import { ITodo } from "../../domain/models/ITodo";

export default interface IUpdateTodoUseCase {
    execute(id: number, todo: Partial<ITodo>): Promise<ITodo>
}