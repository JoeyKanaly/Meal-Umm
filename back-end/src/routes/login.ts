import { FastifyReply, FastifyRequest } from 'fastify';
import { setAuthCookies } from '../cookies';
import { invalidDataError, noUserError } from '../errors';
import { connectionData } from '../types/connectionData';
import { createSession, verifyUser } from '../user';

export async function login(request: FastifyRequest, reply: FastifyReply) {
	try {
		if (!request.body) {
			invalidDataError(reply);
		}
		const { email, password } = request.body as EmailPassword;
		if (!email || !password) {
			invalidDataError(reply);
		}
		// Verify password
		const userId: string = await verifyUser(email, password);
		if (!userId) {
			noUserError(reply);
		}
		// Create a session
		const connectionInformation: connectionData = {
			ip: request.ip,
			userAgent: request.headers['user-agent'],
		};
		const session = await createSession(userId, connectionInformation);
		// Set Cookies
		setAuthCookies(session, userId, reply);
		reply.send({
			data: 'Success',
		});
	} catch (error) {
		console.error(error);
	}
}
