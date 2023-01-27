/* eslint-disable no-undef */
module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		eqeqeq: 'error',
		'object-curly-spacing': ['error', 'always'],
		'arrow-spacing': ['error', { before: true, after: true }],
	},
}
