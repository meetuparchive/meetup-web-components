import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

const FormSelect = props => {
	const {
		id,
		name,
		label,
		labelClassName,
		className,
		options,
		disabled,
		selectedOption,
		onChange,
		required,
		error,
		...other
	} = props;

	const classNames = cx(
		{ 'field--error': error },
		className
	);

	const labelClassNames = cx(
		'label--field',
		{ required, disabled },
		labelClassName
	);
	const renderedOptions = options && options.length ? options.map((option, index) => {
		const attrs = {
			key: index,
			selected: option === selectedOption,
			value: option
		};
		return (<option {...attrs}>{option}</option>);
	}) : null;

	return (
		<div>
			{label &&
				<label className={labelClassNames} htmlFor={id}>
					{label}
				</label>
			}
			<select
				name={name}
				required={required}
				className={classNames}
				onChange={onChange}
				disabled={disabled}
				id={id}
				{...other}
			>
				{renderedOptions}
			</select>
			{ error && <p className='text--error'>{error}</p> }
		</div>
	);
};

FormSelect.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	labelClassName: PropTypes.string,
	className: PropTypes.string,
	options: PropTypes.arrayOf(String).isRequired,
	disabled: PropTypes.bool,
	selectedOption: PropTypes.string,
};

export default FormSelect;
