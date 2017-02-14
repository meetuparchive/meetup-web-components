import React from 'react';
import cx from 'classnames';
import Flatpickr from 'flatpickr';

/**
 * @module DateTimePicker
 */
class DateTimePicker extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isSupported: false
		};
	}

	componentWillReceiveProps(props) {
		if (props.value) {
			this.flatpickr && this.flatpickr.setDate(props.value);
		}
	}

	// test for browser support
	componentWillMount() {
		const input = document.createElement('input'),
			testValue = 'notadate';

		input.setAttribute('type', 'datetime-local');
		input.setAttribute('value', testValue);

		// some browsers (as Android stock browsers) pretend they support
		// certain input types, so set the value and see
		this.setState({ isSupported: input.value !== testValue });
	}

	// init the js datetime component if there is no native support
	componentDidMount() {
		if (!this.state.isSupported) {
			const options = {
				...this.props.options,
				onChange: this.props.onChange
			};
			this.flatpickr = new Flatpickr(this.node, options);
		}
	}

	componentWillUnmount() {
		this.flatpickr && this.flatpickr.destroy();
	}

	render() {
		const {
			onChange, // eslint-disable-line no-unused-vars
			options,  // eslint-disable-line no-unused-vars
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
				value={value}
				className={classNames}
				ref={ node => this.node = node }
				{...other} />
		);
	}
}

DateTimePicker.propTypes = {};

export default DateTimePicker;
