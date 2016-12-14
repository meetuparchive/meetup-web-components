import React from 'react';
import cx from 'classnames';

/**
 * @module Stripe
 */
class Stripe extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'stripe',
			className
		);

		return (
			<div
				className={classNames}
				{...other}>
					{children}
			</div>
		);
	}
}

Stripe.propTypes = {
};

export default Stripe;
