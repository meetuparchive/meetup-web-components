import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Icon from '../media/Icon';

/**
 * @module SelectInput
 */
class SelectInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value || (props.options[0] || {}).value
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
		const {
			children,
			className,
			labelClassName,
			label,
			options,
			name,
			error,
			errors,
			required,
			onChange, // eslint-disable-line no-unused-vars
			value, // eslint-disable-line no-unused-vars
			helperText,
			...other
		} = this.props;

		const classNames = {
			label: cx(
				'label--field',
				{
					required,
					'flush--bottom': helperText
				},
				labelClassName
			),
			field: cx(
				'select--reset span--100 padding--selectArrow',
				{ 'field--error': errors && errors.length > 0 || error },
				className
			),
			helperText: cx(
				'helperTextContainer text--small',
				{ required }
			)
		};

		return (
			<div>
				<div className="inputContainer">
					{label &&
						<label className={classNames.label} htmlFor={other.id}>
							{label}
						</label>
					}
					{helperText &&
						<div className={classNames.helperText}>
							{helperText}
						</div>
					}
					<select
						name={name}
						required={required}
						className={classNames.field}
						onChange={this.onChange}
						value={this.state.value}
						{...other}
					>
						{
							options.map((option, key) =>
								(<option key={key}
									value={option.value}
									disabled={option.disabled}>
									{option.label}
								</option>)
							)
						}
					</select>
					<Icon
						className="select-customArrow"
						shape="chevron-down"
						size="xs"
					/>
				</div>
				{error && <p className='text--error text--small'>{error}</p>}
				{
					errors && errors.length > 0 &&
						errors.map((error, key) =>
							<p key={key} className='text--error text--small'>{error}</p>
						)
				}
				{children}
			</div>
		);
	}
}

SelectInput.propTypes = {
	name: PropTypes.string.isRequired,
	required: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
	})).isRequired,
	error: PropTypes.string,
	errors: PropTypes.array,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	labelClassName: PropTypes.string,
	value: (props, propName, componentName) => {
		const validValues = props.options.map(opt => opt.value);

		if (props[propName] && !validValues.includes(props[propName])) {
			return new Error(`${propName} prop supplied to ${componentName} does not match any supplied options values`);
		}
	},
	helperText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	])
};

export default SelectInput;
