import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import SelectInput from './SelectInput';

let supportsTime = true;
const formatDigits = (number) => `0${number}`.slice(-2);

/**
* @module TimeInput
*/
class TimeInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			hours: props.hours || '01',
			minutes: props.minutes || '00',
			meridian: props.meridian || props.isMilitaryTime ? false : 'PM'
		};

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

	componentDidMount() {
		supportsTime = this.inputEl.type === 'time'; /* comment OUT this line to test in browsers that support time */
		// supportsTime = false; /* UNcomment this line to test in browsers that support */
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
			onChange,			// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'input--time',
			className
		);

		const labelClassNames = cx(
			'label--field',
			{ required }
		);

		const errorId = `${id}-error`;

		const formatHours = (hours, meridian) => meridian ? (this.state.hours % 12 + 12 * (meridian === 'PM')) : (this.state.hours % 24);
		const getMaxHours = (meridian) => meridian ? 12 - (meridian === 'AM') : 24;

		if (error) {
			other['aria-invalid'] = true;
			other['aria-describedby'] = errorId;
		}

		return (
			<span>
				{ label && <label htmlFor={id} className={labelClassNames}>{label}</label> }
				{
					supportsTime
					?
						<input
							id={id}
							type='time'
							name={name}
							value={value}
							className={classNames}
							required={required}
							onChange={this.onChange}
							ref={ input => this.inputEl = input }
							{...other}
						/>
					:
						<div>
							<Flex>
								<FlexItem>
									<div className="fauxInput">
										<Flex>
											<FlexItem shrink>
												<input type="number"
													id="hours"
													name="hours"
													min={this.state.meridian ? 1 : 0} // return number from merdian true/false?
													max={getMaxHours(this.state.meridian)}
													className="field--reset"
													onChange={this.onHoursChange}
													value={this.state.meridian ? this.state.hours : this.state.hours % 24} /> { /* this.state.hours % 24 */ }
											</FlexItem>
											<FlexItem shrink>
												{':'}
											</FlexItem>
											<FlexItem shrink>
												<input type="number"
													id="minutes"
													name="minutes"
													min={0}
													max={59}
													className="field--reset"
													onChange={this.onMinutesChange}
													value={this.state.minutes} />
											</FlexItem>
										</Flex>
									</div>
								</FlexItem>
								{ this.state.meridian &&
									<FlexItem shrink>
										<SelectInput
											id='meridian'
											name='meridian'
											onChange={this.onMeridianChange}
											options={[
												{ label: 'PM', value: 'PM' },
												{ label: 'AM', value: 'AM' }
											]}
										/>
									</FlexItem>
								}
							</Flex>
							<input type="text" value={`${formatHours(this.state.hours, this.state.meridian)}:${this.state.minutes}`} />
						</div>
				}

				{ error && <p id={errorId} className='text--error text--small'>{error}</p> }
			</span>
		);

	}
}

TimeInput.defaultProps = {
	isMilitaryTime: false
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

