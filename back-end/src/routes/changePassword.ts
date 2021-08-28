import argon2 from 'argon2';
import { FastifyReply, FastifyRequest } from 'fastify';
import { unexpectedError } from '../errors';
import { getUserFromCookies, updateUserPassword } from '../user';
import { hashPassword } from '../user/password';

interface PasswordChange {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export async function changePassword(request: FastifyRequest, reply: FastifyReply) {
	try {
		// Get the user from cookies
		const user = await getUserFromCookies(request, reply);
		// Get the incoming paramaters (current password, new password, confirmed password)
		const { currentPassword, newPassword, confirmPassword } = request.body as PasswordChange;
		// Verify new password and confirmed password match
		if (newPassword !== confirmPassword) {
			return reply.status(400).send({
				error: 'Passwords did not match'
			});
		}
		// Check the current password hash matches
		if (!await argon2.verify(user.password, currentPassword)) {
			return reply.status(400).send({
				error: 'Invalid password'
			});
		}
		// Generate new password hash
		const hashedPassword = await hashPassword(newPassword);
		if (!hashedPassword) {
			return unexpectedError(reply);
		}
		// Update user's password hash
		await updateUserPassword(hashedPassword, user.id, reply);
		reply.send({
			success: 'Password updated successfully'
		})
	} catch (error) {
		console.error(error);
	}
}