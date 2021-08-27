import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { invalidDataError, unexpectedError } from "../errors";
import { getUserFromCookies, sendVerificationEmail, setUserVerified } from "../user";

interface VerifyEmail {
	token: string;
}

export async function verifyEmail(request: FastifyRequest, reply: FastifyReply) {
	if (!process.env) {
		console.error('Env variables not loaded')
		return unexpectedError(reply);
	}
	if (!request.body) {
		return invalidDataError(reply);
	}
	try {
		const user = await getUserFromCookies(request, reply);
		if (!user.verified) {
			const { JWT_SECRET } = process.env;
			const { token } = request.body as VerifyEmail;
			const data = jwt.verify(token, JWT_SECRET!, { jwtid: user.id });
			await setUserVerified(user.id);
		}
		return reply.send({ success: 'Email verified' });
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			console.error(error);
			reply.send({
				error: "Verification link expired"
			});
			const user = await getUserFromCookies(request, reply);
			await sendVerificationEmail(user.email, user.id);
		} else {
			console.error(error);
			unexpectedError(reply);
		}
	}
}

