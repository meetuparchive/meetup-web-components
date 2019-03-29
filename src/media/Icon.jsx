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
	render() {
		const { className, circled, ...other } = this.props;

		return (
			<span className={className}>
				<SwarmIcon circle={circled} {...other} />
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
};

export default Icon;
