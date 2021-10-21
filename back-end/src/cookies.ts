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

// TODO: Rename authToken to accessToken

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
		const authTokenExpiration = new Date(now.setTime(now.getTime() + (15 * 60 * 1000)))
		const refreshTokenExpiration = new Date(now.setDate(now.getDate() + 30));

		reply
			.setCookie('authToken', authToken, {
				...cookieOptions,
				expires: authTokenExpiration
			})
			.setCookie('refreshToken', refreshToken, {
				...cookieOptions,
				expires: refreshTokenExpiration,
			});
	} catch (error) {
		console.error(error);
	}
}

export function removeCookies(reply: FastifyReply) {
	reply.clearCookie('refreshToken', cookieOptions).clearCookie('authToken', cookieOptions);
}