import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../media/Icon';
import DeprecationWarning from '../utils/components/DeprecationWarning';

/**
 * @module ToggleSwitch
 */
class ToggleSwitch extends React.Component {
	componentDidCatch(error, info) {
		console.log(`${error}: \n ${info.componentStack}`);
	}

	render() {
		const {
			labelClassName, // eslint-disable-line no-unused-vars
			isActive: checked = false,
			label,
			labelledBy,
			id,
			name,
			disabled,
			ariaLabel,
			...other
		} = this.props;

		const labelProps = labelledBy ? { 'aria-labelledby': labelledBy } : {};

		const checkedStatus = checked ? 'checked' : 'unchecked';
		const fillIcon = checked ? 'check' : 'cross';

		return (
			<div>
				{label && <label htmlFor={id || name}>{label}</label>}
				<button
					data-swarm-toggle={checkedStatus}
					role="checkbox"
					type="button"
					className="toggleSwitch"
					aria-checked={checked}
					aria-readonly={disabled}
					disabled={disabled}
					aria-label={
						ariaLabel ||
						(typeof label === 'string'
							? `${label} - toggle switch`
							: 'toggle switch')
					}
					{...labelProps}
					{...other}
				>
					<span data-swarm-toggle-switch-disc>
						<Icon shape={fillIcon} />
					</span>
				</button>
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

export default DeprecationWarning(ToggleSwitch);
