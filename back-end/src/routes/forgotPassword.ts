import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { unexpectedError } from '../errors';
import { getUserFromEmail, sendResetPasswordEmail } from '../user';

export async function forgotPassword(request: FastifyRequest, reply: FastifyReply) {
	try {
		const { JWT_SECRET } = process.env;
		// Get email from request
		const { email } = request.body as { email: string };
		// Check that user email exists
		const user = await getUserFromEmail(email);
		if (user) {
			// Generate JWT with expiration of 15 minutes
			const token = jwt.sign({
				email: user?.email,
				userid: user?.id
			}, JWT_SECRET!, {
				expiresIn: '15m'
			});
			// Send Email with reset link
			sendResetPasswordEmail(email, token);
		}
		// Send Reply
		reply.send({
			success: "If user exists an email will be sent to reset password"
		})
	} catch (error) {
		console.error(error);
		unexpectedError(reply);
	}
}