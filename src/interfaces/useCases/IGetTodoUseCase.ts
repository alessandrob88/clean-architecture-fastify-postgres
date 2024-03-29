import { ITodo } from "../../domain/models/ITodo";

export default interface IGetTodoUseCase {
    execute(id: number): Promise<ITodo>
}