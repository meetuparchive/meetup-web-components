// @flow
import PropTypes from 'prop-types';
import React from 'react';

import { TextInput as SwarmTextInput, FieldLabel } from '@meetup/swarm-components';

import withErrorList from '../utils/components/withErrorList';
import DeprecationWarning from '../utils/components/DeprecationWarning';
import a11yPassThrough from '../utils/a11yPassThrough';

export const FIELD_WITH_ICON_CLASS = 'field--withIcon';

type Props = {
	children?: React$Node,
	disabled?: boolean,
	error?: string | React$Node,
	helperText?: string | React$Node,
	iconShape?: string,
	iconSize?: 'xs' | 's' | 'm' | 'l' | 'xl',
	id?: string,
	isSearch?: boolean,
	label?: string | React$Node,
	maxLength?: number,
	name: string,
	onChange: string => void,
	pattern?: string,
	placeholder?: string,
	refCallback: React$Node => void,
	required?: boolean,
	requiredText?: string | React$Node,
	validityMessage?: string,
	labelClassName?: string,
	value: string,
};

/**
 * @module TextInput
 */
export class TextInput extends React.Component<Props> {
	componentDidCatch(error: any, info: any) {
		console.log(`${error}: \n ${info.componentStack}`);
	}

	render() {
		const {
			disabled,
			error,
			helperText,
			id,
			isSearch,
			name,
			label,
			labelClassName,
			onChange,
			pattern,
			placeholder,
			refCallback,
			required,
			requiredText = '*',
			validityMessage,
			value,
			...other
		} = this.props;

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
			<div>
				{label && (
					<FieldLabel
						htmlFor={id || name}
						className={a11yPassThrough(labelClassName)}
					>
						{label}
						{required && <span> {requiredText}</span>}
					</FieldLabel>
				)}

				{helperText && <p data-swarm-select-helper-text="1">{helperText}</p>}

				<div data-swarm-select-wrapper="1">
					<SwarmTextInput
						isSearch={isSearch}
						name={name}
						error={error}
						required={required}
						placeholder={placeholder}
						onChange={handleOnChange}
						onInvalid={handleInvalid}
						pattern={pattern}
						disabled={disabled}
						id={id}
						aria-label={label ? id || name : undefined}
						{...optionalInputProps}
						{...other}
					/>
				</div>
			</div>
		);
	}
}

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

export default withErrorList(DeprecationWarning(TextInput));
