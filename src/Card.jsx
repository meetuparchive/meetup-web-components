import React from 'react';
import cx from 'classnames';

/**
 * @module Card
 */
class Card extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'card',
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

Card.propTypes = {
};

export default Card;
