import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import { C_TEXT_PRIMARY, C_TEXT_SECONDARY, C_TEXT_HINT } from 'swarm-constants/dist/js/colorConstants.js';

import Button from './Button';
import Icon from '../media/Icon';
import withToggleControl from '../utils/WithToggleControl';

export const TOGGLE_SWITCH_CLASS = 'toggleSwitch';
export const TOGGLE_SWITCH_ACTIVE_CLASS = `${TOGGLE_SWITCH_CLASS}--active`;
export const TOGGLE_SWITCH_DISABLED_CLASS = `${TOGGLE_SWITCH_CLASS}--disabled`;

export const KNOB_CLASS = `${TOGGLE_SWITCH_CLASS}-knob`;
export const KNOB_ACTIVE_CLASS = `${KNOB_CLASS}--active`;
export const KNOB_DISABLED_CLASS = `${KNOB_CLASS}--disabled`;

export const LABEL_CLASS = `${TOGGLE_SWITCH_CLASS}-label`;

/**
 * @module ToggleSwitch
 */
class ToggleSwitch extends React.Component {
	constructor (props) {
		super(props);

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		!this.props.disabled && this.props.toggleActive();
	}

	render() {
		const {
			children,
			className,
			disabled,
			isActive,
			label,
			labelClassName,
			labelledBy,
			name,
			toggleActive, // eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = {
			toggleSwitch: cx(
				TOGGLE_SWITCH_CLASS,
				{
					[TOGGLE_SWITCH_ACTIVE_CLASS]: isActive,
					[TOGGLE_SWITCH_DISABLED_CLASS]: disabled
				},
				className
			),
			knob: cx(
				`${KNOB_CLASS} flex flex--center flex--alignCenter`,
				{
					[KNOB_ACTIVE_CLASS]: isActive,
					[KNOB_DISABLED_CLASS]: disabled
				}
			),
			label: cx(
				`${LABEL_CLASS} margin--right`,
				labelClassName
			)
		};

		const labelId = labelledBy || `${name}-label`;
		const iconShape = isActive ? 'check' : 'cross';
		const activeIconColor = isActive ? C_TEXT_PRIMARY : C_TEXT_SECONDARY;

		return (
			<div {...other}>
				{ label &&
					<span
						className={classNames.label}
						id={labelId}
					>
						{label}
					</span>
				}
				<Button
					reset
					disabled={disabled}
					onClick={this.toggle}
					className={classNames.toggleSwitch}
					aria-labelledby={labelId}
					aria-checked={isActive}
					role="switch"
				>
					<span className={classNames.knob}>
						<Icon
							shape={iconShape}
							color={disabled ? C_TEXT_HINT : activeIconColor}
							size='xxs'
							label='Toggle switch label'/>
					</span>
				</Button>
				{children}
			</div>
		);
	}
}

ToggleSwitch.propTypes = {
	disabled: PropTypes.bool,
	isActive: PropTypes.bool,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	labelClass: PropTypes.string,
	name: PropTypes.string.isRequired
};

export default withToggleControl(ToggleSwitch);
