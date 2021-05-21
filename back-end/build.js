import esbuild from 'esbuild';

esbuild.build({
	entryPoints: ['./src/index.ts'],
	platform: 'neutral',
	minify: true,
	outfile: './build/index.js',
});
