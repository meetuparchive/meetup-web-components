import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import { C_TEXT_PRIMARY, C_TEXT_SECONDARY, C_TEXT_HINT } from 'swarm-constants/dist/js/colorConstants.js';

import Button from './Button';
import Icon from '../media/Icon';
import ToggleWrapper from '../utils/components/ToggleWrapper';

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

	render() {
		const {
			className,
			disabled,
			isActive,
			label,
			labelClassName,
			labelledBy,
			name,
			onCallback,
			offCallback,
			...other
		} = this.props;

		const labelId = labelledBy || `${name}-label`;

		const getActiveIconColor = isActive => isActive ? C_TEXT_PRIMARY : C_TEXT_SECONDARY;
		const getColor = (disbled, isActive) => disabled ? C_TEXT_HINT : getActiveIconColor(isActive);

		return (
			<ToggleWrapper
				isActive={isActive}
				onCallback={onCallback}
				offCallback={offCallback}
			>
				{({
					isActive,
					toggleActive,
				}) => (
					<div {...other}>
						{ label &&
							<label
								className={`${LABEL_CLASS} ${labelClassName} margin--right`}
								id={labelId}
							>
								{label}
							</label>
						}
						<Button
							reset
							disabled={disabled}
							onClick={!disabled && toggleActive}
							className={cx(
								TOGGLE_SWITCH_CLASS,
								{
									[TOGGLE_SWITCH_ACTIVE_CLASS]: isActive,
									[TOGGLE_SWITCH_DISABLED_CLASS]: disabled
								},
								className
							)}
							aria-labelledby={labelId}
							aria-checked={isActive}
							tabIndex={-1}
							role="switch"
						>
							<span className={cx(
								`${KNOB_CLASS} flex flex--center flex--alignCenter`,
								{
									[KNOB_ACTIVE_CLASS]: isActive,
									[KNOB_DISABLED_CLASS]: disabled
								}
							)}>
								<Icon
									shape={isActive ? 'check' : 'cross'}
									color={getColor(disabled, isActive)}
									size='xxs'
									label='Toggle switch label'/>
							</span>
						</Button>
					</div>
				)}
			</ToggleWrapper>
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
	labelClassName: PropTypes.string,
	labelledBy: PropTypes.string,
	name: PropTypes.string.isRequired
};

export default ToggleSwitch;
