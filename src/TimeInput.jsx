import React from 'react';
import cx from 'classnames';

/**
* @module TimeInput
*/
class TimeInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value || ''
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ value: e.target.value });
		this.props.callback && this.props.callback(e.target.value);
	}

	render() {
		const {
			callback,	// eslint-disable-line no-unused-vars
			id,
			label,
			name,
			className,
			error,
			required,
			value,		// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'input--time',
			className
		);

		const labelClassNames = cx({ required });

		return (
			<div>
				{ label && <label htmlFor={id} className={labelClassNames}>{label}</label> }
				<input
					id={id}
					type='time'
					name={name}
					value={this.state.value}
					className={classNames}
					onChange={this.onChange}
					required={required}
					{...other} />
				{ error && <p className='text--error'>{error}</p> }
			</div>
		);

	}
}

TimeInput.propTypes = {
	callback: React.PropTypes.func,
	name: React.PropTypes.string.isRequired,
	error: React.PropTypes.string,
	label: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	required: React.PropTypes.bool
};

export default TimeInput;

