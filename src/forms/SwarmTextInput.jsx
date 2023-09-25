// @flow
// $FlowFixMe
import React, { useState, useCallback } from 'react';
import Icon from '@meetup/swarm-components/lib/Icon';
import cn from 'classnames';

export const getFormFieldState = (props: {
	disabled?: boolean,
	error?: boolean,
}): string => {
	let state = 'default';

	if (props.disabled) {
		state = 'disabled';
	} else if (props.error) {
		state = 'error';
	}

	return state;
};

export const getRemainingCharacters = (
	maxLength: number,
	charLength: number = 0
): number => maxLength - charLength;

const CharCount = (props: { maxLength: number, charLength?: number }) => {
	const { maxLength, charLength = 0, ...other } = props;

	return (
		<p data-swarm-textarea-char-count className="text--tiny" {...other}>
			{getRemainingCharacters(maxLength, charLength)}
		</p>
	);
};

const hasMaxLengthError = (maxLength: number = 0, charLength: number): boolean =>
	!!maxLength && charLength > maxLength;

type TextInputProps = {
	/**
	 * Input type
	 */
	type?: string,
	/**
	 * Whether the input should be interactive.
	 */
	disabled?: boolean,
	/**
	 * Whether the field has an error.
	 */
	error?: boolean,
	/**
	 * An identifier for the input.
	 */
	id: string,
	/**
	 * Whether the input is a search field.
	 */
	isSearch?: boolean,
	/**
	 * Name for the input.
	 */
	name: string,
	/**
	 * A regular expression that the input's value is checked against on form submission.
	 */
	pattern?: string,
	/**
	 * Value of input.
	 */
	value?: string,
	/**
	 * Name of icon to render in the input
	 */
	iconShape?: string,
	/**
	 * Optional size for icon if `iconShape` is provided.
	 * Default size is `xs`
	 */
	iconSize?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl',
	/**
	 * max length of input field
	 */
	maxLength?: number,
	/**
	 * currency label for price field
	 */
	currencyLabel?: string,
	className?: string,
	defaultValue?: string,
};

/**
 * @module TextInput
 */
const SwarmTextInput = (props: TextInputProps) => {
	const {
		type,
		name,
		error,
		isSearch,
		pattern,
		disabled,
		id,
		iconShape,
		value = '',
		maxLength,
		currencyLabel,
		className,
		...other
	} = props;
	const wrapperState = iconShape ? 'icon' : 'default';
	const charLength = value.length;
	const inputState = getFormFieldState({
		...props,
		error: error || hasMaxLengthError(maxLength, charLength),
	});

	const [showPassword, setShowPassword] = useState(false);
	const togglePassword = useCallback(
		() => {
			setShowPassword(!showPassword);
		},
		[showPassword]
	);

	if (type === 'password') {
		return (
			<div data-swarm-text-input-wrapper={wrapperState}>
				<input
					data-swarm-text-input={inputState}
					type={showPassword ? 'text' : 'password'}
					name={name}
					disabled={disabled}
					id={id}
					value={value}
					{...other}
				/>
				<span
					onClick={togglePassword}
					data-swarm-input-icon="xs"
					data-swarm-position-right
					data-swarm-focusable
				>
					<Icon
						shape={showPassword ? 'eye-visible' : 'eye-hidden'}
						aria-hidden
					/>
				</span>
				{maxLength && <CharCount maxLength={maxLength} charLength={charLength} />}
			</div>
		);
	}

	return (
		<div
			data-swarm-text-input-wrapper={wrapperState}
			className={cn({ ['text-input-container']: !!currencyLabel })}
		>
			<input
				data-swarm-text-input={inputState}
				type={isSearch ? 'search' : 'text'}
				name={name}
				pattern={pattern}
				disabled={disabled}
				id={id}
				className={cn(className, {
					'input-with-currency-label': !!currencyLabel,
				})}
				value={value}
				{...other}
			/>
			{iconShape && (
				<span data-swarm-input-icon={iconShape}>
					<Icon shape={iconShape} aria-hidden />
				</span>
			)}
			{maxLength && <CharCount maxLength={maxLength} charLength={charLength} />}
			{currencyLabel && <span className="currency-label">{currencyLabel}</span>}
		</div>
	);
};

export default SwarmTextInput;
