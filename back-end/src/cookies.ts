import { CookieSerializeOptions } from 'fastify-cookie';
import { FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

const { JWT_SECRET, ROOT_DOMAIN } = process.env!;

async function createTokens(session: string, userId: string) {
	if (!JWT_SECRET) {
		throw Error('JWT Secret not loaded');
	}
	const authToken = jwt.sign(
		{
			session,
			userId,
		},
		JWT_SECRET
	);
	const refreshToken = jwt.sign(
		{
			session,
		},
		JWT_SECRET
	);
	return { authToken, refreshToken };
}

export async function setAuthCookies(
	session: string,
	userId: string,
	reply: FastifyReply
) {
	try {
		const { authToken, refreshToken } = await createTokens(session, userId);
		const now: Date = new Date();
		const expiration = new Date(now.setDate(now.getDate() + 30));

		const cookieOptions: CookieSerializeOptions = {
			path: '/',
			domain: ROOT_DOMAIN,
			httpOnly: true,
			secure: true,
		};
		reply
			.setCookie('authToken', authToken, cookieOptions)
			.setCookie('refreshToken', refreshToken, {
				...cookieOptions,
				expires: expiration,
			});
	} catch (error) {
		console.error(error);
	}
}
