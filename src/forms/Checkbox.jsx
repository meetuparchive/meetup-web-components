import PropTypes from 'prop-types';
import React from 'react';
import { default as SwarmCheckbox } from '@meetup/swarm-components/lib/Checkbox';

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

	componentWillReceiveProps(nextProps) {
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
		const {
			checked,
			children,
			id,
			label,
			disabled,
			name, // TODO: should v2 Checkbox support 'name'?
			value, // TODO: Should v2 Checkbox support 'value'?
			// iconShape, // TODO: should v2 Checkbox support 'iconShape'?
			...other
		} = this.props;

		const elId = id || `${name}-${value}`;
		const stateChecked = this.getChecked();

		return children ? (
			<SwarmCheckbox
				checked={stateChecked}
				label={label}
				id={elId}
				disabled={disabled}
				onChange={this.onChange}
				{...other}
			>
				{children}
			</SwarmCheckbox>
		) : (
			<SwarmCheckbox
				checked={checked}
				label={label}
				id={elId}
				disabled={disabled}
				onChange={this.onChange}
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
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // checkboxes don't need values

	/** Callback that happens when the input changes */
	onChange: PropTypes.func,

	/** Optional icon for checked state, defaults to 'check'  */
	iconShape: PropTypes.string,
};

Checkbox.defaultProps = {
	controlled: true,
};

export default Checkbox;
