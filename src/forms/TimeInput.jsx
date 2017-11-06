import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import SelectInput from './SelectInput';

export const HOURS_INPUT_CLASS = 'timeInput-hours';
export const MINUTES_INPUT_CLASS = 'timeInput-minutes';
export const MERIDIAN_INPUT_CLASS = 'timeInput-meridian';

const formatDigits = (number) => `0${number}`.slice(-2);
const getTimeParts = (time, part) => {
	const [ hours, minutes ] = time.split(':');
	const parts = {
		hours,
		minutes,
		meridian: hours < 12 ? 'AM': 'PM',
	};
	return parts[part];
};
const formatHours = (hours, meridian) => {
	const newHours = meridian ? ((hours % 12) + (12 * (meridian === 'PM'))) : hours % 24 ;
	return formatDigits(newHours);
};

/**
* @module TimeInput
*/
class TimeInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			supportsTime: true,
			hours: props.value && (formatDigits(getTimeParts(props.value, 'hours') % (props.is24Hr ? 24 : 12)) || '12').toString(),
			minutes: props.value && (formatDigits(getTimeParts(props.value, 'minutes')) || '00').toString(),
			meridian: !props.is24Hr && getTimeParts(props.value, 'meridian'),
			value: props.value
		};

		this.onBlur = this.onBlur.bind(this);
		this.onNumberChange = this.onNumberChange.bind(this);
		this.onMeridianChange = this.onMeridianChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onTimeInputChange = this.onTimeInputChange.bind(this);
	}

	/**
	* @function onChange
	* @param partialState the information to update state with
	* @description called when the hour or minute input loses focus, or when the browser-native
	* 	time input chages. In turn calls the onChange handler prop, if there is one provided
	* 	(eg supplied by redux-form or DateTimePicker) with the updated values
	*/
	onChange(partialState) {
		if (this.props.onChange) {
			const stateValues = {
				...this.state,
				...partialState
			};

			const v = `${formatHours(stateValues.hours, stateValues.meridian)}:${formatDigits(stateValues.minutes)}`;
			this.props.onChange(v);
		}
	}

	/**
	* @function onTimeInputChange
	* @param e Event Object
	* @description called when the browser-native time input changes, in turn calls the onChange
	* 	handler prop, if there is one provided (eg supplied by redux-form or DateTimePicker)
	*/
	onTimeInputChange(e) {
		const { value } = e.target;
		this.setState(() => ({ value: value }));

		this.props.onChange && this.props.onChange(value);
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

		if (max || min) {
			const constrainedVal = Math.max(Math.min(value, max), min);
			if (constrainedVal == value) {
				this.setState(() => ({ [id]: formatDigits(value) }));
				this.onChange();
			} else {
				this.setState(() => ({ [id]: formatDigits(constrainedVal) })); // try doing onChange stuff in this setstate callback
				this.onChange({ [id]: formatDigits(constrainedVal) });
			}
		}
	}

	componentDidMount() {
		this.setState(() => ({ supportsTime: !this.props.forceTextInput && this.inputEl.type === 'time' }));
	}

	/**
	* @function componentWillReceiveProps
	* @param nextProps props the component is receiving
	* @description updates state to stay in sync with new props from the parent
	*/
	componentWillReceiveProps(nextProps) {
		if (this.props.value !== nextProps.value) {
			const props = nextProps;
			this.setState({
				hours: props.value && (formatDigits(getTimeParts(props.value, 'hours') % (props.is24Hr ? 24 : 12)) || '12').toString(),
				minutes: props.value && (formatDigits(getTimeParts(props.value, 'minutes')) || '00').toString(),
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (nextState !== this.state);
	}

	render() {
		const {
			id,
			label,
			name,
			className,
			required,
			value,	// eslint-disable-line no-unused-vars
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
			'flush--all border--none field--reset padding--left',
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
							value={this.state.value}
							className={classNames}
							required={required}
							disabled={disabled}
							onChange={this.onTimeInputChange}
							ref={ input => this.inputEl = input }
							{...other}
						/>
					:
						<div>
							<div className={fauxInputClassNames}>
								<Flex>
									<FlexItem shrink>
										<input type="text"
											pattern="\d*"
											id="hours"
											name="hours"
											min={is24Hr ? 0 : 1}
											max={is24Hr ? 23 : 12}
											disabled={disabled}
											className={`field--reset align--center ${HOURS_INPUT_CLASS}`}
											onBlur={this.onBlur}
											onChange={this.onNumberChange}
											maxLength={2}
											value={this.state.hours} /> {/* is24Hr ? this.state.hours % 24 : this.state.hours % 12 */}
									</FlexItem>
									<FlexItem shrink className="align--center">
										{':'}
									</FlexItem>
									<FlexItem shrink>
										<input type="text"
											pattern="\d*"
											id="minutes"
											name="minutes"
											min={0}
											max={59}
											disabled={disabled}
											className={`field--reset align--center ${MINUTES_INPUT_CLASS}`}
											onBlur={this.onBlur}
											onChange={this.onNumberChange}
											maxLength={2}
											value={this.state.minutes} />
									</FlexItem>
									{ !is24Hr &&
										<FlexItem shrink>
											<SelectInput
												id="meridian"
												name="meridian"
												className={meridianClassNames}
												disabled={disabled}
												onChange={this.onMeridianChange}
												value={this.state.meridian}
												options={[
													{ label: 'AM', value: 'AM' },
													{ label: 'PM', value: 'PM' }
												]}
											/>
										</FlexItem>
									}
								</Flex>
							</div>
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

