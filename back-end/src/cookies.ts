import { FastifyReply } from 'fastify';
import { CookieSerializeOptions } from 'fastify-cookie';
import jwt from 'jsonwebtoken';

const { JWT_SECRET, ROOT_DOMAIN } = process.env!;
const cookieOptions: CookieSerializeOptions = {
	path: '/',
	domain: ROOT_DOMAIN,
	httpOnly: true,
	secure: true,
	
};

async function createTokens(sessionToken: string, userId: string) {
	if (!JWT_SECRET) {
		throw Error('JWT Secret not loaded');
	}
	const authToken = jwt.sign(
		{
			sessionToken,
			userId,
		},
		JWT_SECRET
	);
	const refreshToken = jwt.sign(
		{
			sessionToken,
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

export function removeCookies(reply: FastifyReply) {
	reply.clearCookie('refreshToken', cookieOptions).clearCookie('authToken', cookieOptions);
}