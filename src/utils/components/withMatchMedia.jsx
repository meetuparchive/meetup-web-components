import React from 'react';
import { MEDIA_QUERIES } from '../designConstants';

/**
 * @param {String} breakpoint - name of breakpoint (for example, 'medium')
 * @returns {String} - state property name (for example, isAtMediumUp)
 */
export const getStateNameByBreakpoint = breakpoint => {
	const capitalizedBp = breakpoint[0].toUpperCase() + breakpoint.slice(1);
	return `isAt${capitalizedBp}Up`;
};

/**
 * @param {Array} mediaQueries - list of matchMedia-created MediaQueryList objects
 * @param {Array} breakpoints - array of breakpoint names that were passed to HOC
 */
export const getUpdatedMediaState = (mediaQueries, breakpoints) => {
	const updatedMedia = {};
	mediaQueries.forEach((mq, i) => {
		updatedMedia[getStateNameByBreakpoint(breakpoints[i])] = mq.matches;
	});
	return updatedMedia;
};

/**
 * @param {Array} validBreakpointNames list of VALID media query names ('large')
 * @param {Array} breakpointNames list of media query names to check for validity
 * @throws {Error}
 * @return {undefined}
 */
const validateBreakpoints = (validBreakpointNames, breakpointNames) => {
	breakpointNames.forEach(bp => {
		if (!validBreakpointNames.includes(bp)) {
			throw new Error(`withMatchMedia: ${bp} is not a valid breakpoint name`);
		}
	});
};


/**
 * Provides viewport-aware props to wrapped component.
 *
 * @param {React.element} InnerComponent - the component to wrap
 * @param {Array} breakpoints - array of breakpoint names to watch
 */
export const withMatchMedia = (
	InnerComponent,
	breakpoints
) => class extends React.Component {
	/**
	 * @constructor
	 * @param {Object} - React element props
	 */
	constructor(props) {
		super(props);

		validateBreakpoints(
			Object.keys(MEDIA_QUERIES),
			breakpoints
		);

		// map breakpoint names to MediaQueryList objects...
		this.mediaQueries = breakpoints
			.map(bp => window.matchMedia(MEDIA_QUERIES[bp]));

		this.state = {
			media: getUpdatedMediaState(this.mediaQueries, breakpoints)
		};

		this.handleMediaChange = this.handleMediaChange.bind(this);
	}

	/**
	 * handles media change for _all_ breakpoints configured
	 * updates state.media with matched media
	 * @returns {undefined}
	 */
	handleMediaChange() {
		const updated = getUpdatedMediaState(this.mediaQueries, breakpoints);
		this.setState({
			media: {...this.state.media, ...updated}
		});
	}

	/**
	 * react lifecycle method
	 * sets up MediaQueryList listeners
	 * @returns {undefined}
	 */
	componentDidMount() {
		if (!window.matchMedia) {
			return;
		}

		// add listners for every MediaQueryList object
		this.mediaQueries.forEach(mq => {
			mq.addListener(this.handleMediaChange);
		});
	}

	/**
	 * react lifecycle method
	 * clean up media query listeners on unmount
	 * @returns {undefined}
	 */
	componentWillUnmount() {
		this.mediaQueries.forEach(mq => {
			mq.removeListener(this.handleMediaChange);
		});
	}

	/**
	 * `isAt[Breakpoint]Up` props are provided to the wrapped component in render().
	 *
	 * When `this.mediaListeners` detect a media change, `this.state.media` is updated
	 * and the component will re-render with correct media-conditional prop values.
	 *
	 * @returns {React.element}
	 */
	render() {
		const mediaProps = {};

		breakpoints.forEach(bp => {
			const propName = getStateNameByBreakpoint(bp);
			mediaProps[propName] = this.state.media[propName];
		});

		return (
			<InnerComponent
				withMatchMediaInstance={this}
				{...mediaProps}
				{...this.props}
			/>
		);
	}
};
