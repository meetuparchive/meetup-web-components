import React from 'react';
import cx from 'classnames';

/**
* @module DateTimeLocalInput
*/
class DateTimeLocalInput extends React.Component {

	constructor(props) {
		super(props);
		this.processInput = this.processInput.bind(this);
	}

	processInput(e) {
		this.onChange({ datetime: e.target.value });
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
				type='datetime-local'
				value={value}
				className={classNames}
				onChange={this.processInput}
				{...other} />
		);

	}
}

DateTimeLocalInput.propTypes = {};

export default DateTimeLocalInput;

