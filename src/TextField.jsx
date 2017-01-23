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

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	render() {
		const {
			elId,
			name,
			label,
			placeholder,
			formAttrs,
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			className
		);

		return (
			<div>
				<label htmlFor={elId}>{label}</label>
				<input
					type='text'
					id={elId}
					name={name}
					placeholder={placeholder}
					value={this.state.value}
					onChange={this.handleChange}
					{...formAttrs}
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
