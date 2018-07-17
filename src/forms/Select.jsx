// @flow
import * as React from 'react';
import cx from 'classnames';

import Icon from '../media/Icon';
import withErrorList from '../utils/components/withErrorList';

type Props = React.ElementConfig<HTMLSelectElement> & {
	className?: string,
	name: string, // required - will be used as 'id' as well
	onChange: (e: SyntheticInputEvent<*>) => void, // required - this component is stateless
	error?: React.Node, // supplied by withErrorList
	helperText?: string,
	labelClassName?: string,
	label?: string,
	required?: boolean | string, // supply a string for a custom error message
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
			<select
				name={name}
				id={id || name}
				required={required}
				className={classNames.field}
				{...other}
			/>
			<Icon className="select-customArrow" shape="chevron-down" size="xs" />
		</div>
	);
};

const SelectWithErrors = withErrorList(SelectInput);
SelectWithErrors.displayName = 'Select';

export default SelectWithErrors;
