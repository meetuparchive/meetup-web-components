import React from 'react';
import cx from 'classnames';


export const VALID_ALIGNMENTS = {
	top: 'Top',
	bottom: 'Bottom',
	center: 'Center',
};

export const VALID_BREAKPOINTS = {
	all: 'atAll',
	medium: 'atMedium',
	large: 'atLarge',
};

export const VALID_SPACE = {
	center: 'center',
	around: 'spaceAround',
	between: 'spaceBetween',
	flex: 'flexEnd'
};

/**
 * @module Flex
 */
class Flex extends React.Component {

	static get defaultProps() {
		return {
			direction: 'row'
		};
	}

	render() {
		const {
			row,
			column,
			switchDirection,
			wrap,
			noGutters,
			justify,
			align,
			rowReverse,
			columnReverse,
			children,
			className,
			...other
		} = this.props;

		const columnReverseBreakpoint = VALID_BREAKPOINTS[columnReverse] || VALID_BREAKPOINTS['all'];
		const rowReverseBreakpoint = VALID_BREAKPOINTS[rowReverse] || VALID_BREAKPOINTS['all'];

		const classNames = cx(
			'flex',
			{
				// horizontal default
				'flex--row' : row,
				[`${switchDirection}_flex--column`]: row && switchDirection,

				// vertical default
				'flex--column': column,
				[`${switchDirection}_flex--row`]: column && switchDirection,

				// other
				'flex--wrap': wrap,
				'flex--noGutters': noGutters,
				[`flex--${VALID_SPACE[justify]}`]: justify,
				[`flex--align${VALID_ALIGNMENTS[align]}`]: align,

				// reverse breakpoint modifiers
				[`${rowReverseBreakpoint}_flex--rowReverse`]: rowReverse,
				[`${columnReverseBreakpoint}_flex--columnReverse`]: columnReverse,
			}, className);

		return (
			<div
				className={classNames}
				{...other}>
					{children}
			</div>
		);
	}
}

Flex.propTypes = {
	align: React.PropTypes.oneOf(Object.keys(VALID_ALIGNMENTS)),
	justify: React.PropTypes.oneOf(Object.keys(VALID_SPACE)),
	noGutters: React.PropTypes.bool,

	row: React.PropTypes.bool,
	column: React.PropTypes.bool,
	switchDirection: React.PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS)),

	columnReverse: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
	]),
	rowReverse: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
	]),

	wrap: React.PropTypes.bool
};

export default Flex;
