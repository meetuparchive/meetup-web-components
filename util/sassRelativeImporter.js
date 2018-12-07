// node-sass importer to resolve path names locally of imports from
// node_modules the same way css-loader does with ~ as a prefix
// used in build:css to build css from sass

const path = require('path');

module.exports = function(url, prev, done) {
	if (url[0] === '~') {
		url = path.resolve('node_modules', url.substr(1));
	}
	return { file: url };
};
