// @flow
import * as React from 'react';
import cx from 'classnames';
import { LocalTime, ChronoField } from 'js-joda';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import { SelectInput } from './SelectInput';
import withErrorList from '../utils/components/withErrorList';

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

type Props = React.ElementConfig<HTMLInputElement> & {
	name: string,
	error?: string | boolean,
	forceTextInput?: boolean,
	is24Hr?: boolean,
	label?: React.Node,
	labelClassName?: string,
	onChange: (SyntheticEvent<*>) => void,
	helperText?: React.Node,
	required?: boolean,
};
type State = {
	supportsTime: boolean,
	hour?: number,
	minute?: number,
	meridian: number, // '0=AM 1=PM'
};

/*
 * All-purpose replacement for `<input type="time">` field, even for browsers
 * that don't support it
 */
export class TimeInput extends React.PureComponent<Props, State> {
	state: State = { supportsTime: true, meridian: 0 };
	inputEl = null;
	defaultProps: {
		requiredText: '*',
		is24Hr: true,
	}; // onChange handler for time input
	onChange = (e: SyntheticEvent<HTMLInputElement>) => {
		try {
			const value = LocalTime.parse(e.currentTarget.value);
			this.setState({ hour: value.hour(), minute: value.minute() }, () =>
				this.props.onChange(e)
			);
		} catch (err) {
			// couldn't parse value, don't do anything
		}
	};

	// Based on state, create a fake onChange with the complete time value
	makeOnChange = (e: SyntheticEvent<HTMLInputElement>) => () => {
		const { hour, minute, meridian } = this.state;
		e.currentTarget.value = LocalTime.of(hour, minute, 0)
			.with(ChronoField.AMPM_OF_DAY, meridian)
			.toString();
		this.onChange(e);
	};
	onNumberChange = (e: SyntheticEvent<HTMLInputElement>) => {
		const { value, name } = e.currentTarget;

		if (/[^\d]/.test(value)) {
			// only allow digits
			return;
		}

		this.setState(() => ({ [name]: parseInt(value, 10) }), this.makeOnChange(e));
	};

	/**
	 * selects text when the hour or minute input gets focus
	 */
	highlightInputText(e: SyntheticMouseEvent<HTMLInputElement>) {
		e.currentTarget.select();
	}

	/**
	 * @function onMeridianChange
	 * @param e Event Object
	 * @description called when the meridian <select> input changes,
	 * 	in turn changes the state and updates the value of the <select>
	 */
	onMeridianChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
		this.setState(
			() => ({ meridian: parseInt(e.currentTarget.value, 10) }),
			this.makeOnChange(e)
		);
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
			// $FlowFixMe - built in types don't know about `.select()` API
			e.currentTarget.select();
		}
	};

	// determine runtime support for <input type='time'>
	componentDidMount() {
		this.setState(() => ({
			supportsTime:
				!this.props.forceTextInput && (this.inputEl || {}).type === 'time',
		}));
	}

	render() {
		const {
			id,
			label,
			labelClassName,
			name,
			className,
			value,
			error,
			disabled,
			is24Hr,
			onChange, // eslint-disable-line no-unused-vars
			helperText,
			required,
			requiredText,
			...other
		} = this.props;

		const classNames = {
			field: cx(
				'input--time select--reset',
				{ 'field--error': Boolean(error) },
				className
			),
			fauxInput: cx('fauxInput fauxInput--time', {
				disabled,
				error,
			}),
			label: cx(
				'label--field',
				{
					'label--disabled': disabled,
					'label--required': required,
					'flush--bottom': helperText,
				},
				labelClassName
			),
			helperText: cx('helperTextContainer', { required, disabled }),
			meridian: cx(
				MERIDIAN_INPUT_CLASS,
				'flush--all border--none field--reset padding--left',
				{
					disabled,
					error,
				}
			),
		};

		const errorId = `${id}-error`;

		if (error) {
			other['aria-invalid'] = true;
			other['aria-describedby'] = errorId;
		}

		return (
			<div>
				{label && (
					<label
						htmlFor={id}
						className={classNames.label}
						data-requiredtext={required && requiredText}
					>
						{label}
					</label>
				)}
				{helperText && <div className={classNames.helperText}>{helperText}</div>}
				{this.state.supportsTime ? (
					<input
						id={id}
						type="time"
						name={name}
						value={value}
						className={classNames.field}
						required={required}
						disabled={disabled}
						onChange={this.onChange}
						ref={(input: HTMLElement | null) => (this.inputEl = input)}
						{...other}
					/>
				) : (
					<div>
						<div className={classNames.fauxInput}>
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
										value={this.state.hour}
									/>{' '}
									{/* is24Hr ? this.state.hour % 24 : this.state.hour % 12 */}
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
										value={this.state.minute}
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
											value={this.state.meridian}
											options={[
												{ label: 'AM', value: 'AM' },
												{ label: 'PM', value: 'PM' },
											]}
										/>
									</FlexItem>
								)}
							</Flex>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default withErrorList(TimeInput);
