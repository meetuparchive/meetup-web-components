import PropTypes from 'prop-types';
import React from 'react';
import { Icon as SwarmIcon } from '@meetup/swarm-components';
import { MEDIA_SIZES } from '../utils/designConstants';
import { VALID_SHAPES } from 'swarm-icons/dist/js/shapeConstants';

/**
 * Icon component used to insert an svg icon into a component or page
 *
 * **Accessibility** If an Icon is used on its own without supporting
 * text to explain what it is/does, be a good citizen and pass in an
 * `aria-label` attribute describing what the icon represents
 *
 * @module Icon
 */
class Icon extends React.PureComponent {
	componentDidCatch(error, info) {
		console.log(`${error}: \n ${info.componentStack}`);
	}

	render() {
		const { className, circled, role, ariaLabel, ...other } = this.props;

		return (
			<span className={className}>
				<SwarmIcon
					circle={circled}
					role={role || 'presentation'}
					aria-label={ariaLabel}
					{...other}
				/>
			</span>
		);
	}
}

Icon.defaultProps = {
	size: 's',
};

Icon.propTypes = {
	/** The name of the icon shape to render */
	shape: PropTypes.oneOf(VALID_SHAPES).isRequired,

	/** Which of our media sizes to render the icon at */
	size: PropTypes.oneOf(Object.keys(MEDIA_SIZES)).isRequired,

	/** Whether the icon is outlined with a circle */
	circled: PropTypes.bool,

	/** What color the icon should be filled with */
	color: PropTypes.string,

	/** Gives icon role */
	role: PropTypes.string,

	/** If an Icon is used on its own without supporting text to explain what it is/does, be a good citizen and pass in an `aria-label` */
	ariaLabel: PropTypes.string,
};

export default Icon;
