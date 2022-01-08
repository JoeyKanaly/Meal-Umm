import fastify from 'fastify';
import cookie, { FastifyCookieOptions } from 'fastify-cookie';
import fastifyCors from 'fastify-cors';
import mercurius from 'mercurius';
import './env.ts';
import { resolvers } from './graphql/resolvers';
import { schema } from './graphql/schema';
import { changePassword } from './routes/changePassword';
import { forgotPassword } from './routes/forgotPassword';
import { login } from './routes/login';
import { logout } from './routes/logout';
import { register } from './routes/register';
import { resetForgotPassword } from './routes/resetForgotPassword';
import { verifyEmail } from './routes/verify';
const server = fastify();
if (!process.env) {
	throw Error('Enviornment Variables not loaded!');
}
const { SERVER_PORT, COOKIE_SECRET } = process.env;

server.register(cookie, {
	secret: COOKIE_SECRET,
} as FastifyCookieOptions);
server.register(fastifyCors, {
	origin: [/\.ummeal.dev/, 'https://ummeal.dev'],
	credentials: true,
});

server.register(mercurius, {
	schema,
	resolvers,
	graphiql: true,
	allowBatchedQueries: true,
});

server.post('/auth/register', register);
server.post('/auth/login', login);
server.post('/auth/logout', logout);
server.post('/auth/verify', verifyEmail);
server.post('/auth/changepassword', changePassword);
server.post('/auth/forgotpassword', forgotPassword);
server.post('/auth/resetforgotpassword', resetForgotPassword);
server.get('/', (request, reply) => {
	reply.send({
		data: 'SUCCESS',
	});
});

server.listen(SERVER_PORT!);
console.log(`Server listening at localhost:${SERVER_PORT}`);
