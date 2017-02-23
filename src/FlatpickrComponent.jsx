import React from 'react';
import cx from 'classnames';
import Flatpickr from 'flatpickr';

/**
 * @module FlatpickrComponent
 */
class FlatpickrComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value || ''
		};
		this.onChange = this.onChange.bind(this);
	}

	// init the js datetime component
	// if there is no native support
	componentDidMount() {
		const options = {
			...this.props.datepickerOptions,
			onChange: this.onChange,
			altInput: true,
			// altFormat: 'M d, Y h:i K', // TODO localize
			altFormat: 'D M d, Y', // TODO localize
			defaultDate: this.props.value
		};
		this.flatpickr = new Flatpickr(this.node, options);
	}

	componentWillUnmount() {
		this.flatpickr && this.flatpickr.destroy();
	}

	onChange(selectedDates, dateStr, instance) {
		this.setState({ value: selectedDates[0] });
		this.props.callback && this.props.callback(selectedDates[0]);
	}

	render() {
		const {
			callback,	// eslint-disable-line no-unused-vars
			value,	// eslint-disable-line no-unused-vars
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
				type='text'
				defaultValue={this.state.value}
				className={classNames}
				ref={ node => this.node = node }
				{...other} />
		);
	}
}

FlatpickrComponent.propTypes = {};
export default FlatpickrComponent;

