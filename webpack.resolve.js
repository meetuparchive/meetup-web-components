const { resolve } = require('path');

const CWD = process.cwd();

module.exports = {
	resolve: {
		alias: {
			src: resolve(CWD, 'src'),
			trns: resolve(CWD, 'src/trns/modules/en-US'),
		},
		extensions: ['.jsx', '.js', '.json'],
	},
};
