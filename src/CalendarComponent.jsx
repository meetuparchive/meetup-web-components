import React from 'react';
import cx from 'classnames';
import Flatpickr from 'flatpickr';

/**
 * @module CalendarComponent
 * inits flatpickr js date picker over a text input
*/
class CalendarComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value || ''
		};
		this.onChange = this.onChange.bind(this);
		this.onOpen = this.onOpen.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	/**
	* @description init the js date flatpickr component
	*/
	componentDidMount() {
		const options = {
			onChange: this.onChange,
			onOpen: this.onOpen,
			onClose: this.onClose,
			altInput: true,
			altFormat: 'D M d, Y', // TODO localize
			defaultDate: this.props.value
		};

		Object.assign(options, this.props.opts);
		this.flatpickr = new Flatpickr(this.node, options);
	}

	componentWillUnmount() {
		this.flatpickr && this.flatpickr.destroy();
	}

	/**
	* @function onChange
	* @param Array selectedDates
	* @param dateStr
	* @param Object instance the calendar instance
	* @description signature conforms to the onChange handler flatpickr expects
	* calls the callback with the selectedDates value (callback used in wrapping components)
	*/
	onChange(selectedDates, dateStr, instance) {
		this.setState({ value: selectedDates[0] });
		this.props.callback && this.props.callback(selectedDates[0]);
	}

	/**
	* @function onOpen
	* @description event hook for flatpickr, used to call onFocus
	* and apply focus highlight if this is a DateTimePicker
	*/
	onOpen() {
		this.props.onFocus && this.props.onFocus();
	}

	/**
	* @function onClose
	* @description event hook for flatpickr, used to call onBlur
	* and remove focus highlight if this is a DateTimePicker
	*/
	onClose() {
		this.props.onBlur && this.props.onBlur();
	}

	render() {
		const {
			callback,	// eslint-disable-line no-unused-vars
			className,
			id,
			name,
			value,		// eslint-disable-line no-unused-vars
			opts,		// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'input--dateTimePicker',
			className
		);

		return (
			<input
				id={id}
				type='text'
				name={name}
				defaultValue={this.state.value}
				className={classNames}
				ref={ node => this.node = node }
				{...other} />
		);
	}
}

CalendarComponent.propTypes = {
	name: React.PropTypes.string.isRequired,
	callback: React.PropTypes.func
};

export default CalendarComponent;

