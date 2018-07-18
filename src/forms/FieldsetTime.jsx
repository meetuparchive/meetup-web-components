// @flow
import * as React from 'react';
import cx from 'classnames';
import { LocalTime, ChronoField } from 'js-joda';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import { SelectInput } from './SelectInput';

export const HOURS_INPUT_CLASS = 'timeInput-hours';
export const HOURS_INPUT_NAME = 'hour';
export const MINUTES_INPUT_CLASS = 'timeInput-minutes';
export const MINUTES_INPUT_NAME = 'minute';
export const MERIDIAN_INPUT_CLASS = 'timeInput-meridian';

type Props = React.ElementConfig<'input'> & {
	value: string, // empty string or HH:mm
	disabled?: boolean,
	error?: string | boolean,
	is24Hr?: boolean,
	onChange: string => void,
};

const UP_ARROW = 38;
const DOWN_ARROW = 40;
const KEY_INCREMENT = {
	[UP_ARROW]: 1,
	[DOWN_ARROW]: -1,
};
const ADJUST_FIELD_MAP = {
	hour: ChronoField.HOUR_OF_DAY,
	minute: ChronoField.MINUTE_OF_HOUR,
};
const EMPTY_VALS = { hour: '', minute: '', meridian: '0' };
const TIME_RE = /(?:[01]\d|2[0-3]):[0-5][0-9]/; // valid 'HH:mm' string values

// get indivdual { hour, minute, meridian } values as strings from 'HH:mm" value
const getValueComponents = (
	is24Hr: boolean,
	value: ?string
): { hour: ?string, minute: ?string, meridian: string } => {
	if (!value || !TIME_RE.test(value)) {
		// empty or invalid
		return EMPTY_VALS;
	}
	const localTime = LocalTime.parse(value);
	const [hourString, minuteString] = localTime.toString().split(':');

	return {
		hour: is24Hr
			? hourString
			: localTime.get(ChronoField.CLOCK_HOUR_OF_AMPM).toString(),
		minute: minuteString,
		meridian: localTime.get(ChronoField.AMPM_OF_DAY).toString(), // '0' or '1'
	};
};

/*
 * Given a maximum value, return the part of the string value that is acceptable.
 * This function is useful for accepting a stream of user input and only 'reading'
 * the most recent valid value that has been entered
 * getValidValue(10, '0123') === 3;
 * getValidValue(10, '01234') === 4;
 * getValidValue(100, '0123467') === 67
 * getValidValue(500, '0123467') === 467
 */
const getValidValue = (max: number, value: string): number => {
	const maxDigits = max.toString().length;
	const value2digit = parseInt(value.slice(-maxDigits), 10);
	return value2digit >= max ? parseInt(value.slice(-(maxDigits - 1)), 10) : value2digit;
};

/*
 * 3-input component to provide 'HH:mm' value to `onChange` - used for browsers
 * that don't support <input type="time" />
 *
 * Cool features:
 * - keyboard up/down support for hour/minute inputs (hold shift for +10 increment)
 * - correct hour/meridian wrapping when changing minute/hour
 * - no explicit input length limit, but only the most recent valid number input
 *   will be accepted/displayed (see getValidValue docs above)
 */
class FieldsetTime extends React.PureComponent<Props> {
	static defaultProps = { is24Hr: true };
	onHourChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
		const validValue = getValidValue(this.props.is24Hr ? 23 : 12, e.target.value);
		this.changeField('hour', validValue);
	};
	onMinuteChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
		const validValue = getValidValue(59, e.target.value);
		this.changeField('minute', validValue);
	};
	changeField(fieldName: string, newValue: number) {
		const { value, onChange, is24Hr } = this.props;
		const currentTime = value ? LocalTime.parse(value) : LocalTime.of(0, 0, 0);
		if (Number.isNaN(newValue)) {
			// invalid value, so just force re-set to currentTime
			onChange(currentTime.toString());
			return;
		}
		// set the currentTime field corresponding to hour/minute
		const adjustField = ADJUST_FIELD_MAP[fieldName];
		const newTime = currentTime.with(adjustField, newValue);
		if (is24Hr) {
			onChange(newTime.toString());
			return;
		}
		onChange(
			newTime
				.with(ChronoField.AMPM_OF_DAY, currentTime.get(ChronoField.AMPM_OF_DAY))
				.toString()
		);
	}

	// selects text when the hour or minute input gets focus
	selectInputText(e: SyntheticEvent<HTMLInputElement>) {
		e.currentTarget.select();
	}

	// handler for AM/PM change - trigger onChange callback with new hour offset
	onMeridianChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
		if (!this.props.value || this.props.is24Hr) {
			return;
		}
		const localTime = LocalTime.parse(this.props.value);
		const meridian = parseInt(e.target.value, 10);
		this.props.onChange(localTime.with(ChronoField.AMPM_OF_DAY, meridian).toString());
	};

	// Handle up/down arrow behavior in hour/minute fields
	onNumberKeyDown = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
		if (!KEY_INCREMENT[e.keyCode]) {
			return;
		}
		e.preventDefault(); // don't do anything but what I tell you
		const stepMultiplier = e.shiftKey ? 10 : 1; // hold shift for fast increment
		const stepSize = KEY_INCREMENT[e.keyCode] * stepMultiplier;
		const field = e.currentTarget.name; // 'hour' or 'minute'
		const currentTime = this.props.value
			? LocalTime.parse(this.props.value)
			: LocalTime.of(0, 0, 0); // empty value is ok - just start incrementing from 00:00

		const newTimeFields = {
			hour: currentTime.hour(),
			minute: currentTime.minute(),
		};
		newTimeFields[field] = newTimeFields[field] + stepSize;
		// wrap the hour when minute reaches boundaries
		if (newTimeFields.minute >= 60) {
			newTimeFields.hour = newTimeFields.hour + 1;
		}
		if (newTimeFields.minute < 0) {
			newTimeFields.hour = newTimeFields.hour - 1;
		}

		// trigger change with positive, modulated hour/minute values
		const newTime = LocalTime.of(
			(newTimeFields.hour + 24) % 24,
			(newTimeFields.minute + 60) % 60,
			0
		);
		this.props.onChange(newTime.toString());
	};

	render() {
		const { id, error, disabled, name, is24Hr, value } = this.props;

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
		const displayId = id || name;

		const { hour, minute, meridian } = getValueComponents(is24Hr, value);
		return (
			<fieldset className={classNames.fauxInput}>
				<Flex noGutters>
					<FlexItem shrink>
						<input
							type="number"
							pattern="\d*"
							id={`${displayId}-hour`}
							name={HOURS_INPUT_NAME}
							min={is24Hr ? 0 : 1}
							max={is24Hr ? 23 : 12}
							disabled={disabled}
							className={`field--reset align--center ${HOURS_INPUT_CLASS}`}
							onMouseUp={this.selectInputText}
							onChange={this.onHourChange}
							onKeyDown={this.onNumberKeyDown}
							value={hour}
						/>{' '}
					</FlexItem>
					<FlexItem shrink className="align--center">
						{':'}
					</FlexItem>
					<FlexItem shrink>
						<input
							type="number"
							pattern="\d*"
							id={`${displayId}-minute`}
							name={MINUTES_INPUT_NAME}
							min={0}
							max={59}
							disabled={disabled}
							className={`field--reset align--center ${MINUTES_INPUT_CLASS}`}
							onMouseUp={this.selectInputText}
							onChange={this.onMinuteChange}
							onKeyDown={this.onNumberKeyDown}
							value={minute}
						/>
					</FlexItem>
					{!is24Hr && (
						<FlexItem
							shrink
							className="timeInput-meridianContainer display--flex flex--column flex--center"
						>
							<SelectInput
								id={`${displayId}-meridian`}
								name="mwc-meridian"
								className={classNames.meridian}
								disabled={disabled}
								value={meridian.toString()} // 0 or 1
								onChange={this.onMeridianChange}
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

export default FieldsetTime;
