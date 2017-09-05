import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

export const CARD_CLASS = 'card';
export const CARD_HOVER_PLUS_SHADOW_CLASS = `${CARD_CLASS}--hasShadowPlusHover`;

/**
 * @module Card
 */
class Card extends React.PureComponent {
	render() {
		const {
			children,
			className,
			initialHeight,
			hasShadow,
			hasHoverShadow,
			...other
		} = this.props;

		const classNames = cx(
			CARD_CLASS,
			{
				[`${CARD_CLASS}--initialHeight`]: initialHeight,
				[`${CARD_CLASS}--hasShadow`]: hasShadow,
				[`${CARD_CLASS}--hasHoverShadow`]: hasHoverShadow && !hasShadow,
				[CARD_HOVER_PLUS_SHADOW_CLASS]: hasHoverShadow && hasShadow
			},
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
	initialHeight: PropTypes.bool,
	hasShadow: PropTypes.bool,
	hasHoverShadow: PropTypes.bool,
};

export default Card;
