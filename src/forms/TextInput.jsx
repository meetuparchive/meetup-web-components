import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

/**
 * @module TextInput
 */
class TextInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: props.value || '',
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
			name,
			value, // eslint-disable-line no-unused-vars
			label,
			labelClassName,
			className,
			children,
			error,
			required,
			id,
			onChange, // eslint-disable-line no-unused-vars
			isSearch,
			maxLength,
			pattern,
			disabled
		} = this.props;

		const classNames = cx(
			{ 'field--error': error },
			className
		);

		const labelClassNames = cx(
			'label--field',
			{ required, disabled },
			labelClassName
		);

		return (
			<div>
				{label &&
					<label className={labelClassNames} htmlFor={id}>
						{label}
					</label>
				}

				<input type={isSearch ? 'search' : 'text'}
					name={name}
					value={this.state.value}
					required={required}
					className={classNames}
					onChange={this.onChange}
					maxLength={maxLength}
					pattern={pattern}
					disabled={disabled}
					id={id} />

				{ this.props.maxLength && <p className='text--caption align--right'>{this.state.value.length} / {this.props.maxLength}</p> }

				{ error && <p className='text--error'>{error}</p> }
				{children}
			</div>
		);
	}
}

TextInput.propTypes = {
	name: PropTypes.string.isRequired,
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	id: PropTypes.string,
	maxLength: PropTypes.number,
	pattern: PropTypes.string,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	labelClassName: PropTypes.string,
	required: PropTypes.bool,
	isSearch: PropTypes.bool,
	onChange: PropTypes.func,
	disabled: PropTypes.bool
};

export default TextInput;
