import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function todoRoutes(fastify: FastifyInstance, options: any) {
    
    const todoProperties = {
        description: {
            type: 'string',
        },
        completed: {
            type: 'boolean'
        }
    };

    const todoPostValidationSchema = { 
        body: {
            type: 'object',
            required: ['description', 'completed'],
            properties: todoProperties
        }
    };

    const todoPutValidationSchema = {
        body: {
            type: 'object',
            properties: todoProperties,
            oneOf: [
                { required: ['description'] },
                { required: ['title'] }
            ]
        }
    };

    fastify.get('/todo/:id?', async function (request: FastifyRequest, reply: FastifyReply) {
        await options.todoController.getTodo(request, reply);
    }),
    fastify.post('/todo', { schema: todoPostValidationSchema }, async function (request: FastifyRequest, reply: FastifyReply) {
        await options.todoController.createTodo(request, reply);
    }),
    fastify.put('/todo/:id', { schema: todoPutValidationSchema }, async function (request: FastifyRequest, reply: FastifyReply) {
        await options.todoController.updateTodo(request, reply);
    }),
    fastify.delete('/todo/:id', async function (request: FastifyRequest, reply: FastifyReply) {
        await options.todoController.deleteTodo(request, reply);
    })
}

export default todoRoutes;