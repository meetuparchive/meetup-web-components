import React from 'react';
import PropTypes from 'prop-types';
import { Radio as SwarmRadio } from '@meetup/swarm-components';

const RadioButton = ({ label, name, value, ...other }) => (
	<SwarmRadio
		name={name}
		value={value}
		label={label}
		id={`RadioButton-${name}-${value}`}
		{...other}
	/>
);

RadioButton.displayName = 'RadioButton';

RadioButton.propTypes = {
	/** What we render into the input's `<label />` */
	label: PropTypes.string.isRequired,

	/** Additional class name/s to add to the wrapper element  */
	className: PropTypes.string,
	/**
	 * Used to associate a group of radio buttons.
	 * Only one radio button in a group can be selected.
	 */
	name: PropTypes.string,
	/**
	 * Value of the input.
	 */
	value: PropTypes.string,
};

export default RadioButton;
