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

const formatDigits = (number) => `0${number}`.slice(-2);
const getTimeParts = (time, part) => {
	const splitTime = time.split(':');
	const timeParts = new Object();

	timeParts.hours = splitTime[0];
	timeParts.minutes = splitTime[1];
	timeParts.meridian = splitTime[0] > 11 ? 'PM' : 'AM';

	return (timeParts[part]);
};

/**
* @module TimeInput
*/
class TimeInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			supportsTime: true,
			hours: props.value && formatDigits(getTimeParts(props.value, 'hours') % (props.is24Hr ? 24 : 12)) || '12',
			minutes: props.value && formatDigits(getTimeParts(props.value, 'minutes')) || '00',
			meridian: !props.is24Hr && getTimeParts(props.value, 'meridian')
		};

		this.onBlur = this.onBlur.bind(this);
		this.onNumberChange = this.onNumberChange.bind(this);
		this.onMeridianChange = this.onMeridianChange.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	/**
	* @function onChange
	* @param e Event Object
	* @description called when the input changes, in turn calls the onChange
	* 	handler prop, if there is one provided (eg supplied by redux-form or DateTimePicker)
	*/
	onChange(e) {
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

		id === 'hours' &&
			this.setState(() => ({ hours: value }));

		id === 'minutes' &&
			this.setState(() => ({ minutes: value }));
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

		if (value > max){
			e.target.value = max;

			id === 'hours' &&
				this.setState(() => ({ hours: formatDigits(max) }));

			id === 'minutes' &&
				this.setState(() => ({ minutes: formatDigits(max) }));

		} else if (value < parseInt(min)){
			e.target.value = min;

			id === 'hours' &&
				this.setState(() => ({ hours: formatDigits(min) }));

			id === 'minutes' &&
				this.setState(() => ({ minutes: formatDigits(min) }));
		}
	}

	componentDidMount() {
		this.setState(() => ({ supportsTime: this.inputEl.type === 'time' }));
	}

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
			'input--time',
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

		const formatHours = (hours, meridian) => {
			const newHours = meridian ? (hours % 12 + 12 * (meridian === 'PM')) : hours % 24 ;
			return(
				formatDigits(newHours)
			);
		};

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
									<FlexItem className="align--center">
										{':'}
									</FlexItem>
									<FlexItem>
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
										<FlexItem shrink className="timeInput-meridianContainer">
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
							<input
								type="hidden"
								className={HIDDEN_INPUT_CLASS}
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

