import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { setAuthCookies } from '../cookies';
import { query } from '../db';
import { sendEmail } from '../email';
import { invalidUserError, sessionExpiredError, unexpectedError } from '../errors';

export async function createUser(
	email: string,
	password: string
): Promise<string> {
	try {
		// Check user doesn't already exist
		const exits = await query('SELECT email FROM auth.user WHERE email=$1', [
			email,
		]);
		if (exits.rows.length) {
			throw Error('user already exists');
		}
		// Insert data into database
		const userId = uuidv4();
		const user = await query(
			'INSERT INTO auth."user" (id, email, password) VALUES ($1, $2, $3)',
			[userId, email, password]
		);
		// Return the userid
		return userId;
	} catch (error) {
		return '';
	}
}

export async function createSession(
	userId: string,
	connectionInformation: connectionData
): Promise<string> {
	try {
		const sessionToken = randomBytes(43).toString('hex');
		const { ip, userAgent } = connectionInformation;
		const queryParams = [
			uuidv4(),
			userId,
			sessionToken,
			ip,
			userAgent,
			new Date(),
			new Date(),
		];
		await query(
			'INSERT INTO auth."session" ("id", "userId", "sessionToken", "ip", "userAgent", "updatedAt", "createdAt") VALUES ($1, $2, $3, $4, $5, $6, $7)',
			queryParams
		);
		return sessionToken;
	} catch (error) {
		console.error(error);
		return '';
	}
}

export async function verifyUserLogin(
	email: string,
	password: string
): Promise<string> {
	try {
		const user = await query(
			'SELECT "id", "password" FROM auth."user" WHERE email=$1',
			[email]
		);
		if (!user.rowCount) {
			return '';
		}

		const hashedPassword = user.rows[0]['password'];
		const validUser = await argon2.verify(hashedPassword, password);

		if (validUser) {
			return user.rows[0]['id'];
		}
		return '';
	} catch (error) {
		return '';
		console.error(error);
	}
}

export async function removeSession(session: string): Promise<void> {
	try {
		const result = await query('DELETE FROM auth."session" WHERE "sessionToken"=$1', [session]);
	} catch (error) {
		console.error(error);
	}
}


// TODO: Refactor this, should only be sending the email, should not be generating the verification token as well
export async function sendVerificationEmail(email: string, userId: string) {
	try {
		const { ROOT_DOMAIN, JWT_SECRET } = process.env;
		const verificationToken = jwt.sign(
			{
				email,
			}, JWT_SECRET!,
			{
				expiresIn: '1h',
				jwtid: userId
			}
		);
		const verificationLink = `https://${ROOT_DOMAIN}/verify?token=${verificationToken}`;
		await sendEmail({
			recipient: email,
			subject: 'umMeal email verification',
			message: `Verify email at: ${verificationLink}\nThis link will expire in 1 hour.`,
			htmlMessage: `Click here to <a href="${verificationLink}">verify your email</a>.
						  <br/>This link will expire in 1 hour.`
		});
	} catch (error) {
		console.error(error);
	}
}

export async function sendResetPasswordEmail(email: string, token: string) {
	const { ROOT_DOMAIN } = process.env;

	const resetLink = `https://${ROOT_DOMAIN}/reset-password?token=${token}`;

	await sendEmail({
		recipient: email,
		subject: 'umMeal Reset Your Password',
		message: `Go to ${resetLink} to reset your password.\nThis link will expire in 15 minutes`,
		htmlMessage: `Click to <a href="${resetLink}">reset your password.</a>
					  <br/>This link will expire in 15 minutes.`
	});
}

interface TokenData {
	sessionToken: string;
	userId?: string;
}

export async function getUserFromCookies(request: FastifyRequest, reply: FastifyReply) {
	try {
		const { authToken, refreshToken } = request.cookies;
		if (!process.env) {
			// TODO: Look into handling errors with custom error types
			throw Error('Environment variables not loaded');
		}
		const { JWT_SECRET } = process.env;
		if (authToken) {
			const decodedAuthToken = jwt.verify(authToken, JWT_SECRET!) as TokenData;
			const user = await query('SELECT * FROM auth."user" WHERE id=$1', [
				decodedAuthToken.userId || ''
			]);
			if (!user.rowCount) {
				return invalidUserError(reply);
			}
			return user.rows[0];
		}

		if (refreshToken) {
			const decodedRefreshToken = jwt.verify(refreshToken, JWT_SECRET!) as TokenData;
			const session = await query('SELECT * FROM auth."session" WHERE session."sessionToken"=$1', [
				decodedRefreshToken.sessionToken
			]);
			if (!session.rowCount || !session.rows[0].valid) {
				return sessionExpiredError(reply);
			}
			const user = await query('SELECT * FROM auth."user" WHERE id=$1', [
				session.rows[0].userId
			]);
			await setAuthCookies(session.rows[0].sessionToken, session.rows[0].userId, reply);
			return user.rows[0];
		}
	} catch (error) {
		console.error(error);
		return unexpectedError(reply);
	}
	sessionExpiredError(reply);
}

export async function setUserVerified(userId: string) {
	try {
		await query('UPDATE auth."user" SET "verified"=TRUE WHERE "id"=$1', [
			userId
		]);
	} catch (error) {
		console.error(error);
	}
}

export async function updateUserPassword(hashedPassword: string, userId: string, reply: FastifyReply) {
	try {
		await query('UPDATE auth."user" SET "password"=$1 WHERE "id"=$2', [
			hashedPassword,
			userId
		]);
	} catch (error) {
		console.error(error);
		return unexpectedError(reply);
	}
}

export async function getUserFromEmail(email: string) {
	try {
		const result = await query('SELECT * FROM auth."user" WHERE "email"=$1', [email]);
		if (result.rowCount) {
			return result.rows[0] as UserInfo;
		}
	} catch (error) {
	}
}