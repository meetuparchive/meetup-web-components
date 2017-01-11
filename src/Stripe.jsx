import React from 'react';
import cx from 'classnames';
import Bounds from './Bounds';

export const STRIPE_CLASS = 'stripe';
export const STRIPE_COLLECTION_CLASS = 'stripe--collection';
export const STRIPE_INVERTED_CLASS = 'stripe--inverted';
export const STRIPE_HERO_CLASS = 'stripe--hero';

/**
 * Design System Component: Provides `stripe` styled container for components
 * @module Stripe
 */
class Stripe extends React.Component {
	render() {
		const {
			children,
			className,
			backgroundImage,
			collection,
			inverted,
			hero,
			...other
		} = this.props;

		const classNames = cx(
			STRIPE_CLASS,
			{
				[STRIPE_COLLECTION_CLASS]: collection,
				[`${STRIPE_INVERTED_CLASS} inverted`]: inverted,
				[`${STRIPE_HERO_CLASS} inverted`]: backgroundImage || hero
			},
			className
		);

		const styles = backgroundImage ? {backgroundImage: `url(${backgroundImage})`} : null;

		return (
			<div
				className={classNames}
				style={styles}
				{...other}>
				{ hero ?
					<Bounds className='stripe-heroContent'>
						{children}
					</Bounds> : children
				}
			</div>
		);
	}
}

Stripe.propTypes = {
	backgroundImage: React.PropTypes.string,
	collection: React.PropTypes.bool,
	inverted: React.PropTypes.bool,
	hero: React.PropTypes.bool
};

export default Stripe;
