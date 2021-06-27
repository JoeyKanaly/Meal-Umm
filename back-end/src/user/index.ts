import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../db';
import { sendMail } from '../email';
import { connectionData } from '../types/connectionData';
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
		await sendMail({
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