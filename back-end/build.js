import esbuild from 'esbuild';

esbuild.build({
	entryPoints: ['./src/index.ts'],
	bundle: true,
	external: ['fastify', 'dotenv'],
	platform: 'node',
	format: 'esm',
	minify: true,
	outfile: './build/index.js',
});
