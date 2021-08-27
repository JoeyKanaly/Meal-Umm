import fastify from 'fastify';
import cookie, { FastifyCookieOptions } from 'fastify-cookie';
import fastifyCors from 'fastify-cors';
import './env.ts';
import { login } from './routes/login';
import { logout } from './routes/logout';
import { register } from './routes/register';
import { verifyEmail } from './routes/verify';

const server = fastify();
if (!process.env) {
	throw Error('Enviornment Variables not loaded!');
}
const { SERVER_PORT, COOKIE_SECRET } = process.env;

// # Things/Routes needed
// - Register
// - Login
// - Logout
// - Create Session
// - Set Cookies
// - Verify Email

server.register(cookie, {
	secret: COOKIE_SECRET,
} as FastifyCookieOptions);
server.register(fastifyCors, {
	origin: [/\.ummeal.dev/, 'https://ummeal.dev'],
	credentials: true,
});

server.post('/api/register', register);
server.post('/api/login', login);
server.post('/api/logout', logout);
server.post('/api/verify', verifyEmail);

server.get('/', (request, reply) => {
	reply.send({
		data: 'SUCCESS',
	});
});

server.listen(SERVER_PORT!);
console.log(`Server listening at localhost:${SERVER_PORT}`);
