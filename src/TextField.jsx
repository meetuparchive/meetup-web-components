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
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		console.log('change', e.target.value);
		this.setState({ value: e.target.value });
	}

	render() {
		const {
			name,
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
			{ required : other && other.required },
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
					className={classNames}
					onChange={this.onChange}
					{...other} />

				{ this.state.error && <p className='text--error'>{error}</p> }
				{children}
			</div>
		);
	}
}

TextField.propTypes = {
	name: React.PropTypes.string.isRequired
};

export default TextField;
