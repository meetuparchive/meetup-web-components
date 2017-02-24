import React from 'react';
import cx from 'classnames';

/**
* @module DateTimeLocalInput
*/
class DateTimeLocalInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value || ''
		};
		this.onChange = this.onChange.bind(this);
	}

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
			...other
		} = this.props;

		const classNames = cx(
			'dateTimePicker',
			className
		);

		return (
			<div>
				<label htmlFor={id}>{label}</label>
				<input
					id={id}
					type='datetime-local'
					value={this.state.value}
					className={classNames}
					onChange={this.onChange}
					{...other} />
			</div>
		);

	}
}

DateTimeLocalInput.propTypes = {
	id: React.PropTypes.string,
	label: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.string,
	]),
	callback: React.PropTypes.func
};

export default DateTimeLocalInput;

