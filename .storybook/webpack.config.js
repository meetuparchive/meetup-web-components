const path = require('path');
const SvgStore = require('webpack-svgstore-plugin');

const ICON_PATH = path.resolve(__dirname, '../icons', '**/*.svg');

module.exports = {
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
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
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
	]
};

