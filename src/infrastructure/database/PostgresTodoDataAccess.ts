
import { PoolClient } from "pg";
import Todo from "../../domain/models/Todo";
import ITodoRepository from "../../domain/repositories/ITodoRepository";

export default class PostgresTodoDataAccess implements ITodoRepository {
    constructor(private readonly client: PoolClient){}

    create(todo: Todo): Promise<Todo> {
        throw new Error("Method not implemented.");
    }
    async getAll(limit: number, offset: number): Promise<Todo[]> {
        const { rows } = await this.client.query<Todo>(
            "SELECT * FROM todos LIMIT $1 OFFSET $2",
            [limit, offset]
        );
        return rows;
    }
    
    async getById(id: number): Promise<Todo | null> {
        const { rows } = await this.client.query<Todo>(
            "SELECT * FROM todos WHERE id=$1",
            [id],
        );
        if (!rows) {
            return null;
        }
        return rows[0];
    }
    updateById(id: number): Promise<Todo> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<Todo> {
        throw new Error("Method not implemented.");
    }
}