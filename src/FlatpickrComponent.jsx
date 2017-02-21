import React from 'react';
import cx from 'classnames';
import Flatpickr from 'flatpickr';

/**
 * @module FlatpickrComponent
 */
class FlatpickrComponent extends React.Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	componentWillReceiveProps(props) {
		this.flatpickr && this.flatpickr.setDate(this.props.value);
	}

	// init the js datetime component
	// if there is no native support
	componentDidMount() {
		const options = {
			...this.props.datepickerOptions,
			onChange: this.onChange,
			altInput: true,
			altFormat: 'M d, Y h:i K' // TODO localize
		};
		this.flatpickr = new Flatpickr(this.node, options);
	}

	componentWillUnmount() {
		this.flatpickr && this.flatpickr.destroy();
	}

	onChange(selectedDates, dateStr, instance) {
		this.setState({ date: selectedDates[0] });
		// this.props.callback && this.props.callback(selectedDates[0]);
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
				type='text'
				defaultValue={value}
				className={classNames}
				ref={ node => this.node = node }
				{...other} />
		);
	}
}

FlatpickrComponent.propTypes = {};
export default FlatpickrComponent;

