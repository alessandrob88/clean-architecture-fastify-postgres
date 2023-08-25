
import { PoolClient } from "pg";
import { ICreateTodo, ITodo } from "../../domain/models/ITodo";
import ITodoRepository from "../../domain/repositories/ITodoRepository";

export default class PostgresTodoDataAccess implements ITodoRepository {
    constructor(private readonly client: PoolClient){}

    async create(todo: ICreateTodo): Promise<ITodo> {    
        const query = `
            INSERT INTO todos (description, completed)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const values = [todo.description, todo.completed];

        const { rows } = await this.client.query<ITodo>(query, values);
        return rows[0];
    }

    async getAll(limit: number, offset: number): Promise<ITodo[]> {
        const query = `
            SELECT * 
            FROM todos 
            ORDER BY id 
            LIMIT $1 OFFSET $2;
        `;
        const values = [limit, offset];

        const { rows } = await this.client.query<ITodo>(query, values);
        return rows;
    }
    
    async getById(id: number): Promise<ITodo | null> {
        const query =  "SELECT * FROM todos WHERE id=$1";
        const values = [id];

        const { rows } = await this.client.query<ITodo>(query, values);
        if (!rows) {
            return null;
        }
        return rows[0];
    }

    async getByDescription(description: string) : Promise<ITodo | null> {
        const query =  "SELECT * FROM todos WHERE description=$1";
        const values = [description];

        const { rows } = await this.client.query<ITodo>(query, values);
        if (!rows) {
            return null;
        }
        return rows[0];
    }

    async updateById(id: number, updates: Partial<ITodo>): Promise<ITodo | null> {
        const fields = [];
        const values: (string | boolean | number)[] = [id];

        for (const [field, value] of Object.entries(updates)) {
            if (value !== undefined) {
                fields.push(`${field} = $${fields.length + 2}`);
                values.push(value);
            }
        }

        const query = `
            UPDATE todos
            SET ${fields.join(', ')}
            WHERE id = $1
            RETURNING *;
        `;

        const { rows } = await this.client.query<ITodo>(query, values);
        if (!rows.length) {
            return null;
        }
        return rows[0];
    }

    async deleteById(id: number): Promise<ITodo | null> {
        const query = `
            DELETE FROM todos
            WHERE id = $1
            RETURNING *;
        `;
        const values = [id];

        const { rows } = await this.client.query<ITodo>(query, values);
        if (!rows.length) {
            return null;
        }
        return rows[0];
    }
}