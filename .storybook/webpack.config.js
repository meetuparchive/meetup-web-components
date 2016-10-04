const path = require('path');
const SvgStore = require('webpack-svgstore-plugin');

const ICON_PATH = path.resolve(__dirname, '../foundation-react', 'icons', '**/*.svg');
const settings = require('../scripts/webpack/settings.js');

const config = {
	resolve: {
		alias: {
			'trns': path.resolve(__dirname, '../', 'src', 'trns', 'en-US'),
		},
		extensions: ['', '.js', '.jsx']  // module name extensions
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: path.resolve(__dirname, '../')
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass'],
				include: path.resolve(__dirname, '../')
			},
			{
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json'
			},
			{
				test: /\.jsx?$/,
				include: [
					settings.appPath,
					settings.platformPath,
					settings.foundationPath,
				],
				loader: 'babel-loader',
			}
		]
	},
	plugins: [
		new SvgStore(
			//=========> input path
			[ICON_PATH],
			//=========> output path
			'svg',
			//=========> options
			{
				name: '[hash].sprite.svg',
				chunk: 'preview',
				prefix: 'icon-',
				svgoOptions: {
					plugins: [
						{ removeTitle: true }
					]
				}
			}
		)
	],  // plugins will be injected as needed by webpack consumers
};

module.exports = config;
