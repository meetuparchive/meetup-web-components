import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import Icon from '@meetup/swarm-components/lib/Icon';
import DeprecationWarning from '../utils/components/DeprecationWarning';

/**
 * @module Checkbox
 */
export class Checkbox extends React.PureComponent {
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

	componentDidCatch(error, info) {
		console.log(`${error}: \n ${info.componentStack}`);
	}

	onChange(e) {
		this.props.onChange && this.props.onChange(e);

		if (this.props.controlled) {
			this.setState({ checked: e.target.checked });
		}
	}

	handleKeyPress = e => {
		if (e.key === 'Enter') {
			this.props.onChange && this.props.onChange(e);

			if (this.props.controlled) {
				this.setState({ checked: !this.state.checked });
			}
		}
	};

	getChecked() {
		if (this.props.controlled) {
			return this.state.checked;
		}

		return this.props.checked;
	}

	render() {
		// use the "eslint-disable-line" because we don't want
		// the `checked` and `controlled` props passed in `other`
		const {
			checked, // eslint-disable-line no-unused-vars
			controlled, // eslint-disable-line no-unused-vars
			onChange, // eslint-disable-line no-unused-vars
			id,
			label,
			disabled,
			name,
			value = '',
			className: customStyle,
			...other
		} = this.props;

		const elId = id || `${name}-${value}`;
		const stateChecked = this.getChecked();

		return (
			<label
				className={cn('checkbox-container', customStyle)}
				htmlFor={elId}
				{...other}
			>
				<span
					data-swarm-checkbox-field={stateChecked ? 'checked' : undefined}
					className="checkbox"
					role="checkbox"
					aria-checked={stateChecked}
					aria-label="checkbox"
					tabIndex={0}
					onKeyPress={this.handleKeyPress}
				>
					{stateChecked && (
						<Icon shape="check" color={disabled ? '#707070' : '#ffffff'} />
					)}
				</span>
				<input
					type="checkbox"
					id={elId}
					checked={stateChecked}
					disabled={disabled}
					onChange={this.onChange}
					readOnly={!this.onChange || disabled}
					name={name}
					value={`${value}`}
				/>
				<span>{label}</span>
			</label>
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

export default DeprecationWarning(Checkbox);
