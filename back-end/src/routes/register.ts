import { FastifyReply, FastifyRequest } from 'fastify';
import { createSession, createUser } from '../user';
import argon2 from 'argon2';
import { setAuthCookies } from '../cookies';
import { connectionData } from '../types/connectionData';
const { ARGON_MEMORY_COST, ARGON_PARALLELISM, ARGON_TIME_COST } = process.env;

interface RegisterBody {
	email: string;
	password: string;
}

function invalidData(reply: FastifyReply) {
	reply.status(400).send({
		error: 'Invalid Data',
	});
}

export async function register(request: FastifyRequest, reply: FastifyReply) {
	try {
		// Make sure data has been sent
		if (!request.body) {
			invalidData(reply);
		}
		// Get user data from request
		const { email, password } = request.body as RegisterBody;
		if (!email || !password) {
			invalidData(reply);
		}
		// Hash the password
		const hashedPassword = await argon2.hash(password, {
			type: argon2.argon2id,
			memoryCost: parseInt(ARGON_MEMORY_COST as string),
			parallelism: parseInt(ARGON_PARALLELISM as string),
			timeCost: parseInt(ARGON_TIME_COST as string),
		});
		// Create User
		const userId = await createUser(email, hashedPassword);
		if (!userId) {
			return reply.send({
				error: 'User already exists',
			});
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
	} catch (error) {
		console.error(error);
	}
}
