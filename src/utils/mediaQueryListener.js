import { BREAKPOINTS } from './designConstants';

/**
	@module MediaListener
 */
class MediaListener {
	constructor(changeHandler) {
		this.changeHandler = changeHandler;
		this.mqls = this._buildMediaQueryLists(BREAKPOINTS);
	}

	stopListening() {
		for (const name in this.mqls) {
			const mql = this.mqls[name];
			mql.removeListener &&
			mql.removeListener(mql._fn);
		}
	}

	getCurrentBP() {
		const mqList = this._buildMediaQueryLists(BREAKPOINTS);
		const mqMatches = [];

		if (!window.matchMedia) return;

		for (const sizeName in mqList){
			if (mqList[sizeName].matches) {
				mqMatches.push(sizeName);
			}
		}

		return mqMatches.slice(-1)[0];

	}

	// getTheBP() {
	// 	const mqList = this._buildMediaQueryLists(BREAKPOINTS);
	// 	const sizeMatches = [];

	// 	for (const sizeName in mqList) {
	// 		if (window.matchMedia(mqList[sizeName].media).matches) {
	// 			console.log(`${mqList[sizeName].media} matches`);
	// 			sizeMatches.push(sizeName);
	// 		} else {
	// 			console.log(`${mqList[sizeName].media} DOES NOT match`);
	// 		}
	// 	}

	// 	return sizeMatches.slice(-1)[0];

	// }


	_setupListeners(name, mediaQuery) {
		if (!window.matchMedia) return;

		const mql = window.matchMedia(mediaQuery);
		mql._fn = function (e) {
			return this._handleMediaQueryChange(e.matches, name);
		}.bind(this);
		mql.addListener(mql._fn);

		return mql;
	}

	_buildMediaQueryLists(mediaQueries) {
		if (!window.matchMedia) return {};

		const mqls = {};
		for (const name in mediaQueries) {
			const mql = this._setupListeners(name, `(min-width: ${mediaQueries[name]})`);
			mqls[name] = mql;

			this._handleMediaQueryChange(mql.matches, name);
		}

		return mqls;
	}

	_handleMediaQueryChange(matches, name) {
		// console.log('_handleMediaQueryChange', name);

		// if (matches) {
		// 	console.log(`CHANGE STATE: ${name}`);
		// 	// return this.changeHandler(name);
		// }

		return this.changeHandler(name);
	}

}

export default MediaListener;
