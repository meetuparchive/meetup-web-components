// @flow
import * as React from 'react';
import cx from 'classnames';
import { LocalTime, ChronoField } from 'js-joda';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import { SelectInput } from './SelectInput';

export const HOURS_INPUT_CLASS = 'timeInput-hours';
export const MINUTES_INPUT_CLASS = 'timeInput-minutes';
export const MERIDIAN_INPUT_CLASS = 'timeInput-meridian';

const formatDigits = number => `0${number}`.slice(-2);
const updateValueByStep = (
	e: SyntheticEvent<HTMLInputElement>,
	stepSize: number
): string => {
	const { min, max, value } = e.currentTarget;
	const currentVal = parseInt(value, 10);
	const newValue = currentVal + stepSize;

	if (newValue <= parseInt(max, 10) && newValue >= parseInt(min, 10)) {
		return formatDigits(newValue);
	}
	return value;
};
const constrainValue = (
	min: number = -Infinity,
	max: number = Infinity,
	value: number
): number => Math.max(Math.min(value, max), min);
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const KEY_INCREMENT = {
	[UP_ARROW]: 1,
	[DOWN_ARROW]: -1,
};

type Props = React.ElementConfig<'input'> & {
	value: string, // empty string or HH:mm
	disabled?: boolean,
	error?: string | boolean,
	is24Hr?: boolean,
	onChange: (SyntheticEvent<*>) => void,
};

const getValueComponents = (
	value: string
): { hour: ?number, minute: ?number, meridian: number } => {
	const localTime = (value && LocalTime.parse(value)) || null;
	const hour = localTime && localTime.hour();
	return {
		hour,
		minute: localTime && localTime.minute(),
		meridian: Number(hour && hour > 12), // '0' or '1'
	};
};

/*
 * 3-input component to provide 'HH:mm' value to `onChange` - used for browsers
 * that don't support <input type="time" />
 */
export default class FieldSetTime extends React.PureComponent<Props> {
	defaultProps: { is24Hr: true };
	// Based on state, create a fake onChange with the complete time value
	makeOnChange = (
		e: SyntheticEvent<HTMLInputElement>,
		partialChange: { [string]: ?number }
	) => () => {
		const { hour, minute, meridian } = {
			...getValueComponents(this.props.value),
			...partialChange,
		};
		if (
			typeof hour !== 'number' ||
			typeof minute !== 'number' ||
			typeof meridian !== 'number'
		) {
			return; // not all fields available - no change to report
		}
		e.currentTarget.value = LocalTime.of(hour, minute, 0)
			.with(ChronoField.AMPM_OF_DAY, meridian)
			.toString();
		this.props.onChange(e);
	};
	onNumberChange = (e: SyntheticEvent<HTMLInputElement>) => {
		const { value, name } = e.currentTarget;

		if (/[^\d]/.test(value)) {
			// only allow digits
			return;
		}

		this.makeOnChange(e, { [name]: parseInt(value, 10) });
	};

	// selects text when the hour or minute input gets focus
	highlightInputText(e: SyntheticMouseEvent<HTMLInputElement>) {
		e.currentTarget.select();
	}

	/**
	 * called when the meridian <select> input changes,
	 * in turn changes the state and updates the value of the <select>
	 */
	onMeridianChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
		this.makeOnChange(e, { meridian: parseInt(e.currentTarget.value, 10) });
	};

	/**
	 * called when either the hour or minute input loses focus,
	 * and ensures the value entered is not out of the min/max range
	 */
	onBlur = (e: SyntheticEvent<HTMLInputElement>) => {
		const { value, min, max } = e.currentTarget;
		e.currentTarget.value = constrainValue(
			parseInt(min, 10),
			parseInt(max, 10),
			parseInt(value, 10)
		).toString();
		this.onNumberChange(e);
	};

	// Handle up/down arrow behavior in hour/minute fields
	onNumberKeyDown = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
		if (Object.keys(KEY_INCREMENT).includes(e.keyCode)) {
			e.preventDefault();
			const stepMultiplier = e.shiftKey ? 10 : 1;
			const stepSize = KEY_INCREMENT[e.keyCode] * stepMultiplier;
			e.currentTarget.value = updateValueByStep(e, stepSize);
			this.onNumberChange(e);
			// TODO: test this behavior - might need to implement in callback
			e.currentTarget.select();
		}
	};

	render() {
		const { id, error, disabled, is24Hr, value } = this.props;

		const classNames = {
			fauxInput: cx('fauxInput fauxInput--time', {
				disabled,
				error,
			}),
			meridian: cx(
				MERIDIAN_INPUT_CLASS,
				'flush--all border--none field--reset padding--left',
				{
					disabled,
					error,
				}
			),
		};

		const { hour, minute, meridian } = getValueComponents(value);
		return (
			<fieldset className={classNames.fauxInput}>
				<Flex noGutters>
					<FlexItem shrink>
						<input
							type="text"
							pattern="\d*"
							id={`${id}-hours`}
							name="mwc-hours"
							min={is24Hr ? 0 : 1}
							max={is24Hr ? 23 : 12}
							disabled={disabled}
							className={`field--reset align--center ${HOURS_INPUT_CLASS}`}
							onMouseUp={this.highlightInputText}
							onBlur={this.onBlur}
							onChange={this.onNumberChange}
							onKeyDown={this.onNumberKeyDown}
							size={2}
							maxLength={2}
							value={hour}
						/>{' '}
					</FlexItem>
					<FlexItem shrink className="align--center">
						{':'}
					</FlexItem>
					<FlexItem shrink>
						<input
							type="text"
							pattern="\d*"
							id={`${id}-minutes`}
							name="mwc-minutes"
							min={0}
							max={59}
							disabled={disabled}
							className={`field--reset align--center ${MINUTES_INPUT_CLASS}`}
							onMouseUp={this.highlightInputText}
							onBlur={this.onBlur}
							onChange={this.onNumberChange}
							onKeyDown={this.onNumberKeyDown}
							size={2}
							maxLength={2}
							value={minute}
						/>
					</FlexItem>
					{!is24Hr && (
						<FlexItem
							shrink
							className="timeInput-meridianContainer display--flex flex--column flex--center"
						>
							<SelectInput
								id={`${id}-meridian`}
								name="mwc-meridian"
								className={classNames.meridian}
								disabled={disabled}
								onChange={this.onMeridianChange}
								value={meridian} // 0 or 1
								options={[
									{ label: 'AM', value: '0' },
									{ label: 'PM', value: '1' },
								]}
							/>
						</FlexItem>
					)}
				</Flex>
			</fieldset>
		);
	}
}
