import './env.ts';
import fastify from 'fastify';

const server = fastify();
const { SERVER_PORT } = process.env!;

server.get('/', (request, reply) => {
	reply.send({
		data: 'SUCCESS',
	});
});

server.listen(SERVER_PORT!);
console.log(`Server listening at localhost:${SERVER_PORT}`);
