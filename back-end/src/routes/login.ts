import { FastifyReply, FastifyRequest } from 'fastify';
import { setAuthCookies } from '../cookies';
import { invalidDataError, invalidUserError } from '../errors';
import { createSession, verifyUserLogin } from '../user';

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
		const userId: string = await verifyUserLogin(email, password);
		if (!userId) {
			invalidUserError(reply);
		}
		// Create a session
		const connectionInformation: connectionData = {
			ip: request.ip,
			userAgent: request.headers['user-agent'],
		};
		const session = await createSession(userId, connectionInformation);
		// Set Cookies
		await setAuthCookies(session, userId, reply);
		reply.send({
			data: 'Success',
		});
	} catch (error) {
		console.error(error);
	}
}
