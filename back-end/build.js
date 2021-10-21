import esbuild from 'esbuild';

let makeAllPackagesExternalPlugin = {
	name: 'make-all-packages-external',
	setup(build) {
		let filter = /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/; // Must not start with "/" or "./" or "../"
		build.onResolve({ filter }, (args) => ({
			path: args.path,
			external: true,
		}));
	},
};

esbuild.build({
	plugins: [makeAllPackagesExternalPlugin],
	entryPoints: ['./src/index.ts'],
	bundle: true,
	platform: 'node',
	format: 'esm',
	minify: true,
	outfile: './build/index.js',
});
