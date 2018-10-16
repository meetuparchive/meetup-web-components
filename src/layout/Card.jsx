// @flow

import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';

export const CARD_CLASS = 'card';
export const CARD_FLUSH_CLASS = `${CARD_CLASS}--flush`;
export const CARD_HOVER_PLUS_SHADOW_CLASS = `${CARD_CLASS}--hasShadowPlusHover`;
export const VALID_BREAKPOINTS = {
	all: 'atAll',
	medium: 'atMedium',
	large: 'atLarge',
};
type Props = {|
	/** The child elements of the component */
	children: React$Node,
	className?: string,
	/** Whether the card's height is be determined by it's content instead of having a minimum height */
	initialHeight?: boolean,

	/** The card has a dropshadow */
	hasShadow?: boolean,

	/** The card has a dropshadow only on hover */
	hasHoverShadow?: boolean,

	/** Breakpoint at which the card should be inset from it's container instead of being flushed to the left and right edges of it's container */
	flushUntil?: 'all' | 'medium' | 'large',

	/** Whether the component is in a loading state */
	isLoading?: boolean,

	/** Props to pass to the `<Loading />` component */
	loadingProps?: {
		color?: string,
		scrimColor?: string,
		size?: MediaSizes,
	},
|};

/**
 * @module CardComponent
 */
export class CardComponent extends React.PureComponent<Props> {
	render() {
		const {
			children,
			className,
			initialHeight,
			hasShadow,
			hasHoverShadow,
			flushUntil,
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			...other
		} = this.props;

		const flushBreakpoint = flushUntil
			? VALID_BREAKPOINTS[flushUntil]
			: VALID_BREAKPOINTS['all'];

		const classNames = cx(
			CARD_CLASS,
			{
				[`${CARD_CLASS}--initialHeight`]: initialHeight,
				[`${flushBreakpoint}_${CARD_FLUSH_CLASS} ${CARD_FLUSH_CLASS}`]: flushUntil,
				[`${CARD_CLASS}--hasShadow`]: hasShadow,
				[`${CARD_CLASS}--hasHoverShadow`]: hasHoverShadow && !hasShadow,
				[CARD_HOVER_PLUS_SHADOW_CLASS]: hasHoverShadow && hasShadow,
				'card--isLoading component--isLoading': isLoading,
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

const Card = withLoading(CardComponent);
Card.displayName = 'Card';
export default Card;
