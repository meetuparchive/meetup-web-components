import React from 'react';
import cx from 'classnames';

/**
 * @module SelectInput
 */
class SelectInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value || props.options[0].value
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ value: e.target.value });
		if (this.props.onChange) {
			this.props.onChange(e);
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
			errors,
			required,
			onChange, // eslint-disable-line no-unused-vars
			value, // eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			{ 'field--error': errors && errors.length > 0 },
			className
		);

		const labelClassNames = cx(
			'label--field',
			{ required },
			labelClassName
		);

		return (
			<div>
				{label &&
					<label className={labelClassNames} htmlFor={other.id}>
						{label}
					</label>
				}

				<select
					name={name}
					required={required}
					className={classNames}
					onChange={this.onChange}
					value={this.state.value}
					{...other}
				>
					{
						options.map((option, key) =>
							<option key={key} value={option.value}>{option.label}</option>
						)
					}
				</select>

				{
					errors && errors.length > 0 &&
						errors.map((error, key) =>
							<p key={key} className='text--error'>{error}</p>
						)
				}
				{children}
			</div>
		);
	}
}

SelectInput.propTypes = {
	name: React.PropTypes.string.isRequired,
	required: React.PropTypes.bool,
	options: React.PropTypes.arrayOf(React.PropTypes.shape({
		label: React.PropTypes.string.isRequired,
		value: React.PropTypes.string.isRequired,
	})).isRequired,
	errors: React.PropTypes.array,
	label: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	labelClassName: React.PropTypes.string,
	value: (props, propName, componentName) => {
		const validValues = props.options.map(opt => opt.value);

		if (!validValues.includes(props[propName])) {
			return new Error(`${propName} prop supplied to ${componentName} does not match any supplied options values`);
		}
	},
};

export default SelectInput;
