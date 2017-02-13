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
	}

	render() {
		const {
			name,
			value,	// eslint-disable-line no-unused-vars
			label,
			labelClassName,
			className,
			children,
			error,
			required,
			...other
		} = this.props;

		const classNames = cx(
			{ 'field--error': error },
			className
		);

		const labelClassNames = cx(
			{ required },
			labelClassName
		);

		return (
			<div>
				<label className={labelClassNames} htmlFor={other.id}>
					{label}
				</label>

				<input type='text'
					name={name}
					value={this.state.value}
					required={required}
					className={classNames}
					onChange={this.onChange}
					{...other} />

				{ this.props.maxLength && <p className='text--caption align--right'>{this.state.value.length} / {this.props.maxLength}</p> }

				{ error && <p className='text--error'>{error}</p> }
				{children}
			</div>
		);
	}
}

TextInput.propTypes = {
	name: React.PropTypes.string.isRequired,
	error: React.PropTypes.string,
	label: React.PropTypes.string,
	labelClassName: React.PropTypes.string,
	required: React.PropTypes.bool
};

export default TextInput;
