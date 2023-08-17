import Todo from "../models/Todo";

export default interface ITodoRepository {
    getAll(limit: number, offset: number): Promise<Todo[]>;
    getById(id: number): Promise<Todo | null>;
    create(todo: Todo): Promise<Todo>;
    updateById(id: number): Promise<Todo>;
    deleteById(id: number): Promise<Todo>;
}