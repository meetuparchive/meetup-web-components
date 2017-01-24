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
			error: props.error
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	render() {
		const {
			label,
			labelClassName,
			className,
			children,
			error,
			...other
		} = this.props;

		const classNames = cx(
			{ 'field--error': this.state.error },
			className
		);

		const labelClassNames = cx(
			{ required : other ? other.required : false },
			labelClassName
		);

		const errorElClassNames = cx(
			'text--error',
			{ 'display--none': !this.state.error }
		);

		return (
			<div>
				<label className={labelClassNames} htmlFor={other.id}>
					{label}
				</label>

				<input type='text'
					value={this.state.value}
					className={classNames}
					onChange={this.handleChange}
					{...other} />

				<p className={errorElClassNames}>{error}</p>
				{children}
			</div>
		);
	}
}

TextField.propTypes = {};

export default TextField;
