import React from 'react';
import cx from 'classnames';

/**
 * @module TextField
 */
class TextField extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			hasError: props.error,
			error: props.error
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	render() {
		const {
			inputId,
			name,
			label,
			labelClassName,
			placeholder,
			formAttrs,
			className,
			children,
			...other
		} = this.props;

		const classNames = cx(
			{ 'field--error': this.state.hasError },
			className
		);

		const labelClassNames = cx(
			{ required: formAttrs.required },
			labelClassName
		);

		const errorElClassNames = cx(
			'text--error',
			{ 'display--none': !this.state.hasError }
		);


		return (
			<div>
				<label className={labelClassNames} htmlFor={inputId}>{label}</label>
				<input
					type='text'
					id={inputId}
					name={name}
					placeholder={placeholder}
					value={this.state.value}
					onChange={this.handleChange}
					className={classNames}
					{...formAttrs}
					{...other} />
				<p className={errorElClassNames}>{this.state.error}</p>
					{children}
			</div>
		);
	}
}

TextField.propTypes = {
	name: React.PropTypes.string.isRequired,
};

export default TextField;
