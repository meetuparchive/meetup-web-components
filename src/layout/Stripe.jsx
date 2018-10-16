// @flow

import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';

export const STRIPE_CLASS = 'stripe';
export const STRIPE_COLLECTION_CLASS = 'stripe--collection';
export const STRIPE_INVERTED_CLASS = 'stripe--inverted';
export const STRIPE_HERO_CLASS = 'stripe--withBGImg';
export const STRIPE_NOSCRIM_CLASS = 'stripe--noScrim';

type Props = {
	/** The url to an image to use as the background image of the component */
	backgroundImage?: string,

	/** Whether to make the component a collection Stripe or not. (off white background) */
	collection?: boolean,

	/** Whether to invert the colors of the Stripe component or not */
	inverted?: boolean,

	/** Whether to make the component a Hero Stripe or not (wrapped with Bounds) */
	hero?: boolean,

	/** Whether to shade the stripe's hero area with a text protection scrim */
	hideScrim?: boolean,

	/** Whether the component is in a loading state */
	isLoading?: boolean,

	/** Props to pass to the `<Loading />` component */
	loadingProps?: {
		color?: string,
		scrimColor?: string,
		size?: MediaSizes,
	},

	/** Nearest DOM element's class name */
	className?: string,

	/** The component's rendered children */
	children: React$Node,

	/** custom style properties */
	style: { [string]: string },
};
/**
 * Design System Component: Provides `stripe` styled container for components
 * @module StripeComponent
 */
export class StripeComponent extends React.Component<Props> {
	render() {
		const {
			children,
			className,
			style,
			backgroundImage,
			collection,
			inverted,
			hideScrim,
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			...other
		} = this.props;

		const classNames = cx(
			STRIPE_CLASS,
			{
				[STRIPE_COLLECTION_CLASS]: collection,
				[`${STRIPE_INVERTED_CLASS} inverted`]: inverted,
				[`${STRIPE_HERO_CLASS}`]: backgroundImage,
				[STRIPE_NOSCRIM_CLASS]: hideScrim,
				'component--isLoading': isLoading,
			},
			className
		);

		const styles = backgroundImage
			? {
					...style,
					backgroundImage: `url(${backgroundImage})`,
			  }
			: style;

		return (
			<div className={classNames} style={styles} {...other}>
				{backgroundImage && !hideScrim ? (
					<div className="stripe-aboveScrim">{children}</div>
				) : (
					children
				)}
			</div>
		);
	}
}

const Stripe = withLoading(StripeComponent);
Stripe.displayName = 'Stripe';
export default Stripe;
