import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import { SelectInput } from './SelectInput';
import withErrorList from '../utils/components/withErrorList';

export const HOURS_INPUT_CLASS = 'timeInput-hours';
export const MINUTES_INPUT_CLASS = 'timeInput-minutes';
export const MERIDIAN_INPUT_CLASS = 'timeInput-meridian';

const formatDigits = number => `0${number}`.slice(-2);

/**
 * @description takes a time value and returns individual parts
 * @param {String} time - time value in the format 'hh:mm'
 * @param {String} part - a string corersponding to a part, optional
 * @returns {String|Object} the only parsed value or all the parsed parts if no part defined
 */
export const getTimeParts = time => {
	const [hours, minutes] = time.split(':');
	return {
		hours,
		minutes,
		meridian: hours < 12 ? 'AM' : 'PM',
	};
};
const formatHours = (hours, meridian) => {
	const newHours = meridian
		? parseInt(hours % 12) + 12 * (meridian === 'PM')
		: hours % 24;
	return formatDigits(newHours);
};

/**
 * Deprecated - use <InputTime> directly, supply `value` from parent
 * @module TimeInput
 * @deprecated
 */
export class TimeInput extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			supportsTime: true,
			...this.parseValueIntoState(props.value, props.is24Hr),
		};

		this.highlightInputText = this.highlightInputText.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onNumberChange = this.onNumberChange.bind(this);
		this.onNumberKeyDown = this.onNumberKeyDown.bind(this);
		this.onMeridianChange = this.onMeridianChange.bind(this);
		this.onTimeInputChange = this.onTimeInputChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.updateValueByStep = this.updateValueByStep.bind(this);
	}

	/**
	 * @description takes a time value and parses it out to be saved in state
	 * @param {String} value - the new time value to be parsed for state
	 * @param {Boolean} is24Hr - whether or not we are 24Hr time format
	 */
	parseValueIntoState(value, is24Hr) {
		const timeParts = getTimeParts(value);

		return {
			hours:
				value &&
				formatDigits(
					timeParts.hours % (is24Hr ? 24 : 12) || (is24Hr ? '00' : '12')
				), // TODO test midnight at is24
			minutes: value && (formatDigits(timeParts.minutes) || '00'),
			meridian: !is24Hr && timeParts.meridian,
			value,
		};
	}

	/**
	 * @function onChange
	 * @param {Object} partialState the information to update state with
	 * @description called when the hour or minute input loses focus, or when the browser-native
	 * 	time input chages. In turn calls the onChange handler prop, if there is one provided
	 * 	(eg supplied by redux-form or DateTimePicker) with the updated values
	 */
	onChange(partialState) {
		// TODO: make sure this.props.onChange called with value
		// AND onChangeCallback is called
		if (!this.props.onChange) {
			return;
		}
		const stateValues = {
			...this.state,
			...partialState,
		};
		// value in state needs to be updated
		const value = `${formatHours(
			stateValues.hours,
			stateValues.meridian
		)}:${formatDigits(stateValues.minutes)}`;
		this.props.onChange(value);
		this.props.onChangeCallback && this.props.onChangeCallback();
	}

	/**
	 * @function onTimeInputChange
	 * @param e Event Object
	 * @description called when the browser-native time input changes, in turn calls the onChange
	 * 	handler prop, if there is one provided (eg supplied by redux-form or DateTimePicker)
	 */
	onTimeInputChange(e) {
		let { value } = e.target;

		// Time inputs are allowed to return an empty string for invalid input.
		// We should ignore all invalid input and return immediately
		// Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#Validation
		if (value === '') {
			value = '00:00';
		}

		this.setState(() => ({ value }));

		this.props.onChange && this.props.onChange(value);
		this.props.onChangeCallback && this.props.onChangeCallback();
	}

	/**
	 * @function onNumberChange
	 * @param e Event Object
	 * @description called when either the hour or minute input changes,
	 * 	in turn changes the state and updates the value of the inputs
	 */
	onNumberChange(e) {
		const { value, name } = e.target;

		if (/[^\d]/.test(value)) {
			return;
		}

		this.setState(() => ({ [name]: value }));
	}

	/**
	 * @function highlightInputText
	 * @param e Event Object
	 * @description selects text when the hour or minute input gets focus
	 */
	highlightInputText(e) {
		e.target.select();
	}

	/**
	 * @function onMeridianChange
	 * @param e Event Object
	 * @description called when the meridian <select> input changes,
	 * 	in turn changes the state and updates the value of the <select>
	 */
	onMeridianChange(e) {
		const { value } = e.target;
		const meridianState = { meridian: value };

		this.setState(() => meridianState);
		this.onChange(meridianState);
	}

	/**
	 * @function onBlur
	 * @param e Event Object
	 * @description called when either the hour or minute input loses focus,
	 * 	and ensures the value entered is not out of the min/max range
	 */
	onBlur(e) {
		const { value, min, max, name } = e.target;

		const constrainedVal = this.constrainValue(min, max, value);
		this.setState(() => ({ [name]: formatDigits(constrainedVal) }));
		if (constrainedVal == value) {
			this.onChange();
		} else {
			this.onChange({ [name]: formatDigits(constrainedVal) });
		}
	}

	/**
	 * @description takes a value and makes sure its within min and max, text inputs
	 * dont have these attributes so we have to constrainn here
	 * @param {Object} minmax min and max
	 * @param {Number} value the value to constrain
	 */
	constrainValue(min = -Infinity, max = Infinity, value) {
		return Math.max(Math.min(value, max), min);
	}

	/**
	 * @description increases or decreases a value
	 * @param {Object} target target from event object
	 * @param {Boolean} isIncreasing if the value is increasing
	 * @param {Boolean} bigStep if the number should increase or decrease in a higher interval
	 */
	updateValueByStep(target, isIncreasing, bigStep) {
		const { min, max, value } = target;
		const currentVal = parseInt(value, 10);
		const step = bigStep ? 10 : 1;
		const newValue = isIncreasing ? currentVal + step : currentVal - step;

		if (newValue <= max && newValue >= min) {
			return formatDigits(newValue);
		}
	}

	onNumberKeyDown(e) {
		const { name } = e.target;
		if (e.keyCode == 38 || e.keyCode == 40) {
			e.preventDefault();
			e.persist();
			this.setState(
				() => ({
					[name]: this.updateValueByStep(e.target, e.keyCode == 38, e.shiftKey),
				}),
				() => {
					e.target.select();
				}
			);
		}
	}

	/**
	 * @description testing for time input support
	 */
	componentDidMount() {
		this.setState(() => ({
			supportsTime: !this.props.forceTextInput && this.inputEl.type === 'time',
		}));
	}

	/**
	 * @function componentWillReceiveProps
	 * @param nextProps props the component is receiving
	 * @description updates state to stay in sync with new props from the parent
	 */
	componentWillReceiveProps(nextProps) {
		// if we receive new value from a parent,
		// like redux-form, we need to update state
		// check if state is already up to date with nextProps.value
		if (this.props.value !== nextProps.value) {
			this.setState({
				...this.parseValueIntoState(nextProps.value, nextProps.is24Hr),
			});
		}
	}

	render() {
		const {
			id,
			label,
			labelClassName,
			name,
			className,
			value, // eslint-disable-line no-unused-vars
			error,
			disabled,
			is24Hr,
			onChange, // eslint-disable-line no-unused-vars
			onChangeCallback, // eslint-disable-line no-unused-vars
			suppressError, // eslint-disable-line no-unused-vars
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
						value={this.state.value}
						className={classNames.field}
						required={required}
						disabled={disabled}
						onChange={this.onTimeInputChange}
						ref={input => (this.inputEl = input)}
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
										name="hours"
										min={is24Hr ? 0 : 1}
										max={is24Hr ? 23 : 12}
										disabled={disabled}
										className={`field--reset align--center ${HOURS_INPUT_CLASS}`}
										onMouseUp={this.highlightInputText}
										onKeyDown={this.onNumberKeyDown}
										onBlur={this.onBlur}
										onChange={this.onNumberChange}
										size={2}
										maxLength={2}
										value={this.state.hours}
									/>{' '}
									{/* is24Hr ? this.state.hours % 24 : this.state.hours % 12 */}
								</FlexItem>
								<FlexItem shrink className="align--center">
									{':'}
								</FlexItem>
								<FlexItem shrink>
									<input
										type="text"
										pattern="\d*"
										id={`${id}-minutes`}
										name="minutes"
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
										value={this.state.minutes}
									/>
								</FlexItem>
								{!is24Hr && (
									<FlexItem
										shrink
										className="timeInput-meridianContainer display--flex flex--column flex--center"
									>
										<SelectInput
											id={`${id}-meridian`}
											name="meridian"
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

TimeInput.defaultProps = {
	requiredText: '*',
	is24Hr: true,
};

TimeInput.propTypes = {
	name: PropTypes.string.isRequired,
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	is24Hr: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	labelClassName: PropTypes.string,
	onChange: PropTypes.func, // redux-form or DateTimePicker provides an onChange prop
	onChangeCallback: PropTypes.func,
	helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	required: PropTypes.bool,
	requiredText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default withErrorList(TimeInput);
