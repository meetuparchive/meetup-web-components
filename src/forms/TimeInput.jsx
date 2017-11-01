import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import SelectInput from './SelectInput';

export const FAUX_INPUT_CLASS = 'fauxInput';
export const MERIDIAN_CLASS = 'timeInput-meridian';

// let supportsTime = true;
const formatDigits = (number) => `0${number}`.slice(-2);

/**
* @module TimeInput
*/
class TimeInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			supportsTime: true,
			hours: props.hours || '12',
			minutes: props.minutes || '00',
			meridian: props.meridian || props.is24Hr ? false : 'AM'
		};

		this.onBlur = this.onBlur.bind(this);
		this.onHoursChange = this.onHoursChange.bind(this);
		this.onMinutesChange = this.onMinutesChange.bind(this);
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

	onHoursChange(e) {
		const { value } = e.target;

		console.log(formatDigits(value));

		this.setState(() => ({ hours: formatDigits(value) }));
	}

	onMinutesChange(e) {
		const { value } = e.target;

		this.setState(() => ({ minutes: formatDigits(value) }));
	}

	onMeridianChange(e) {
		const { value } = e.target;

		this.setState(() => ({ meridian: value }));
	}

	onBlur(e) {
		const { value, min, max, id } = e.target;

		if (value > max){
			e.target.value = max;

			id === 'hours' &&
				this.setState(() => ({ hours: formatDigits(max) }));

			id === 'minutes' &&
				this.setState(() => ({ minutes: formatDigits(max) }));

		} else if (value < min){
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
			is24Hr,		// eslint-disable-line no-unused-vars
			onChange,	// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'input--time',
			className
		);

		const fauxInputClassNames = cx(
			FAUX_INPUT_CLASS,
			`${FAUX_INPUT_CLASS}--time`,
			{
				disabled,
				error
			}
		);

		const meridianClassNames = cx(
			MERIDIAN_CLASS,
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
			const newHours = meridian ? (hours % 12 + 12 * (meridian === 'PM')) : (hours % 24);
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
											min={this.state.meridian ? 1 : 0} // return number from merdian true/false?
											max={this.state.meridian ? 12 : 24}
											disabled={disabled}
											className="field--reset align--center"
											onBlur={this.onBlur}
											onChange={this.onHoursChange}
											value={formatDigits(this.state.meridian ? this.state.hours : this.state.hours % 24)} />
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
											className="field--reset align--center"
											onBlur={this.onBlur}
											onChange={this.onMinutesChange}
											value={this.state.minutes} />
									</FlexItem>
									{ this.state.meridian &&
										<FlexItem shrink className="timeInput-meridianContainer">
											<SelectInput
												id="meridian"
												name="meridian"
												className={meridianClassNames}
												disabled={disabled}
												onChange={this.onMeridianChange}
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
								type="text" // will be "hidden" when we're done debugging
								className="span--100"
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
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	required: PropTypes.bool,
	onChange: PropTypes.func,			// redux-form or DateTimePicker provides an onChange prop
};



export default TimeInput;

