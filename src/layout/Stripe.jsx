import React from 'react';
import cx from 'classnames';
// import Bounds from './Bounds';

export const STRIPE_CLASS = 'stripe';
export const STRIPE_COLLECTION_CLASS = 'stripe--collection';
export const STRIPE_INVERTED_CLASS = 'stripe--inverted';
export const STRIPE_HERO_CLASS = 'stripe--withBGImg';

/**
 * Design System Component: Provides `stripe` styled container for components
 * @module Stripe
 */
class Stripe extends React.Component {
	render() {
		const {
			children,
			className,
			style,
			backgroundImage,
			collection,
			inverted,
			// hero,
			...other
		} = this.props;

		const classNames = cx(
			STRIPE_CLASS,
			{
				[STRIPE_COLLECTION_CLASS]: collection,
				[`${STRIPE_INVERTED_CLASS} inverted`]: inverted,
				[`${STRIPE_HERO_CLASS} inverted`]: backgroundImage
			},
			className
		);

		const styles = backgroundImage ? {
			...style,
			backgroundImage: `url(${backgroundImage})`
		} : style;

		return (
			<div
				className={classNames}
				style={styles}
				{...other}>
				{ backgroundImage ?
					(
						<div className='stripe-aboveScrim'>
							{children}
						</div>
					) :
					children
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
