import PropTypes from 'prop-types';
import React from 'react';

import { Button as SwarmButton, LinkButton as SwarmLink } from '@meetup/swarm-components';

/**
 * @module Button
 */
class Button extends React.PureComponent {
	render() {
		const {
			// removing reset & fullWidth props from other to prevent an invalid boolean being passed to <button>
			reset, // eslint-disable-line no-unused-vars
			fullWidth, // eslint-disable-line no-unused-vars
			icon,
			hasHoverShadow, // eslint-disable-line no-unused-vars
			component,
			...other
		} = this.props;

		// checking for the icon component signature if passed as icon={<Icon shape="search"/>} and grabbing the shape prop
		// since this functionality is built into button in order to enforce strict sizes on button icons
		const props = { icon: icon && icon.props && icon.props.shape };

		if (component !== 'button' || 'a') {
			console.warn(
				'All Swarm UI v2 Button components are button elements. Future iterations will support links as independent components and the logic will be handled here'
			);
		}

		if (component === 'a') {
			return <SwarmLink {...props} {...other} />;
		}

		return <SwarmButton {...props} {...other} />;
	}
}

Button.propTypes = {
	/** Used to highlight the most important action on a screen. Not intended to be used more than once on a screen/modal/section. */
	primary: PropTypes.bool,

	/** The standard button for most use cases. Other styles are available for buttons that need more visual weight */
	neutral: PropTypes.bool,

	/** Takes an `Icon` element to render inside of the button */
	icon: PropTypes.any,

	/** Renders the icon on the right side of the button text */
	right: PropTypes.bool,

	/** Reduces the size of the button */
	small: PropTypes.bool,

	/** Sometimes used in place of a Neutral button on shaded backgrounds to maintain the appropriate visual weight */
	bordered: PropTypes.bool,

	/** Which component or html element type to use */
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

	/** Whether to use disabled attribute and disabled button styles */
	disabled: PropTypes.bool,
};
export default Button;
