import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import SelectInput from './SelectInput';

export const HOURS_INPUT_CLASS = 'timeInput-hours';
export const MINUTES_INPUT_CLASS = 'timeInput-minutes';
export const MERIDIAN_INPUT_CLASS = 'timeInput-meridian';
export const HIDDEN_INPUT_CLASS = 'timeInput-hidden';

const HOURS_KEY = 'hours';
const MINUTES_KEY = 'minutes';
const MERIDIAN_KEY = 'meridian';

const formatDigits = (number) => `0${number}`.slice(-2);
const formatHours = (hours, meridian) => {
	const newHours = meridian ? (hours % 12 + 12 * (meridian === 'PM')) : hours % 24 ;
	return formatDigits(newHours);

};
const getTimeParts = (time, part) => {
	const [ hours, minutes ] = time.split(':');
	const parts = {
		[HOURS_KEY]: hours,
		[MINUTES_KEY]: minutes,
		[MERIDIAN_KEY]: hours < 12 ? 'AM': 'PM',
	};
	return parts[part];
};

const parseValue = (value, is24Hr) => {
	return {
		hours: (formatDigits(getTimeParts(value, HOURS_KEY) % (is24Hr ? 24 : 12)) || '12').toString(),
		minutes: (formatDigits(getTimeParts(value, MINUTES_KEY)) || '00').toString(),
		meridian: is24Hr && getTimeParts(value, MERIDIAN_KEY)
	};
};

/**
* @module TimeInput
*/
class TimeInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			supportsTime: true
		};

		this.onBlur = this.onBlur.bind(this);
		this.onNumberChange = this.onNumberChange.bind(this);
		this.onMeridianChange = this.onMeridianChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onTimeInputChange = this.onTimeInputChange.bind(this);
	}

	/**
	* @function onChange
	* @param e Event Object
	* @description called when the input changes, in turn calls the onChange
	* 	handler prop, if there is one provided (eg supplied by redux-form or DateTimePicker)
	*/
	onChange(constrainedValue) {

		if (this.props.onChange) {

			const timeValues = {
				[HOURS_KEY]: parseInt(this.hoursInputEl.value),
				[MINUTES_KEY]: parseInt(this.minutesInputEl.value),
				...constrainedValue
			};

			const meridian = this.meridianInputEl ? this.meridianInputEl.value : '';

			if (!this.props.is24Hr && meridian) {
				const hours = timeValues[HOURS_KEY];
				if (meridian === 'PM') {
					timeValues[HOURS_KEY] = hours + 12;
				} else {
					timeValues[HOURS_KEY] = (hours === 12) ? 0 : hours;
				}
			}

			const value = `${formatDigits(timeValues[HOURS_KEY])}:${formatDigits(timeValues[MINUTES_KEY])}`;
			console.log('this on change value ', value);
			this.props.onChange(value);
		}
	}

	onTimeInputChange(e) {
		this.props.onChange && this.props.onChange(e);
	}

	/**
	* @function onNumberChange
	* @param e Event Object
	* @description called when either the hour or minute input changes,
	* 	in turn changes the state and updates the value of the inputs
	*/
	onNumberChange(e) {
		const { value, id } = e.target;

		this.setState(() => ({ [id]: value }));
	}
	/**
	* @function onMeridianChange
	* @param e Event Object
	* @description called when the meridian <select> input changes,
	* 	in turn changes the state and updates the value of the <select>
	*/
	onMeridianChange(e) {
		const { value } = e.target;

		this.setState(() => ({ meridian: value }));
	}

	/**
	* @function onBlur
	* @param e Event Object
	* @description called when either the hour or minute input loses focus,
	* 	and ensures the value entered is not out of the min/max range
	*/
	onBlur(e) {
		const { value, min, max, id } = e.target;
		console.log('onBlur');
		if (max || min) {
			const constrainedVal = Math.max(Math.min(value, max), min);
			if (constrainedVal !== value) {
				// this.setState(() => ({ [id]: constrainedVal }));
				this.onChange({ [id]: constrainedVal });
			}
		} else {
			this.onChange();
		}
	}

	componentDidMount() {
		this.setState(() => ({ supportsTime: !this.props.forceTextInput && this.inputEl.type === 'time' }));
	}

	componentWillReceiveProps(nextProps) {
		// if we get new values from redux form, parse them
		// if (this.props.value !== nextProps.value && !this.state.supportsTime) {
		// 	const props = nextProps;
		// 	const newTimeValues = parseValue(props.value, props.is24Hr);
		// 	this.setState(newTimeValues);
		// }
		console.log('component will receive props');
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log('component should!!!!', nextState !== this.state);
	// 	return (!this.state.supportsTime && nextState !== this.state);
	// }

	render() {
		const {
			id,
			label,
			name,
			className,
			required,
			value,
			error,
			disabled,
			is24Hr,
			onChange,	// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'input--time select--reset',
			className
		);

		const fauxInputClassNames = cx(
			'fauxInput fauxInput--time',
			{
				disabled,
				error
			}
		);

		const meridianClassNames = cx(
			MERIDIAN_INPUT_CLASS,
			'flush--all border--none field--reset',
			{
				disabled,
				error
			}
		);

		const labelClassNames = cx(
			'label--field',
			{ required }
		);

		const errorId = `${id}-error`;

		if (error) {
			other['aria-invalid'] = true;
			other['aria-describedby'] = errorId;
		}

		let parsedValues = {};
		if (!this.state.supportsTime) {
			parsedValues = parseValue(value, is24Hr);
			console.log('parsedValues = ', parsedValues);
		}

		return (
			<div>
				{ label && <label htmlFor={id} className={labelClassNames}>{label}</label> }
				{
					this.state.supportsTime
					?
						<input
							id={id}
							type='time'
							name={name}
							value={value}
							className={classNames}
							required={required}
							disabled={disabled}
							onChange={this.onChange}
							ref={ input => this.inputEl = input }
							{...other}
						/>
					:
						<div>
							<div className={fauxInputClassNames}>
								<Flex>
									<FlexItem>
										<input type="text"
											pattern="\d*"
											id={HOURS_KEY}
											name={HOURS_KEY}
											min={is24Hr ? 0 : 1}
											max={is24Hr ? 23 : 12}
											disabled={disabled}
											className={`field--reset align--center ${HOURS_INPUT_CLASS}`}
											onBlur={this.onBlur}
											maxLength={2}
											value={parsedValues[HOURS_KEY]}
											ref={ input => this.hoursInputEl = input }
										/> {/* is24Hr ? this.state.hours % 24 : this.state.hours % 12 */}
									</FlexItem>
									<FlexItem className="align--center">
										{':'}
									</FlexItem>
									<FlexItem>
										<input type="text"
											pattern="\d*"
											id={MINUTES_KEY}
											name={MINUTES_KEY}
											min={0}
											max={59}
											disabled={disabled}
											className={`field--reset align--center ${MINUTES_INPUT_CLASS}`}
											onBlur={this.onBlur}
											maxLength={2}
											ref={ input => this.minutesInputEl = input }
											value={parsedValues[MINUTES_KEY]} />
									</FlexItem>
									{ !is24Hr &&
										<FlexItem shrink className="timeInput-meridianContainer">
											<SelectInput
												id={MERIDIAN_KEY}
												name={MERIDIAN_KEY}
												className={meridianClassNames}
												disabled={disabled}
												onChange={this.onChange}
												value={parsedValues[MERIDIAN_KEY]}
												ref={ input => this.meridianInputEl = input }
												options={[
													{ label: 'AM', value: 'AM' },
													{ label: 'PM', value: 'PM' }
												]}
											/>
										</FlexItem>
									}
								</Flex>
							</div>
							<input
								type="hidden"
								id={id}
								name={name}
								value={`${formatHours(this.state.hours, this.state.meridian)}:${this.state.minutes}`}
								onChange={this.onChange}
							/>
						</div>
				}

				{ error && <p id={errorId} className='text--error text--small'>{error}</p> }
			</div>
		);

	}
}

TimeInput.defaultProps = {
	is24Hr: true
};

TimeInput.propTypes = {
	name: PropTypes.string.isRequired,
	error: PropTypes.string,
	is24Hr: PropTypes.bool,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	required: PropTypes.bool,
	onChange: PropTypes.func,			// redux-form or DateTimePicker provides an onChange prop
};



export default TimeInput;

