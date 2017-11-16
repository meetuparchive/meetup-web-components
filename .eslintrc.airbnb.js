const config = {
	root: true,
	parser: 'babel-eslint',
	extends: ['airbnb', 'prettier', 'prettier/flowtype', 'prettier/react'],
	parserOptions: {
		ecmaVersion: 6,
		ecmaFeatures: {
			jsx: true,
			experimentalObjectRestSpread: true,
		},
		sourceType: 'module',
	},
	env: {
		browser: true,
		node: true,
		jest: true,
		jasmine: true,
		es6: true,
	},
	plugins: ['flowtype', 'react', 'meetup'],
	rules: {
		'no-tabs': 0,
	},
};

module.exports = config;
