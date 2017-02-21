import React from 'react';
import cx from 'classnames';

/**
* @module TimeInput
*/
class TimeInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value || ''
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		const value = e.target.value;
		this.setState(value);
		this.props.callback && this.props.callback(value);
	}

	render() {
		const {
			id,
			value,
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
				type='time'
				value={value}
				className={classNames}
				onChange={this.onChange}
				{...other} />
		);

	}
}

TimeInput.propTypes = {};

export default TimeInput;

