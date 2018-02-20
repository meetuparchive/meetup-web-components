const path = require('path');

const SCSS_PATH = path.resolve(__dirname, '../assets', 'scss');
const CSS_PATH = path.resolve(__dirname, '../assets', 'css');
const SRC_PATH = path.resolve(__dirname, '../src');
const PLATFORM_PATH = /node_modules\/meetup-web-platform/;

const OPTS_POSTCSS = {
	ident: 'postcss',
	plugins: (loader) => [
		require('postcss-cssnext')({
			browsers: [
				'last 2 versions',
				'not ie <= 10'
			],
			features: {
				customProperties: false
			}
		}),
		require('postcss-css-variables')({
			preserve: true
		})
	]
};

// placeholder for modules options
// modules: true,
// localIdentName: '_[name]_[local]__[hash:base64:5]',
const OPTS_CSS = {};

module.exports = {
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				loader: 'eslint-loader?{fix:true}',
				include: SRC_PATH
			},
			{
				test: /\.css$/,
				include: CSS_PATH,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {...OPTS_CSS,...{importLoaders: 1}},
					},
					{
						loader: 'postcss-loader',
						options: OPTS_POSTCSS
					},
				]
			},
			{
				test: /\.scss$/,
				include: SCSS_PATH,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {...OPTS_CSS,...{importLoaders: 2}},
					},
					{
						loader: 'postcss-loader',
						options: OPTS_POSTCSS
					},
					'sass-loader',
				]
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: [
					SRC_PATH,
					PLATFORM_PATH
				]
			}
		]
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},

};

