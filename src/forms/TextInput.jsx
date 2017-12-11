import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Icon from '../media/Icon';
import { MEDIA_SIZES } from '../utils/designConstants';
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

	return (
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
			<div style={{position: 'relative'}}>
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
				{iconShape &&
					<Icon {...iconProps} />
				}

			</div>
			{ maxLength && <p tabIndex="-1" className='text--tiny text--secondary align--right charCount'>{parseInt(maxLength - value.length)}</p> }
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

export default withErrorList(TextInput);
