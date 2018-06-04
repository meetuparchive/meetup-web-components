import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';

export const STRIPE_CLASS = 'stripe';
export const STRIPE_COLLECTION_CLASS = 'stripe--collection';
export const STRIPE_INVERTED_CLASS = 'stripe--inverted';
export const STRIPE_HERO_CLASS = 'stripe--withBGImg';
export const STRIPE_NOSCRIM_CLASS = 'stripe--noScrim';

/**
 * Design System Component: Provides `stripe` styled container for components
 * @module Stripe
 */
export class Stripe extends React.Component {
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

Stripe.propTypes = {
	backgroundImage: PropTypes.string,
	collection: PropTypes.bool,
	inverted: PropTypes.bool,
	hero: PropTypes.bool,
	hideScrim: PropTypes.bool,
	isLoading: PropTypes.bool,
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string,
	}),
};

export default withLoading(Stripe);
