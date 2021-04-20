module.exports = {
	root: true,
	extends: ['wesbos/typescript.js'],
	rules: {
		indent: ['error', 'tab'],
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				singleQuote: true,
				endOfLine: 'lf',
			},
		],
	},
	globals: {
		JSX: true,
		React: true,
	},
};
