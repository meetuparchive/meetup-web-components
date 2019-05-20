import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';

const RadioButton = ({ label, className, ...inputProps }) => {
	const id = `RadioButton-${inputProps.name}-${inputProps.value}`;

	const classNames = {
		labelClassNames: cx(
			'toggleLabel label--minor display--block',
			inputProps.labelClassName
		),
		fauxCheckboxClassNames: cx(
			'display--flex flex--alignCenter flex--center align--center fauxToggle fauxToggle--radio',
			{
				checked: inputProps.checked,
				disabled: inputProps.disabled,
			}
		),
	};

	return (
		<label className={classNames.labelClassNames} htmlFor={id}>
			<Flex align="center" className={className} noGutters>
				<FlexItem shrink>
					<input
						readOnly
						type="radio"
						className="radio visibility--a11yHide"
						id={id}
						{...inputProps}
					/>
					<span className={classNames.fauxCheckboxClassNames}>
						{inputProps.checked && <span className="radio-indicator" />}
					</span>
				</FlexItem>
				<FlexItem className="toggleLabel-container" shrink>
					<span
						className={cx({
							'text--hint': inputProps.disabled,
							'text--bold': inputProps.checked,
						})}
					>
						{label}
					</span>
				</FlexItem>
			</Flex>
		</label>
	);
};

RadioButton.displayName = 'RadioButton';

RadioButton.propTypes = {
	/** What we render into the input's `<label />` */
	label: PropTypes.string.isRequired,

	/** Additional class name/s to add to the wrapper element  */
	className: PropTypes.string,
};

export default RadioButton;
