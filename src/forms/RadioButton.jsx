import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export class RadioButton extends React.PureComponent {
	componentDidCatch(error, info) {
		console.log(`${error}: \n ${info.componentStack}`);
	}

	render() {
		const {
			checked,
			label,
			id,
			disabled,
			value,
			children,
			name,
			...other
		} = this.props;

		return (
			<label className="radio-container">
				<span
					className={cx('radio', { checked, disabled })}
					tabIndex={0}
					role="checkbox"
					aria-checked={checked}
				>
					{checked && <span className="radio-indicator" />}
				</span>
				<input
					type="radio"
					id={id}
					name={name}
					checked={checked}
					disabled={disabled}
					value={value}
					{...other}
				/>
				<span>{label || children}</span>
			</label>
		);
	}
}

RadioButton.displayName = 'RadioButton';

RadioButton.propTypes = {
	/** What we render into the input's `<label />` */
	label: PropTypes.string.isRequired,

	/** Additional class name/s to add to the wrapper element  */
	className: PropTypes.string,
	/**
	 * Used to associate a group of radio buttons.
	 * Only one radio button in a group can be selected.
	 */
	name: PropTypes.string,
	/**
	 * Value of the input.
	 */
	value: PropTypes.string,
};

export default RadioButton;
