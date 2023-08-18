import { ITodo } from "../../domain/models/ITodo";

export default interface IDeleteTodoUseCase {
    execute(id: number): Promise<ITodo>
}