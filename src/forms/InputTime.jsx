// @flow
import * as React from 'react';
import cx from 'classnames';

import withErrorList from '../utils/components/withErrorList';
import FieldsetTime from './FieldsetTime';

type Props = React.ElementConfig<HTMLInputElement> & {
	name: string,
	onChange: (SyntheticEvent<*>) => void,
	error?: string | boolean,
	disabled?: boolean,
	forceTextInput?: boolean,
	helperText?: React.Node,
	is24Hr?: boolean,
	label?: React.Node,
	labelClassName?: string,
	required?: boolean | string, // supply string for custom error text
};
type State = { forceTextInput: boolean }; // determined at runtime

/*
 * All-purpose replacement for `<input type="time">` field, even for browsers
 * that don't support it
 */
export class InputTimeComponent extends React.PureComponent<Props, State> {
	state: State = { forceTextInput: false };
	defaultProps: { is24Hr: true };
	inputEl = null;

	// determine runtime support for <input type='time'>
	componentDidMount() {
		this.setState(() => ({
			forceTextInput:
				this.props.forceTextInput || (this.inputEl || {}).type !== 'time',
		}));
	}

	render() {
		const {
			id,
			label,
			labelClassName,
			name,
			className,
			error,
			disabled,
			is24Hr,
			helperText,
			required,
			...other
		} = this.props;

		const classNames = {
			field: cx(
				'input--time select--reset',
				{ 'field--error': Boolean(error) },
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
		};
		const requiredText = typeof required === 'string' ? required : '*';

		const displayId = id || name;
		const errorId = `${displayId}-error`;

		if (error) {
			other['aria-invalid'] = true;
			other['aria-describedby'] = errorId;
		}

		return (
			<div>
				{label && (
					<label
						htmlFor={displayId}
						className={classNames.label}
						data-requiredtext={requiredText}
					>
						{label}
					</label>
				)}
				{helperText && <div className={classNames.helperText}>{helperText}</div>}
				{this.state.forceTextInput ? (
					<FieldsetTime
						{...other}
						disabled={disabled}
						error={error}
						onChange={this.props.onChange}
						is24Hr={is24Hr}
					/>
				) : (
					<input
						{...other}
						id={displayId}
						type="time"
						name={name}
						className={classNames.field}
						required={Boolean(required)}
						disabled={disabled}
						ref={(input: HTMLElement | null) => (this.inputEl = input)}
					/>
				)}
			</div>
		);
	}
}

const InputTimeWithErrors = withErrorList(InputTimeComponent);
InputTimeWithErrors.displayName = 'InputTime';
export default InputTimeWithErrors;
