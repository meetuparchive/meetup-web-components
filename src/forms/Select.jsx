// @flow
import * as React from 'react';
import cx from 'classnames';

import Icon from '../media/Icon';
import withErrorList from '../utils/components/withErrorList';

type Props = React.ElementConfig<HTMLSelectElement> & {
	/** Additional class name/s to add to the `<select/>` element  */
	className?: string,

	/** The `name` attribute for the input, and associates it with the `<label />` */
	name: string, // required - will be used as 'id' as well

	/** Required - this component is stateless. A callback that happens when the input changes */
	onChange: (e: SyntheticInputEvent<*>) => void,

	/** Supplied by withErrorList */
	error?: React.Node,

	/** An additional piece of helpful info rendered with the field */
	helperText?: string,

	/** The class name/s to add to the `<label />` element */
	labelClassName?: string,

	/** The class name/s to add to the div element wrapping select input + icon */
	selectClassName?: string,

	/** What we render into the input's `<label />` */
	label?: string,

	/** What to render in order to indicate the field is required. Supply a string for a custom error message */
	required?: boolean | string,
};

/*
 * MWC custom <select> component
 */
export const SelectInput = (props: Props) => {
	const {
		className,
		id,
		labelClassName,
		label,
		name,
		error,
		helperText,
		required,
		selectClassName,
		...other
	} = props;

	const classNames = {
		label: cx(
			'label--field',
			{ 'label--required': required, 'flush--bottom': helperText },
			labelClassName
		),
		field: cx(
			'select--reset span--100 padding--selectArrow',
			{ 'field--error': error },
			className
		),
		helperText: cx('helperTextContainer', { required }),
	};
	const requiredText = typeof required === 'string' ? required : '*';

	return (
		<div className="inputContainer">
			{label && (
				<label
					className={classNames.label}
					htmlFor={name}
					data-requiredtext={requiredText}
				>
					{label}
				</label>
			)}
			{helperText && <div className={classNames.helperText}>{helperText}</div>}
			<div className={cx('selectWrapper', selectClassName)}>
				<select
					name={name}
					id={id || name}
					required={Boolean(required)}
					className={classNames.field}
					{...other}
				/>
				<Icon className="select-customArrow" shape="chevron-down" size="xs" />
			</div>
		</div>
	);
};

const SelectWithErrors = withErrorList(SelectInput);
SelectWithErrors.displayName = 'Select';

export default SelectWithErrors;
