import React from 'react';
import { MEDIA_QUERIES } from '../designConstants';

/**
 * @param {String} breakpoint - name of breakpoint (for example, 'medium')
 * @returns {String} - state property name (for example, isAtMediumUp)
 */
export const getStateNameByBreakpoint = (breakpoint) => {
	const capitalizedBp = breakpoint[0].toUpperCase() + breakpoint.slice(1);
	return `isAt${capitalizedBp}Up`;
};

/**
 * @param {Array} ...breakpoints
 * @throws {Error}
 * @return {undefined}
 */
export const validateBreakpoints = (breakpoints) => {
	const validBreakpoints = Object.keys(MEDIA_QUERIES);

	if (!breakpoints) {
		throw new Error('withMatchMedia: breakpoints array required');
	}

	breakpoints.forEach(bp => {
		if (!validBreakpoints.includes(bp)) {
			throw new Error(`withMatchMedia: ${bp} is not a valid breakpoint name`);
		}
	});
};


/**
 * Provides viewport-aware props to wrapped component.
 *
 * @param {React.element} InnerComponent - the component to wrap
 * @param {Array} ...breakpoints - array of breakpoint names to watch
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
		validateBreakpoints(breakpoints);

		this.handleMediaChange = this.handleMediaChange.bind(this);

		this.state = {
			media: {}
		};

		breakpoints.forEach(bp => {
			this.state.media[getStateNameByBreakpoint(bp)] = false;
		});
	}

	/**
	 * handles media change for _all_ breakpoints configured
	 * updates state.media with matched media
	 * @returns {undefined}
	 */
	handleMediaChange() {
		const updatedMedia = {};
		this.mediaQueries.forEach((mq, i) => {
			updatedMedia[getStateNameByBreakpoint(breakpoints[i])] = mq.matches;
		});
		this.setState({
			media: {...this.state.media, ...updatedMedia}
		});
	}

	/**
	 * react lifecycle method
	 * sets up media queries and listeners
	 * @returns {undefined}
	 */
	componentDidMount() {
		if (typeof window.matchMedia != undefined) {

			// map breakpoints to MediaQueryList objects...
			this.mediaQueries = breakpoints
				.map(bp => window.matchMedia(MEDIA_QUERIES[bp]));

			// and add a listener for each
			this.mediaQueries.forEach(mq => {
				mq.addListener(this.handleMediaChange);
			});

			// fire media handler immediately on mount to populate `this.state.media`
			this.handleMediaChange();
		}
	}

	/**
	 * react lifecycle method
	 * clean up media query listeners on unmount
	 * @returns {undefined}
	 */
	componentWillUnmount() {
		this.mediaQueries.forEach((mq, i) => {
			mq.removeListener(this.handleMediaChange);
			this.mediaQueries.splice(i, 1);
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
				{...mediaProps}
				{...this.props}
			/>
		);
	}
};

// TODO: remove this; just using it to sketch out the interface
/*
 *class SketchWithMedia extends React.Component {
 *    render() {
 *        const {
 *            isAtSmallUp,
 *            isAtMediumUp,
 *            isAtLargeUp
 *        } = this.state;
 *
 *        return (
 *            <div>
 *                <h1>Your viewport is bigger than:</h1>
 *                <ul>
 *                    {isAtSmallUp && <li>Small</li>}
 *                    {isAtMediumUp && <li>Medium</li>}
 *                    {isAtLargeUp && <li>Large</li>}
 *                </ul>
 *            </div>
 *        );
 *    }
 *}
 */
