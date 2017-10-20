const path = require('path');
const System = {
	import: function(pathRelToCallingScript) {
		// we can't pass `pathRelToCallingScript` directly to `require` because it
		// will be resolved relative to this shim - instead, we need to find out
		// the path of the calling script and use that to get the absolute
		// path of pathRelToCallingScript

		// easiest access to the call stack is through the `Error` object
		const stack = new Error().stack;
		// in the error stack, the calling script will be on the third line
		const stackLineIndexOfCallingScript = 2;
		// in the calling script line, we can get the absolute path from inside the
		// parens, before the `:line:char` info
		const matchPathFromStack = /\(([^:]+)/;

		const pathToCallingScript = stack
			.split('\n')[stackLineIndexOfCallingScript]
			.match(matchPathFromStack)[1];

		// we want to resolve the imported module relative to the directory
		const absoluteDir = path.dirname(pathToCallingScript);

		// resolve the absolute path
		const absolutePath = path.resolve(absoluteDir, pathRelToCallingScript);

		// **now** we can require it and return a Promise
		return Promise.resolve(require(absolutePath));
	}
};

global.System = System;

