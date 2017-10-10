import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { MEDIA_SIZES } from '../utils/designConstants';

export const FIELD_WITH_ICON_CLASS = 'field--withIcon';
export const DEFAULT_ICON_SIZE = 'xs';

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
		...other
	} = props;

	const classNames = cx(
		'span--100',
		{
			'field--error': error,
			[FIELD_WITH_ICON_CLASS]: iconShape
		},
		className
	);

	const labelClassNames = cx(
		'label--field',
		{ required, disabled },
		labelClassName
	);

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
		<div className="inputContainer">
			{label &&
				<label className={labelClassNames} htmlFor={id}>
					{label}
				</label>
			}

			<input type={isSearch ? 'search' : 'text'}
				name={name}
				value={value}
				required={required}
				placeholder={placeholder}
				className={classNames}
				onChange={onChange}
				maxLength={maxLength}
				pattern={pattern}
				disabled={disabled}
				id={id}
				style={inputStyles}
				{...other}
			/>

			{ maxLength && <p className='text--tiny text--secondary align--right charCount'>{parseInt(maxLength - value.length)}</p> }

			{ error && <p className='text--error text--small'>{error}</p> }
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
	iconSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl'])
};

export default TextInput;
