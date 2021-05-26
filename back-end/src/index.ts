import './env.ts';
import cookie, { FastifyCookieOptions } from 'fastify-cookie';
import fastify from 'fastify';
import { register } from './routes/register';
import { login } from './routes/login';
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

server.post('/api/register', register);
server.post('/api/login', login);

server.get('/', (request, reply) => {
	reply.send({
		data: 'SUCCESS',
	});
});

server.listen(SERVER_PORT!);
console.log(`Server listening at localhost:${SERVER_PORT}`);
