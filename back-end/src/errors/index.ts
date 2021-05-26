import { FastifyReply } from 'fastify';

export function invalidDataError(reply: FastifyReply) {
	reply.status(400).send({
		error: 'Invalid Data',
	});
}

export async function noUserError(reply: FastifyReply) {
	reply.status(400).send({
		error: 'Invalid User/Password',
	});
}
