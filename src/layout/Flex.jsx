import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';

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
	spaceAround: 'spaceAround',
	spaceBetween: 'spaceBetween',
	flexEnd: 'flexEnd',
	flexStart: 'flexStart',
};

export const DIRECTION_ROW = 'row';
export const DIRECTION_COLUMN = 'column';

export const FLEX_CLASS = 'flex';
export const FLEX_ROW_CLASS = `${FLEX_CLASS}--${DIRECTION_ROW}`;
export const FLEX_COLUMN_CLASS = `${FLEX_CLASS}--${DIRECTION_COLUMN}`;
export const FLEX_WRAP_CLASS = `${FLEX_CLASS}--wrap`;
export const FLEX_NOGUTTER_CLASS = `${FLEX_CLASS}--noGutters`;
export const FLEX_ALIGN_CLASS = `${FLEX_CLASS}--align`;
export const FLEX_JUSTIFY_RIGHT_CLASS = `${FLEX_CLASS}--justifyRight`;

/**
 * Design System Component: Provides `Flex` styled container for ideal use with `FlexItem` content
 * @module FlexComponent
 */
export class FlexComponent extends React.Component {
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
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			justifyItemsRight,
			...other
		} = this.props;

		const columnReverseBreakpoint =
			VALID_BREAKPOINTS[columnReverse] || VALID_BREAKPOINTS['all'];
		const rowReverseBreakpoint =
			VALID_BREAKPOINTS[rowReverse] || VALID_BREAKPOINTS['all'];

		const isColumn = direction === DIRECTION_COLUMN;
		const classNames = cx(
			FLEX_CLASS,
			{
				// horizontal default
				[FLEX_ROW_CLASS]: !isColumn,
				[`${VALID_BREAKPOINTS[switchDirection]}_${FLEX_COLUMN_CLASS}`]:
					!isColumn && switchDirection,

				// vertical default
				[FLEX_COLUMN_CLASS]: isColumn,
				[`${VALID_BREAKPOINTS[switchDirection]}_${FLEX_ROW_CLASS}`]:
					isColumn && switchDirection,

				// reverse breakpoint modifiers
				[`${rowReverseBreakpoint}_flex--rowReverse`]: rowReverse,
				[`${columnReverseBreakpoint}_flex--columnReverse`]: columnReverse,

				// other
				[FLEX_WRAP_CLASS]: wrap,
				[FLEX_NOGUTTER_CLASS]: noGutters,
				[`${FLEX_CLASS}--${VALID_SPACE[justify]}`]: justify,
				[`${FLEX_ALIGN_CLASS}${VALID_ALIGNMENTS[align]}`]: align,
				[FLEX_WRAP_CLASS]: wrap,
				'component--isLoading': isLoading,
				[FLEX_JUSTIFY_RIGHT_CLASS]: justifyItemsRight,
			},
			className
		);

		return (
			<div className={classNames} {...other}>
				{children}
			</div>
		);
	}
}

FlexComponent.propTypes = {
	/** Alignment of flex items along the axis of the flex direction */
	align: PropTypes.oneOf(Object.keys(VALID_ALIGNMENTS)),

	/** Justification of flex items along the axis of the flex direction */
	justify: PropTypes.oneOf(Object.keys(VALID_SPACE)),

	/** Whether flex items should wrap within their flex container */
	wrap: PropTypes.bool,

	/** Whether to render flex items without padding between them */
	noGutters: PropTypes.bool,

	/** Direction to lay out flex items */
	direction: PropTypes.oneOf([DIRECTION_ROW, DIRECTION_COLUMN]),

	/** The breakpoint at which the direction of the layout switches */
	switchDirection: PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS)),

	/** When to reverse the order of flex items along the row axis */
	rowReverse: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS)),
	]),

	/** When to reverse the order of flex items along the column axis */
	columnReverse: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS)),
	]),

	/** Whether the component is in a loading state */
	isLoading: PropTypes.bool,

	/** Props to pass to the `<Loading />` component */
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string,
	}),
};

FlexComponent.defaultProps = {
	direction: DIRECTION_ROW,
};

const Flex = withLoading(FlexComponent);
Flex.displayName = 'Flex';
export default Flex;
