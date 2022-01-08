import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { unexpectedError } from '../errors';
import { getUserFromEmail, updateUserPassword } from '../user';
import { hashPassword } from '../user/password';

interface resetForgotPasswordData {
	token: string;
	newPassword: string;
	confirmPassword: string;
}

export async function resetForgotPassword(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const { JWT_SECRET } = process.env;
	const { token, newPassword, confirmPassword } =
		request.body as resetForgotPasswordData;
	const userData = jwt.verify(token, JWT_SECRET!) as {
		email: string;
		userid: string;
	};
	const user = await getUserFromEmail(userData.email);

	if (!user || user.id !== userData.userid) {
		return reply.status(400).send({
			error: 'Issue resetting password',
		});
	}

	if (newPassword !== confirmPassword) {
		return reply.status(400).send({
			error: 'Passwords did not match',
		});
	}

	const hashedPassword = await hashPassword(newPassword);
	if (!hashedPassword) {
		return unexpectedError(reply);
	}

	await updateUserPassword(hashedPassword, user.id, reply);
	reply.send({
		success: 'Password has been reset',
	});
}
