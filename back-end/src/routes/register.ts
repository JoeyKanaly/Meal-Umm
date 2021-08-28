import { FastifyReply, FastifyRequest } from 'fastify';
import { setAuthCookies } from '../cookies';
import { invalidDataError, unexpectedError, userExistsError } from '../errors';
import { connectionData } from '../types/connectionData';
import { createSession, createUser, sendVerificationEmail } from '../user';
import { hashPassword } from '../user/password';

export async function register(request: FastifyRequest, reply: FastifyReply) {
	try {
		const { ARGON_MEMORY_COST, ARGON_PARALLELISM, ARGON_TIME_COST } = process.env;
		// Make sure data has been sent
		if (!request.body) {
			invalidDataError(reply);
		}
		// Get user data from request
		const { email, password } = request.body as EmailPassword;
		if (!email || !password) {
			return invalidDataError(reply);
		}
		// Hash the password
		const hashedPassword = await hashPassword(password);
		if (!hashedPassword) {
			return unexpectedError(reply);
		}
		// Create User
		const userId = await createUser(email, hashedPassword);
		if (!userId) {
			return userExistsError(reply);
		}
		// Create Session
		const connectionInformation: connectionData = {
			ip: request.ip,
			userAgent: request.headers['user-agent'],
		};
		const sessionToken = await createSession(userId, connectionInformation);
		// Set Cookies/Login
		await setAuthCookies(sessionToken, userId, reply);
		reply.send({
			data: userId,
		});
		await sendVerificationEmail(email, userId);
	} catch (error) {
		console.error(error);
	}
}
