import Todo from "../../domain/models/Todo";

export default interface IGetAllTodosUseCase {
    execute(limit: number, offset: number): Promise<Todo[]>
}