import { FastifyReply, FastifyRequest } from 'fastify';

export interface ITodoController {
    getTodo(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    createTodo(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    updateTodo(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    deleteTodo(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
