import { v4 as uuidv4 } from 'uuid';
import { connectionData } from '../types/connectionData';
import { query } from '../db';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';
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

export async function verifyUser(
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
