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
	end: 'flexEnd'
};

export const DIRECTION_ROW = 'row';
export const DIRECTION_COLUMN = 'column';

export const FLEX_CLASS = 'flex';
export const FLEX_ROW_CLASS = `${FLEX_CLASS}--${DIRECTION_ROW}`;
export const FLEX_COLUMN_CLASS = `${FLEX_CLASS}--${DIRECTION_COLUMN}`;
export const FLEX_WRAP_CLASS = `${FLEX_CLASS}--wrap`;
export const FLEX_NOGUTTER_CLASS = `${FLEX_CLASS}--noGutters`;
export const FLEX_ALIGN_CLASS = `${FLEX_CLASS}--align`;

/**
 * Design System Component: Provides `Flex` styled container for ideal use with `FlexItem` content
 * @module Flex
 */
class Flex extends React.Component {
	/**
	 * @return {React.element} the commend form React element
	 */
	render() {
		const {
			direction,
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

		const isColumn = direction === DIRECTION_COLUMN;
		const classNames = cx(
			FLEX_CLASS,
			{
				// horizontal default
				[FLEX_ROW_CLASS]: !isColumn,
				[`${VALID_BREAKPOINTS[switchDirection]}_${FLEX_COLUMN_CLASS}`]: !isColumn && switchDirection,

				// vertical default
				[FLEX_COLUMN_CLASS]: isColumn,
				[`${VALID_BREAKPOINTS[switchDirection]}_${FLEX_ROW_CLASS}`]: isColumn && switchDirection,

				// reverse breakpoint modifiers
				[`${rowReverseBreakpoint}_flex--rowReverse`]: rowReverse,
				[`${columnReverseBreakpoint}_flex--columnReverse`]: columnReverse,

				// other
				[FLEX_WRAP_CLASS]: wrap,
				[FLEX_NOGUTTER_CLASS]: noGutters,
				[`${FLEX_CLASS}--${VALID_SPACE[justify]}`]: justify,
				[`${FLEX_ALIGN_CLASS}${VALID_ALIGNMENTS[align]}`]: align,
			}, className);

		return (
			<div
				className={classNames}
				{...other}
			>
				{children}
			</div>
		);
	}
}

Flex.propTypes = {
	align: React.PropTypes.oneOf(Object.keys(VALID_ALIGNMENTS)),
	justify: React.PropTypes.oneOf(Object.keys(VALID_SPACE)),
	wrap: React.PropTypes.bool,
	noGutters: React.PropTypes.bool,

	direction: React.PropTypes.oneOf([
		DIRECTION_ROW,
		DIRECTION_COLUMN,
	]),
	switchDirection: React.PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS)),

	rowReverse: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
	]),
	columnReverse: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
	]),
};

Flex.defaultProps = {
	direction: DIRECTION_ROW,
};

export default Flex;
