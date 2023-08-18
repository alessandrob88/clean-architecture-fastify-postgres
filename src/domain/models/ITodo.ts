export interface ITodo {
    id: number,
    description: string,
    completed: boolean,
}

export interface ICreateTodo extends Omit<ITodo, 'id'> {}

export interface IUpdateTodo extends Partial<ICreateTodo> {}