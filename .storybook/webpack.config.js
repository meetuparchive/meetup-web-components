const path = require('path');

const SCSS_PATH = path.resolve(__dirname, '../assets', 'scss');
const CSS_PATH = path.resolve(__dirname, '../assets', 'css');
const SRC_PATH = path.resolve(__dirname, '../src');
const PLATFORM_PATH = /node_modules\/meetup-web-platform/;

module.exports = {
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loader: 'eslint-loader?{fix:true}',
				include: SRC_PATH
			}
		],
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: CSS_PATH
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass'],
				include: SCSS_PATH
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
		extensions: ['', '.js', '.jsx']
	}
};

