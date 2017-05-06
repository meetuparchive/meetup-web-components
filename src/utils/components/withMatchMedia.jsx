import React from 'react';
import { MEDIA_QUERIES } from '../utils/designConstants';

/**
 * @param {String} breakpoint - name of breakpoint
 * @returns {String} - prop name (for example, isAtMediumUp)
 */
export const createPropNameFromBreakpoint = (breakpoint) => {
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
	breakpoints = () => {
		throw new Error('withMatchMedia: breakpoints array required');
	}
) => class extends React.Component {
	/**
	 * @constructor
	 * @param {Object} - React element props
	 */
	constructor(props) {
		super(props);
		validateBreakpoints(...breakpoints);

		breakpoints.forEach(bp => {
			this.state[createPropNameFromBreakpoint(bp)] = false;
		});
	}

	/**
	 * react lifecycle method
	 * @returns {undefined}
	 */
	componentDidMount() {
		// TODO: add media change callbacks for custom hanlders
		// TODO: figure out if shit should be in state

		if (typeof window.matchMedia != undefined) {
			// let mediaQueries = [];

			/*
			 *breakpoints.forEach(bp => {
			 *    mediaQueries.push(
			 *        window.matchMedia(MEDIA_QUERIES[bp]);
			 *    );
			 *});
			 */
		}
	}

	/**
	 * react lifecycle method
	 * @returns {undefined}
	 */
	componentWillUnmount() {
	}

	render() {
		return (
			<InnerComponent
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
