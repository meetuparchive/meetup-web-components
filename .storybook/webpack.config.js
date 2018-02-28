const path = require('path');

const SCSS_PATH = path.resolve(__dirname, '../assets', 'scss');
const CSS_PATH = path.resolve(__dirname, '../assets', 'css');
const SRC_PATH = path.resolve(__dirname, '../src');
const IMG_PATH = path.resolve(__dirname, '../assets', 'images');
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
				test: /\.module\.scss$/,
				include: SRC_PATH,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							modules: true,
							localIdentName: '_[name]_[local]__[hash:base64:5]',
						},
					},
					{
						loader: 'postcss-loader',
						options: OPTS_POSTCSS
					},
					'sass-loader',
				]
			},
			{
				test: /\.scss$/,
				include: SCSS_PATH,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						},
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
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader',
				include: [IMG_PATH],
			}
		]
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},

};

