import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';

export const FAUX_TOGGLE_CLASS = 'fauxToggle';
export const FOCUSED_CHECKBOX_CLASS = 'focused';
export const DISABLED_CHECKBOX_CLASS = 'disabled';

/**
 * @module Checkbox
 */
class Checkbox extends React.PureComponent {
	constructor(props) {
		super(props);
		const state = {
			focused: false,
			checked: props.checked || false,
		};

		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.state = state;
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

	onBlur(e) {
		this.setState({ focused: false });
	}

	onFocus(e) {
		this.setState({ focused: true });
	}

	getChecked() {
		if (this.props.controlled) return this.state.checked;
		return this.props.checked;
	}

	render() {
		const {
			checked, // eslint-disable-line no-unused-vars
			children,
			className,
			labelClassName,
			id,
			label,
			name,
			value,
			disabled,
			onBlur, // eslint-disable-line no-unused-vars
			onFocus, // eslint-disable-line no-unused-vars
			onChange, // eslint-disable-line no-unused-vars
			controlled, // eslint-disable-line no-unused-vars
			...other
		} = this.props;
		const stateChecked = this.getChecked();

		const classNames = cx('minTouchHeight', className);

		const labelClassNames = cx(
			'toggleLabel label--minor display--block',
			labelClassName
		);

		const fauxCheckboxClassNames = cx(
			'display--block align--center',
			FAUX_TOGGLE_CLASS,
			`${FAUX_TOGGLE_CLASS}--checkbox`,
			{
				checked: stateChecked,
				disabled,
				[FOCUSED_CHECKBOX_CLASS]: this.state.focused,
			}
		);

		const elId = id || `${name}-${value}`;

		return (
			<label className={labelClassNames} htmlFor={elId}>
				<Flex align="center" className={classNames} {...other}>
					<FlexItem shrink>
						<input
							type="checkbox"
							name={name}
							value={value}
							checked={stateChecked}
							disabled={disabled}
							className="checkbox visibility--a11yHide"
							id={elId}
							onBlur={this.onBlur}
							onFocus={this.onFocus}
							onChange={this.onChange}
						/>
						<span
							ref={el => (this.fauxCheckboxEl = el)}
							className={fauxCheckboxClassNames}
						>
							{stateChecked && (
								<Icon
									className="display--flex flex--center checkbox-indicator"
									shape="check"
									size="xs"
								/>
							)}
						</span>
					</FlexItem>
					<FlexItem className="toggleLabel-container">
						<span
							className={cx({
								['text--hint']: disabled,
								['text--bold']: stateChecked,
							})}
						>
							{label}
						</span>
						{children}
					</FlexItem>
				</Flex>
			</label>
		);
	}
}

Checkbox.propTypes = {
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	controlled: PropTypes.bool,
	id: PropTypes.string,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	labelClassName: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // checkboxes don't need values
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
};

Checkbox.defaultProps = {
	controlled: true,
};

export default Checkbox;
