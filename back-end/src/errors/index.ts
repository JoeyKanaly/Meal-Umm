import { FastifyReply } from 'fastify';

function unauthorizedErrorResponse(reply: FastifyReply, error: string) {
	reply.status(403).send({
		error
	})
}

export function invalidDataError(reply: FastifyReply) {
	unauthorizedErrorResponse(reply, 'Invalid Data');
}

export function invalidUserError(reply: FastifyReply) {
	unauthorizedErrorResponse(reply, 'Invalid Username or Password');
}

export function userExistsError(reply: FastifyReply) {
	unauthorizedErrorResponse(reply, 'User already exists');
}