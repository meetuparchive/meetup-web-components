import React from 'react';
import { MEDIA_QUERIES } from '../designConstants';

const breakpointNames = Object.keys(MEDIA_QUERIES);

/**
 * @param {String} breakpoint - name of breakpoint (for example, 'medium')
 * @returns {String} - state property name (for example, isAtMediumUp)
 */
export const getStateNameByBreakpoint = breakpoint => {
	const capitalizedBp = `${breakpoint.substr(0,1).toUpperCase()}${breakpoint.substr(1)}`;
	return `isAt${capitalizedBp}Up`;
};

/**
 * @param {Array} mediaQueries - list of matchMedia-created MediaQueryList objects
 * @param {Array} breakpoints - array of breakpoint names that were passed to HOC
 * @returns {Object} - updated `state` object for `withMatchMedia`
 */
export const getUpdatedMediaState = (mediaQueries) => mediaQueries
	.reduce((state, mq, i) => {
		state[getStateNameByBreakpoint(breakpointNames[i])] = mq.matches;
		return state;
	}, {});


/**
 * Provides viewport-aware props to wrapped component.
 *
 * @param {React.element} WrappedComponent - the component to wrap
 * @param {Array} breakpoints - array of breakpoint names to watch
 */
export const withMatchMedia = (
	WrappedComponent
) => class extends React.Component {
	/**
	 * @constructor
	 * @param {Object} - React element props
	 */
	constructor(props) {
		super(props);

		this.state = {
			media: {}
		};

		this.handleMediaChange = this.handleMediaChange.bind(this);
	}

	/**
	 * handles media change for _all_ breakpoints configured
	 * updates state.media with matched media
	 * @returns {undefined}
	 */
	handleMediaChange() {
		const updated = getUpdatedMediaState(this.mediaQueries);
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

		this.mediaQueries = breakpointNames
			.map(bp => window.matchMedia(MEDIA_QUERIES[bp]));

		// add listners for every MediaQueryList object
		this.mediaQueries.forEach(mq => {
			mq.addListener(this.handleMediaChange);
		});

		this.setState({ media: getUpdatedMediaState(this.mediaQueries) });
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
	 * `media` prop is provided to the wrapped component in render().
	 *
	 * When `this.mediaListeners` detect a media change, `this.state.media` is updated
	 * and the component will re-render with correct media-conditional prop values.
	 *
	 * @returns {React.element}
	 */
	render() {
		return (
			<WrappedComponent
				{...this.props}
				media={this.state.media}
			/>
		);
	}
};
