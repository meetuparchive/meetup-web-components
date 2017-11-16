import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { MEDIA_SIZES } from '../utils/designConstants';

export const FIELD_WITH_ICON_CLASS = 'field--withIcon';

/**
 * @module TextInput
 */
const TextInput = (props) => {

	const {
		name,
		value,
		label,
		labelClassName,
		className,
		children,
		error,
		placeholder,
		required,
		id,
		onChange,
		isSearch,
		maxLength,
		pattern,
		disabled,
		iconShape,
		helperText,
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
				required,
				disabled,
				'flush--bottom': helperText
			},
			labelClassName
		),
		helperText: cx(
			'helperTextContainer',
			{ required, disabled }
		)
	};

	const iconSize = props.iconSize || 'xs';
	const iconSuffix = (iconSize == 'xs' || iconSize == 's') ? '--small' : '';
	const inputIcon = iconShape && require(`base64-image-loader!swarm-icons/dist/optimized/${iconShape}${iconSuffix}.svg`);

	const paddingSize = parseInt(MEDIA_SIZES[iconSize], 10)+24; // #TODO :SDS: replace '32' with something like "$space * 1.5" from `swarm-constants`
	const inputStyles = iconShape &&
	{
		backgroundImage: `url(${inputIcon})`,
		backgroundSize: `${MEDIA_SIZES[iconSize]}px`,
		paddingLeft: `${paddingSize}px`
	};

	return (
		<div>
			<div className="inputContainer">
				{label &&
					<label className={classNames.label} htmlFor={id}>
						{label}
					</label>
				}
				{helperText &&
					<div className={classNames.helperText}>
						{helperText}
					</div>
				}
				<input type={isSearch ? 'search' : 'text'}
					name={name}
					value={value}
					required={required}
					placeholder={placeholder}
					className={classNames.field}
					onChange={onChange}
					pattern={pattern}
					disabled={disabled}
					id={id}
					style={inputStyles}
					{...other}
				/>

				{ maxLength && <p className='text--tiny text--secondary align--right charCount'>{parseInt(maxLength - value.length)}</p> }
				{children}
			</div>
			{ error && <p className='text--error text--small'>{error}</p> }
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
	required: PropTypes.bool,
	isSearch: PropTypes.bool,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	iconShape: PropTypes.string,
	iconSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
	helperText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	])
};

export default TextInput;
