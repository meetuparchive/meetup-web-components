import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Icon from '../media/Icon';
import withErrorList from '../utils/components/withErrorList';

/**
 * @module SelectInput
 */
export class SelectInput extends React.PureComponent {
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
		const {
			children,
			className,
			labelClassName,
			label,
			options,
			id,
			name,
			error,
			errors,
			onChange, // eslint-disable-line no-unused-vars
			value, // eslint-disable-line no-unused-vars
			helperText,
			required,
			requiredText,
			...other
		} = this.props;

		const classNames = {
			label: cx(
				'label--field',
				{
					'label--required': required,
					'flush--bottom': helperText,
				},
				labelClassName
			),
			field: cx(
				'select--reset span--100 padding--selectArrow',
				{ 'field--error': (errors && errors.length > 0) || error },
				className
			),
			helperText: cx('helperTextContainer', { required }),
		};

		return (
			<div>
				<div className="inputContainer">
					{label && (
						<label
							className={classNames.label}
							htmlFor={name}
							data-requiredtext={required && requiredText}
						>
							{label}
						</label>
					)}
					{helperText && (
						<div className={classNames.helperText}>{helperText}</div>
					)}
					<select
						name={name}
						id={id || name}
						required={required}
						className={classNames.field}
						onChange={this.onChange}
						value={this.state.value}
						{...other}
					>
						{options.map((option, key) => (
							<option key={key} value={option.value} disabled={option.disabled}>
								{option.label}
							</option>
						))}
					</select>
					<Icon className="select-customArrow" shape="chevron-down" size="xs" />
				</div>
				{children}
			</div>
		);
	}
}

SelectInput.defaultProps = {
	requiredText: '*',
};

SelectInput.propTypes = {
	/** The `name` attribute for the input */
	name: PropTypes.string.isRequired,

	/** Adds an `id` attribute to the `<select />`, and associates it with the `<label />` */
	id: PropTypes.string,

	/** Provides a list of option data to render each `<option />` in the `<select />` */
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
		})
	).isRequired,

	/** Error content to render */
	error: PropTypes.string,

	/** A list of errors */
	errors: PropTypes.array,

	/** What we render into the input's `<label />` */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	/** The class name/s to add to the `<label />` element */
	labelClassName: PropTypes.string,

	/** Which `<option />` is selected */
	value: (props, propName, componentName) => {
		const validValues = props.options.map(opt => opt.value);

		if (props[propName] && !validValues.includes(props[propName])) {
			return new Error(
				`${propName} prop supplied to ${componentName} does not match any supplied options values`
			);
		}
	},

	/** An additional piece of helpful info rendered with the field */
	helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	/** Whether the field is required to have a value */
	required: PropTypes.bool,

	/** What to render in order to indicate the field is required */
	requiredText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default withErrorList(SelectInput);
