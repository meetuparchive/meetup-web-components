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
	componentWillReceiveProps(nextProps) {
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
	name: PropTypes.string.isRequired,
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	is24Hr: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	labelClassName: PropTypes.string,
	onChange: PropTypes.func, // redux-form or DateTimePicker provides an onChange prop
	onChangeCallback: PropTypes.func,
	helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	required: PropTypes.bool,
	requiredText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
