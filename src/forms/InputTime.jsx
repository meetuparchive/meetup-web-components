// @flow
import * as React from 'react';
import cx from 'classnames';

import withErrorList from '../utils/components/withErrorList';
import FieldsetTime from './FieldsetTime';

type Props = React.ElementConfig<HTMLInputElement> & {
	/** onChange handler that receives a 'HH:mm' string value (not a change event) */
	onChange: string => void,
	/** Error content to render */
	error?: string | boolean,
	/** Force text fallback if native <input type="time" element should _not_ be used */
	forceTextInput?: boolean,
	/** An additional piece of helpful info rendered with the field */
	helperText?: React.Node,
	/** Whether to render time in 24hr time format (e.g.: 02:00 PM => 14:00) */
	is24Hr?: boolean,
	label?: React.Node,
	labelClassName?: string,
	required?: boolean | string, // supply string for custom error text
};
type State = { forceTextInput: ?boolean }; // determined at runtime

/*
 * All-purpose replacement for `<input type="time">` field, even for browsers
 * that don't support it
 */
export class InputTimeComponent extends React.PureComponent<Props, State> {
	state: State = { forceTextInput: this.props.forceTextInput };
	defaultProps: { is24Hr: true };
	inputEl = null;

	// determine runtime support for <input type='time'>
	componentDidMount() {
		if ((this.inputEl || {}).type !== 'time') {
			this.setState(() => ({ forceTextInput: true }));
		}
	}

	render() {
		const {
			id,
			forceTextInput, // eslint-disable-line no-unused-vars
			label,
			labelClassName,
			name,
			className,
			error,
			disabled,
			is24Hr,
			helperText,
			required,
			value,
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
						value={value}
						id={displayId}
						name={name}
						required={Boolean(required)}
						disabled={disabled}
						error={error}
						onChange={this.props.onChange}
						is24Hr={is24Hr}
					/>
				) : (
					<input
						{...other}
						value={value || ''}
						id={displayId}
						name={name}
						type="time"
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
