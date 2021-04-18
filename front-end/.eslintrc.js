module.exports = {
	root: true,
	extends: ['wesbos/typescript.js'],
	rules: {
		indent: ['error', 'tab'],
		'@typescript-eslint/indent': ['error', 'tab'],
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				singleQuote: true,
			},
		],
	},
};
