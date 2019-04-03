import PropTypes from 'prop-types';
import React from 'react';

import InputTime from './InputTime';

// Deprecated - use <InputTime> directly, supply `value` from parent
export default class TimeInput extends React.PureComponent {
	state = { supportsTime: true, value: this.props.value };

	// consume the `value` returned to InputTime's onChange callback
	onChange = value => {
		this.setState({ value }, () => {
			this.props.onChange && this.props.onChange(value);
			this.props.onChangeCallback && this.props.onChangeCallback();
		});
	};

	// description updates state to stay in sync with new props from the parent
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.props.value !== nextProps.value) {
			this.setState({ value: nextProps.value });
		}
	}

	render() {
		const {
			value, // eslint-disable-line no-unused-vars
			onChange, // eslint-disable-line no-unused-vars
			onChangeCallback, // eslint-disable-line no-unused-vars
			required,
			requiredText,
			...other
		} = this.props;
		return (
			<InputTime
				{...other}
				required={required && (requiredText || '*')}
				value={this.state.value}
				onChange={this.onChange}
			/>
		);
	}
}

TimeInput.propTypes = {
	/** The `name` attribute for the input */
	name: PropTypes.string.isRequired,

	/** Error content to render */
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

	/** Whether to render time in 24hr time format (e.g.: 02:00 PM => 14:00) */
	is24Hr: PropTypes.bool,

	/** What we render into the input's `<label />` */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	/** The class name/s to add to the `<label />` element */
	labelClassName: PropTypes.string,

	/** onChange function that happens when input value changes */
	onChange: PropTypes.func, // redux-form or DateTimePicker provides an onChange prop

	/** Callback that happens after onChange is complete */
	onChangeCallback: PropTypes.func,

	/** An additional piece of helpful info rendered with the field */
	helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	/** Whether the field is required to have a value */
	required: PropTypes.bool,

	/** What to render in order to indicate the field is required */
	requiredText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
