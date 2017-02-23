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
			callback,	// eslint-disable-line no-unused-vars
			id,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'dateTimePicker',
			className
		);

		return (
			<input
				id={id}
				type='datetime-local'
				value={this.state.value}
				className={classNames}
				onChange={this.onChange}
				{...other} />
		);

	}
}

DateTimeLocalInput.propTypes = {};

export default DateTimeLocalInput;

