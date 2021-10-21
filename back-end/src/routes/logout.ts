import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';
import { removeCookies } from "../cookies";
import { removeSession } from "../user";

const { JWT_SECRET } = process.env!;

export async function logout(request: FastifyRequest, reply: FastifyReply) {
	try {
		if (request?.cookies?.refreshToken) {
			const { refreshToken } = request.cookies;
			const { sessionToken } = jwt.verify(refreshToken, JWT_SECRET as string) as { sessionToken: string };
			await removeSession(sessionToken);
		}
	} catch (error) {
		console.error(error);
	} finally {
		removeCookies(reply);
		reply.send({ success: 'Logged Out' });
	}
}