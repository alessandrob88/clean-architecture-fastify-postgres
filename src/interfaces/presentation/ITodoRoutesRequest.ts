export interface ITodoRouteParams {
    id?: number;
}

export interface ITodoQueryParams {
    limit?: number,
    offset?: number,
}

export interface ITodoBodyParams {
    description: string,
    completed: boolean,
}