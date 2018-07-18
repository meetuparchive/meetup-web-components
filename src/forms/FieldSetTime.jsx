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

const getValueComponents = (
	is24Hr: boolean,
	value: ?string
): { hour: ?string, minute: ?string, meridian: string } => {
	if (!value) {
		return { hour: undefined, minute: undefined, meridian: '0' };
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
 * 3-input component to provide 'HH:mm' value to `onChange` - used for browsers
 * that don't support <input type="time" />
 */
class FieldsetTime extends React.PureComponent<Props> {
	static defaultProps = { is24Hr: true };
	onHourChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
		// get the last 2 digits entered
		const value = parseInt(e.target.value.slice(-2));
		// determine if the last 2 digits are a valid hour, otherwise take only the last digit
		const validMax = this.props.is24Hr ? 23 : 12;
		const truncated = value > validMax ? parseInt(e.target.value.slice(-1)) : value;
		this.changeHour(truncated);
	};
	changeHour = (hour: number) => {
		const currentTime = this.props.value
			? LocalTime.parse(this.props.value)
			: LocalTime.of(0, 0, 0);
		const newTime = currentTime.withHour(hour % 24);
		if (this.props.is24Hr) {
			this.props.onChange(newTime.toString());
			return;
		}
		this.props.onChange(
			newTime
				.with(ChronoField.AMPM_OF_DAY, currentTime.get(ChronoField.AMPM_OF_DAY))
				.toString()
		);
	};
	onMinuteChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value.slice(-2));
		const truncated = value < 60 ? value : parseInt(e.target.value.slice(-1));
		this.changeMinute(truncated);
	};
	changeMinute = (minute: number) => {
		const currentTime = this.props.value
			? LocalTime.parse(this.props.value)
			: LocalTime.of(0, 0, 0);
		const newTime = currentTime.withMinute(minute % 60);
		if (this.props.is24Hr) {
			this.props.onChange(newTime.toString());
			return;
		}
		this.props.onChange(
			newTime
				.with(ChronoField.AMPM_OF_DAY, currentTime.get(ChronoField.AMPM_OF_DAY))
				.toString()
		);
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
		if (!this.props.value) {
			return;
		}
		const localTime = LocalTime.parse(this.props.value);
		this.props.onChange(
			localTime
				.with(ChronoField.AMPM_OF_DAY, parseInt(e.target.value, 10))
				.toString()
		);
	};

	// Handle up/down arrow behavior in hour/minute fields
	onNumberKeyDown = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
		if (KEY_INCREMENT[e.keyCode]) {
			e.preventDefault();
			const stepMultiplier = e.shiftKey ? 10 : 1;
			const stepSize = KEY_INCREMENT[e.keyCode] * stepMultiplier;
			const field = e.currentTarget.name;
			if (!this.props.value) {
				// brand new localTime
				const newTime = {
					hour: 0,
					minute: 0,
				};
				newTime[field] = parseInt(e.currentTarget.value, 10) + stepSize;
				this.props.onChange(
					LocalTime.of(newTime.hour % 24, newTime.minute % 60, 0).toString()
				);
				return;
			}

			// TODO: test this behavior - might need to implement in callback
			e.currentTarget.select();
		}
		if (!/[0-9]/.test(String.fromCharCode(e.keyCode))) {
			e.preventDefault();
		}
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
							type="text"
							pattern="\d*"
							id={`${displayId}-hour`}
							name={HOURS_INPUT_NAME}
							min={is24Hr ? 0 : 1}
							max={is24Hr ? 23 : 12}
							disabled={disabled}
							className={`field--reset align--center ${HOURS_INPUT_CLASS}`}
							onMouseUp={e => this.highlightInputText(e)}
							onChange={e => this.onHourChange(e)}
							onKeyDown={e => this.onNumberKeyDown(e)}
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
							id={`${displayId}-minute`}
							name={MINUTES_INPUT_NAME}
							min={0}
							max={59}
							disabled={disabled}
							className={`field--reset align--center ${MINUTES_INPUT_CLASS}`}
							onMouseUp={e => this.highlightInputText(e)}
							onChange={e => this.onMinuteChange(e)}
							onKeyDown={e => this.onNumberKeyDown(e)}
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
