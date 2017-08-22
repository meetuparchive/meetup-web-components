import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

export const CARD_CLASS = 'card';
export const INITIALHEIGHT_CARD_CLASS = `${CARD_CLASS}--initialHeight`;
export const HASSHADOW_CARD_CLASS = `${CARD_CLASS}--hasShadow`;
export const HASHOVERSHADOW_CARD_CLASS = `${CARD_CLASS}--hasHoverShadow`;

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
				[INITIALHEIGHT_CARD_CLASS]: initialHeight,
				[HASSHADOW_CARD_CLASS]: hasShadow,
				[HASHOVERSHADOW_CARD_CLASS]: hasHoverShadow
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
