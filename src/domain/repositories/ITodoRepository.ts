import { ICreateTodo, ITodo } from "../models/ITodo";

export default interface ITodoRepository {
    getAll(limit: number, offset: number): Promise<ITodo[]>;
    
    getById(id: number): Promise<ITodo | null>;
    
    getByDescription(description: string): Promise<ITodo | null>;
    
    create(todo: ICreateTodo): Promise<ITodo>;
    
    updateById(id: number, updates: Partial<ITodo>): Promise<ITodo | null>;
    
    deleteById(id: number): Promise<ITodo | null>;
}