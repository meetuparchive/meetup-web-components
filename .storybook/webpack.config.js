const path = require('path');

const SCSS_PATH = path.resolve(__dirname, '../assets', 'scss');
const CSS_PATH = path.resolve(__dirname, '../assets', 'css');
const SVG_PATH = path.resolve(__dirname, '../assets', 'svg');
const SRC_PATH = path.resolve(__dirname, '../src');
const PLATFORM_PATH = /node_modules\/meetup-web-platform/;

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
				loaders: ['style-loader', 'css-loader'],
				include: CSS_PATH
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader'],
				include: SCSS_PATH
			},
			{
				test: /\.svg$/,
				loaders: ['file-loader'],
				include: SVG_PATH
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

