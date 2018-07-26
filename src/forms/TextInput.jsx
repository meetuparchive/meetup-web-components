// @flow
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Icon from '../media/Icon';
import { MEDIA_SIZES } from '../utils/designConstants';
import CharCounter from './CharCounter';
import withErrorList from '../utils/components/withErrorList';

export const FIELD_WITH_ICON_CLASS = 'field--withIcon';

type Props = {
	children?: React$Node,
	className?: string,
	disabled?: boolean,
	error?: string | React$Node,
	helperText?: string | React$Node,
	iconShape?: string,
	iconSize?: 'xs' | 's' | 'm' | 'l' | 'xl',
	id?: string,
	isSearch?: boolean,
	label?: string | React$Node,
	labelClassName?: string,
	maxLength?: number,
	name: string,
	onChange: string => void,
	pattern?: string,
	placeholder?: string,
	refCallback: React$Node => void,
	required?: boolean,
	requiredText?: string | React$Node,
	validityMessage?: string,
	value: string,
};

/**
 * @module TextInput
 */
export const TextInput = (props: Props): React$Element<*> => {
	const {
		className,
		children,
		disabled,
		error,
		helperText,
		iconShape,
		id,
		isSearch,
		maxLength,
		name,
		label,
		labelClassName,
		onChange,
		pattern,
		placeholder,
		refCallback,
		required,
		requiredText,
		validityMessage,
		value,
		...other
	} = props;

	const classNames = {
		field: cx(
			'span--100',
			{
				'field--error': error,
				[FIELD_WITH_ICON_CLASS]: iconShape,
			},
			className
		),
		label: cx(
			'label--field',
			{
				'label--disabled': disabled,
				'label--required': required,
				'flush--bottom': helperText,
			},
			labelClassName
		),
		helperText: cx('helperTextContainer', { required, disabled }),
		icon: 'icon--field',
	};

	const iconProps = {
		shape: iconShape,
		size: props.iconSize || 'xs',
		className: classNames.icon,
		'aria-hidden': true,
	};

	const paddingSize = parseInt(MEDIA_SIZES[iconProps.size], 10) + 24; // #TODO :SDS: replace '32' with something like "$space * 1.5" from `swarm-constants`
	const inputStyles = iconShape && {
		paddingLeft: `${paddingSize}px`,
	};

	const handleOnChange = e => {
		if (onChange) {
			onChange(e);
		}

		e.target.setCustomValidity('');
	};

	const handleInvalid = e => {
		if (!validityMessage) return;
		e.target.setCustomValidity(validityMessage);
	};

	const optionalInputProps = {};
	// WC-158
	// Only add a `value` prop if it is defined.
	// Workaround for IE11 support (see ticket)
	if (value !== undefined) {
		optionalInputProps.value = value;
	}

	// If a refCallback is provided in input props
	// add a ref to the <input> tag
	if (refCallback) {
		optionalInputProps.ref = refCallback;
	}

	return (
		<div className="inputContainer">
			{label && (
				<label
					className={classNames.label}
					htmlFor={id}
					data-requiredtext={required && requiredText}
				>
					{label}
				</label>
			)}
			{helperText && <div className={classNames.helperText}>{helperText}</div>}
			<div style={{ position: 'relative' }}>
				<input
					type={isSearch ? 'search' : 'text'}
					name={name}
					required={required}
					placeholder={placeholder}
					className={classNames.field}
					onChange={handleOnChange}
					onInvalid={handleInvalid}
					pattern={pattern}
					disabled={disabled}
					id={id}
					style={inputStyles}
					{...optionalInputProps}
					{...other}
				/>
				{iconShape && <Icon {...iconProps} />}
			</div>
			{maxLength && (
				<CharCounter
					maxLength={parseInt(maxLength, 10)}
					valueLength={parseInt(value.length, 10)}
				/>
			)}
			{children}
		</div>
	);
};

TextInput.defaultProps = {
	requiredText: '*',
};

TextInput.propTypes = {
	/** The `name` attribute for the input */
	name: PropTypes.string.isRequired,

	/** Error content to render */
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	/** Adds an `id` attribute to the input, and associates it with the `<label />` */
	id: PropTypes.string,

	/** Maximum number of characters for the input value */
	maxLength: PropTypes.number,

	/** Regex pattern that the input value must match */
	pattern: PropTypes.string,

	/** What we render into the input's `<label />` */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	/** The class name/s to add to the `<label />` element */
	labelClassName: PropTypes.string,

	/** The hint text to display inside the input using the input's `placeholder` attribute */
	placeholder: PropTypes.string,

	/** Whether the input type is 'search' */
	isSearch: PropTypes.bool,

	/** Callback that happens when the input changes */
	onChange: PropTypes.func,

	/** Whether to use disabled attribute and disabled field styles */
	disabled: PropTypes.bool,

	/** Name of the shape of the icon to render inside the input */
	iconShape: PropTypes.string,

	/** The key for the size to render an icon inside the input */
	iconSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),

	/** An additional piece of helpful info rendered with the field */
	helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	/** Whether the field is required to have a value */
	required: PropTypes.bool,

	/** What to render in order to indicate the field is required */
	requiredText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default withErrorList(TextInput);
