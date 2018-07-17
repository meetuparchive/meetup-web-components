import PropTypes from 'prop-types';
import React from 'react';

import Select from './Select';

/**
 * Deprecated - use <Select> directly, supply `value` from parent
 * @module SelectInput
 * @deprecated
 */
export default class SelectInput extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value || (props.options[0] || {}).value,
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ value: e.target.value });
		if (this.props.onChange) {
			this.props.onChange(e);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState(() => ({ value: nextProps.value }));
		}
	}

	render() {
		// eslint-disable-next-line no-unused-vars
		const { options, error, errors, requiredText, required, ...other } = this.props;
		const { value } = this.state;
		const actualRequired = required && requiredText;

		return (
			<Select
				{...other}
				value={value}
				required={actualRequired}
				error={(errors && errors.length > 0) || error}
				onChange={this.onChange}
			>
				{options.map((option, key) => (
					<option key={key} value={option.value} disabled={option.disabled}>
						{option.label}
					</option>
				))}
			</Select>
		);
	}
}

SelectInput.defaultProps = {
	requiredText: '*',
};

SelectInput.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
		})
	).isRequired,
	error: PropTypes.string,
	errors: PropTypes.array,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	labelClassName: PropTypes.string,
	value: (props, propName, componentName) => {
		const validValues = props.options.map(opt => opt.value);

		if (props[propName] && !validValues.includes(props[propName])) {
			return new Error(
				`${propName} prop supplied to ${componentName} does not match any supplied options values`
			);
		}
	},
	helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	required: PropTypes.bool,
	requiredText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
