import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function todoRoutes(fastify: FastifyInstance, options: any) {
    fastify.get('/todo/:id?', async function (request: FastifyRequest, reply: FastifyReply) {
        await options.todoController.getTodo(request, reply);
    }),
    fastify.post('/todo', async function (request: FastifyRequest, reply: FastifyReply) {
        await options.todoController.createTodo(request, reply);
    })
}

export default todoRoutes;