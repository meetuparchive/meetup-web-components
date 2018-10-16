// @flow

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

export const VALID_ITEM_JUSTIFY = {
	left: 'left',
	right: 'right',
	center: 'center',
};

export const DIRECTION_ROW = 'row';
export const DIRECTION_COLUMN = 'column';

export const FLEX_CLASS = 'flex';
export const FLEX_ROW_CLASS = `${FLEX_CLASS}--${DIRECTION_ROW}`;
export const FLEX_COLUMN_CLASS = `${FLEX_CLASS}--${DIRECTION_COLUMN}`;
export const FLEX_WRAP_CLASS = `${FLEX_CLASS}--wrap`;
export const FLEX_NOGUTTER_CLASS = `${FLEX_CLASS}--noGutters`;
export const FLEX_ALIGN_CLASS = `${FLEX_CLASS}--align`;
export const FLEX_JUSTIFY_LEFT_CLASS = `${FLEX_CLASS}--justifyLeft`;
export const FLEX_JUSTIFY_RIGHT_CLASS = `${FLEX_CLASS}--justifyRight`;
export const FLEX_JUSTIFY_CENTER_CLASS = `${FLEX_CLASS}--justifyCenter`;

type Props = {
	className?: string,

	/** The child elements of the component */
	children: React$Node,

	/** Alignment of flex items along the axis of the flex direction */
	align?: 'top' | 'bottom' | 'center',

	/** Justification of flex items along the axis of the flex direction */
	justify?: 'center' | 'spaceAround' | 'spaceBetween' | 'flexEnd' | 'flexStart',

	/** Whether flex items should wrap within their flex container */
	wrap?: boolean,

	/** Whether to render flex items without padding between them */
	noGutters?: boolean,

	/** Direction to lay out flex items */
	direction?: 'row' | 'column',

	/** The breakpoint at which the direction of the layout switches */
	switchDirection?: 'all' | 'medium' | 'large',

	/** When to reverse the order of flex items along the row axis */
	rowReverse?: boolean | 'all' | 'medium' | 'large',

	/** When to reverse the order of flex items along the column axis */
	columnReverse?: boolean | 'all' | 'medium' | 'large',

	justifyItems?: 'left' | 'center' | 'right',

	/** Whether the component is in a loading state */
	isLoading?: boolean,

	/** Props to pass to the `<Loading />` component */
	loadingProps?: {
		color?: string,
		scrimColor?: string,
		size?: MediaSizes,
	},
};

/**
 * Design System Component: Provides `Flex` styled container for ideal use with `FlexItem` content
 * @module FlexComponent
 */
export class FlexComponent extends React.Component<Props> {
	static defaultProps = {
		direction: DIRECTION_ROW,
	};
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
			justifyItems,
			...other
		} = this.props;

		let columnReverseBreakpoint;
		if (typeof columnReverse === 'string') {
			columnReverseBreakpoint = VALID_BREAKPOINTS[columnReverse];
		} else {
			columnReverseBreakpoint = VALID_BREAKPOINTS['all'];
		}

		let rowReverseBreakpoint;
		if (typeof rowReverse === 'string') {
			rowReverseBreakpoint = VALID_BREAKPOINTS[rowReverse];
		} else {
			rowReverseBreakpoint = VALID_BREAKPOINTS['all'];
		}

		const isColumn = direction === DIRECTION_COLUMN;
		const classNames = cx(
			FLEX_CLASS,
			{
				// horizontal default
				[FLEX_ROW_CLASS]: !isColumn,
				// $FlowFixMe
				[`${VALID_BREAKPOINTS[switchDirection]}_${FLEX_COLUMN_CLASS}`]:
					!isColumn && switchDirection,

				// vertical default
				[FLEX_COLUMN_CLASS]: isColumn,
				// $FlowFixMe
				[`${VALID_BREAKPOINTS[switchDirection]}_${FLEX_ROW_CLASS}`]:
					isColumn && switchDirection,

				// reverse breakpoint modifiers
				[`${rowReverseBreakpoint}_flex--rowReverse`]: rowReverse,
				[`${columnReverseBreakpoint}_flex--columnReverse`]: columnReverse,

				// other
				[FLEX_WRAP_CLASS]: wrap,
				[FLEX_NOGUTTER_CLASS]: noGutters,
				// $FlowFixMe
				[`${FLEX_CLASS}--${VALID_SPACE[justify]}`]: justify,
				// $FlowFixMe
				[`${FLEX_ALIGN_CLASS}${VALID_ALIGNMENTS[align]}`]: align,
				[FLEX_WRAP_CLASS]: wrap,
				'component--isLoading': isLoading,
				[FLEX_JUSTIFY_LEFT_CLASS]: justifyItems === VALID_ITEM_JUSTIFY.left,
				[FLEX_JUSTIFY_RIGHT_CLASS]: justifyItems === VALID_ITEM_JUSTIFY.right,
				[FLEX_JUSTIFY_CENTER_CLASS]: justifyItems === VALID_ITEM_JUSTIFY.center,
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

const Flex = withLoading(FlexComponent);
Flex.displayName = 'Flex';
export default Flex;
