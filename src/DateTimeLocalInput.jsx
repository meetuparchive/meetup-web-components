import React from 'react';
import cx from 'classnames';

/**
 * @module DateTimeLocalInput
 * @description renders html5 datetime-local input
*/
class DateTimeLocalInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value ? (new Date(this.props.value).toISOString()).split('.')[0] : ''
			// example: 2017-02-18T00:00:00
			// leaving off milliseconds
			// datetime local wont set value with milliseconds
		};
		this.onChange = this.onChange.bind(this);
	}

	/**
	* @function onChange
	* @description sets state and calls a callback with the value
	* (callback used in wrapping components like datetimepicker)
	* @param e Event the change event
	*/
	onChange(e) {
		this.setState({ value: e.target.value });
		this.props.callback && this.props.callback(e.target.value);
	}

	render() {
		const {
			id,
			label,
			callback,	// eslint-disable-line no-unused-vars
			className,
			required,
			value,		// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'input--dateTimeLocal',
			className
		);

		const labelClassNames = cx({required});
		return (
			<div>
				<label htmlFor={id} className={labelClassNames}>{label}</label>
				<input
					id={id}
					type='datetime-local'
					value={this.state.value}
					className={classNames}
					onChange={this.onChange}
					required={required}
					{...other} />
			</div>
		);

	}
}

DateTimeLocalInput.propTypes = {
	id: React.PropTypes.string,
	label: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element,
	]),
	callback: React.PropTypes.func
};

export default DateTimeLocalInput;

