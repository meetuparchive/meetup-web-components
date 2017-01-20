import React from 'react';
import cx from 'classnames';

/**
 * @module TextField
 */
class TextField extends React.Component {

	constructor(props) {
		super(props);
		this.state = { value: props.value };
		this.handleChange = this.handleChange.bind(this);
	}

	// question es6 in react??
	handleChange(e) {
		console.log('changed', e.target.value);
		this.setState({ value: e.target.value });
	}

	getValue() {
		return this.state.value;
	}

	render() {
		const {
			elId,
			name,
			label,
			placeholder,
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'textField',
			className
		);

		console.log('render', this.state.value);

		return (
			<div>
				<label htmlFor={elId}>{label}</label>
				<input
					type='text'
					id={elId}
					name={name}
					placeholder={placeholder}
					value={this.getValue}
					onChange={this.handleChange}
					className={classNames}
					{...other} />
					{children}
			</div>
		);
	}
}

TextField.propTypes = {
	name: React.PropTypes.string.isRequired,
};

export default TextField;
