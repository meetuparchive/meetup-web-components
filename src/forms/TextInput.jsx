import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Icon from '../media/Icon';
import { MEDIA_SIZES } from '../utils/designConstants';
import CharCounter from './CharCounter';
import withErrorList from '../utils/components/withErrorList';

export const FIELD_WITH_ICON_CLASS = 'field--withIcon';

/**
 * @module TextInput
 */
export const TextInput = (props) => {

	const {
		name,
		value,
		label,
		labelClassName,
		className,
		children,
		error,
		placeholder,
		id,
		onChange,
		isSearch,
		maxLength,
		pattern,
		disabled,
		iconShape,
		helperText,
		required,
		requiredText,
		isValid,
		validityMessage,
		...other
	} = props;

	const classNames = {
		field: cx(
			'span--100',
			{
				'field--error': error,
				[FIELD_WITH_ICON_CLASS]: iconShape
			},
			className
		),
		label: cx(
			'label--field',
			{
				'label--disabled': disabled,
				'label--required': required,
				'flush--bottom': helperText
			},
			labelClassName
		),
		helperText: cx(
			'helperTextContainer',
			{ required, disabled }
		),
		icon: 'icon--field',
	};

	const iconProps = {
		shape: iconShape,
		size: props.iconSize || 'xs',
		className: classNames.icon,
	};

	const paddingSize = parseInt(MEDIA_SIZES[iconProps.size], 10) + 24; // #TODO :SDS: replace '32' with something like "$space * 1.5" from `swarm-constants`
	const inputStyles = iconShape && {
		paddingLeft: `${paddingSize}px`
	};
	const customValidityMessage = isValid ? '' : validityMessage;

	let textInput;

	const handleOnChange = (e) => {
		if (onChange) {
			onChange(e);
		}

		textInput && textInput.setCustomValidity(customValidityMessage);
	};

	// WC-158
	// Only add a `value` prop if it is defined.
	// Workaround for IE11 support (see ticket)
	if (value || typeof value === 'string') {
		other.value = value;
	}

	// Character limits should be a "soft" limit.
	// Avoid passing maxLength as an HTML attribute
	if (maxLength) delete other.maxLength;

	return (
		<div className="inputContainer">
			{label &&
				<label className={classNames.label} htmlFor={id} data-requiredtext={required && requiredText}>
					{label}
				</label>
			}
			{helperText &&
				<div className={classNames.helperText}>
					{helperText}
				</div>
			}
			<div style={{position: 'relative'}}>
				<input type={isSearch ? 'search' : 'text'}
					name={name}
					required={required}
					placeholder={placeholder}
					className={classNames.field}
					onChange={handleOnChange}
					pattern={pattern}
					disabled={disabled}
					id={id}
					style={inputStyles}
					ref={(input) => { textInput = input; }}
					{...other}
				/>
				{iconShape &&
					<Icon {...iconProps} />
				}
			</div>
			{maxLength &&
				<CharCounter
					maxLength={parseInt(maxLength, 10)}
					valueLength={parseInt(value.length, 10)}
				/>
			}
			{children}
		</div>
	);
};

TextInput.propTypes = {
	name: PropTypes.string.isRequired,
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	id: PropTypes.string,
	maxLength: PropTypes.number,
	pattern: PropTypes.string,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	labelClassName: PropTypes.string,
	placeholder: PropTypes.string,
	isSearch: PropTypes.bool,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	iconShape: PropTypes.string,
	iconSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
	helperText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	required: PropTypes.bool,
	requiredText: (props) => (
		props.required && !props.requiredText &&
			new Error('Inputs with `required` prop must provide also provide a translated string for "required" in the `requiredText` prop')
	)

};

export default withErrorList(TextInput);
