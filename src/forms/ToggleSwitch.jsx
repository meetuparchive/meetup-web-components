import PropTypes from 'prop-types';
import React from 'react';

import { Toggle } from '@meetup/swarm-components';

/**
 * @module ToggleSwitch
 */
class ToggleSwitch extends React.Component {
	render() {
		const { isActive, label, labelledBy, id, name, ...other } = this.props;

		const labelProps = labelledBy ? { 'aria-labelledby': labelledBy } : {};

		return (
			<div>
				{label && <label htmlFor={id || name}>{label}</label>}
				<Toggle
					id={id || name}
					name={name}
					checked={isActive}
					{...labelProps}
					{...other}
				/>
			</div>
		);
	}
}

ToggleSwitch.propTypes = {
	/** Whether to use disabled attribute on the button element and apply disabled switch styles */
	disabled: PropTypes.bool,

	/** Whether the switch is toggled on */
	isActive: PropTypes.bool,

	/** What we render into the input's `<label />` */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	/** The id of the element that labels the toggle switch */
	labelledBy: PropTypes.string,

	/** The identifier used to associate a label with a toggle switch */
	name: PropTypes.string.isRequired,
};

export default ToggleSwitch;
