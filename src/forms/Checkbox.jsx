import PropTypes from 'prop-types';
import React from 'react';
import { Checkbox as SwarmCheckbox } from '@meetup/swarm-components';

/**
 * @module Checkbox
 */
class Checkbox extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			checked: props.checked || false,
		};

		this.onChange = this.onChange.bind(this);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { checked, controlled } = nextProps;

		if (this.props.controlled !== controlled && controlled) {
			this.setState({ checked });
		}
	}

	onChange(e) {
		this.props.onChange && this.props.onChange(e);

		if (this.props.controlled) {
			this.setState({ checked: e.target.checked });
		}
	}

	getChecked() {
		if (this.props.controlled) {
			return this.state.checked;
		}

		return this.props.checked;
	}

	render() {
		// use the "eslint-disable-line" because we don't want
		// the `checked` and `controlled` props passed in `other`
		// to the `SwarmCheckbox` component
		const {
			checked, // eslint-disable-line no-unused-vars
			controlled, // eslint-disable-line no-unused-vars
			onChange, // eslint-disable-line no-unused-vars
			id,
			label,
			disabled,
			name,
			value = '',
			...other
		} = this.props;

		const elId = id || `${name}-${value}`;
		const stateChecked = this.getChecked();

		return (
			<SwarmCheckbox
				checked={stateChecked}
				label={label}
				id={elId}
				disabled={disabled}
				onChange={this.onChange}
				name={name}
				value={value}
				{...other}
			/>
		);
	}
}

Checkbox.propTypes = {
	checked: PropTypes.bool,
	disabled: PropTypes.bool,

	/** Whether the input's `checked` prop is handled outside the component or by using component's internal state */
	controlled: PropTypes.bool,

	/** Adds an `id` attribute to the input, and associates it with the `<label />` */
	id: PropTypes.string,

	/** What we render into the input's `<label />` */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	/** The `name` attribute for the input */
	name: PropTypes.string.isRequired,

	/** The `value` attribute for the input */
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

	/** Callback that happens when the input changes */
	onChange: PropTypes.func,
};

Checkbox.defaultProps = {
	controlled: true,
};

export default Checkbox;
