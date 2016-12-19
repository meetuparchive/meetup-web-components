import React from 'react';
import cx from 'classnames';
import Bounds from './Bounds';

/**
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
			isHero,
			...other
		} = this.props;

		const classNames = cx(
			'stripe',
			{
				'stripe--collection': collection,
				'stripe--inverted inverted': inverted,
				'stripe--hero inverted': typeof backgroundImage === 'string' || isHero
			},
			className
		);

		return (
			<div
				className={classNames}
				style={backgroundImage ? {backgroundImage: `url(${backgroundImage})`} : null}
				{...other}>
				{ isHero ?
					<Bounds className='stripe-heroContent'>
						{children}
					</Bounds>
					:
					children
				}
			</div>
		);
	}
}

Stripe.propTypes = {
};

export default Stripe;
