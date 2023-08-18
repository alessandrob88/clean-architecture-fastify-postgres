import { ITodo } from "../../domain/models/ITodo";

export default interface IGetAllTodosUseCase {
    execute(limit: number, offset: number): Promise<ITodo[]>
}