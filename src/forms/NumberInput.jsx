// @flow
import React from 'react';
import cx from 'classnames';
import Button from '../forms/Button';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';
import withErrorList from '../utils/components/withErrorList';

export const DECREMENT_BTN_CLASS = 'decrementButton';
export const FAUX_INPUT_CLASS = 'fauxInput';
export const FOCUSED_INPUT_CLASS = 'focused';
export const INCREMENT_BTN_CLASS = 'incrementButton';

type InputChange = {| target: { value: number, name: string } |};
type Props = {
	className?: string,
	children?: React$Node,
	disabled?: boolean,
	error?: React$Node,
	helperText?: string | React$Node,
	id: string,
	label?: React$Node,
	labelClassName?: string,
	max?: number,
	min: number,
	name: string,
	onChange: InputChange => void,
	required?: boolean,
	requiredText?: string | React$Node,
	step: number,
	value: number,
};

type State = {
	isFieldFocused: boolean,
	value: number,
};

/**
 * @module NumberInput
 */
export class NumberInput extends React.PureComponent<Props, State> {
	fauxInputEl: HTMLInputElement | null;
	decrementBtnEl: HTMLButtonElement | null;
	incrementBtnEl: HTMLButtonElement | null;

	static defaultProps = {
		requiredText: '*',
		step: 1,
		min: 0,
	};
	state = {
		value: this.props.value,
		isFieldFocused: false,
	};

	static getDerivedStateFromProps(nextProps: Props, prevState: State) {
		const isNewValue = nextProps.onChange && nextProps.value !== prevState.value;

		return {
			value: isNewValue ? nextProps.value : prevState.value,
		};
	}

	_updateValueByStep: boolean => number;
	_updateValueByStep = (isIncreasing: boolean) => {
		const currentVal = this.state.value;
		const step = this.props.step;

		const newValue = isIncreasing ? currentVal + step : currentVal - step;
		const minConstrained = Math.max(newValue, this.props.min);
		return Math.min(minConstrained, this.props.max || Infinity);
	};

	onBlur: (SyntheticInputEvent<*>) => void;
	onBlur = (e: SyntheticInputEvent<*>) => {
		const formControls = [this.fauxInputEl, this.decrementBtnEl, this.incrementBtnEl];
		if (formControls.every(c => c !== document.activeElement)) {
			this.setState(() => ({ isFieldFocused: false }));
		}
	};

	onChange: (HTMLInputElement | InputChange) => void;
	onChange = (e: HTMLInputElement | InputChange) => {
		const { onChange } = this.props;
		const { value, name } = e.target;

		this.setState(() => ({
			value: parseInt(value),
		}));

		if (onChange) {
			onChange({ target: { value, name } });
		}
	};

	onFocus: (SyntheticFocusEvent<*>) => void;
	onFocus = (e: SyntheticFocusEvent<*>) => {
		this.setState(() => ({ isFieldFocused: true }));
	};

	onKeyDown: (SyntheticKeyboardEvent<*>) => void;
	onKeyDown = (e: SyntheticKeyboardEvent<*>) => {
		// Disable the 'e' or 'E' values because we don't
		// support scientific notation at the moment
		if (e.key.toLowerCase() === 'e') {
			e.preventDefault();
		}
	};

	incrementAction: (SyntheticInputEvent<*>) => void;
	incrementAction = (e: SyntheticInputEvent<*>) => {
		e.preventDefault();
		this.onChange({
			target: { value: this._updateValueByStep(true), name: this.props.name },
		});
	};

	decrementAction: (SyntheticInputEvent<*>) => void;
	decrementAction = (e: SyntheticInputEvent<*>) => {
		e.preventDefault();
		this.onChange({
			target: { value: this._updateValueByStep(false), name: this.props.name },
		});
	};

	render() {
		const {
			children,
			className,
			disabled,
			error,
			helperText,
			id,
			label,
			labelClassName,
			max,
			min,
			name,
			onChange, // eslint-disable-line no-unused-vars
			required,
			requiredText,
			step,
			value, // eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = {
			field: cx('field--reset span--100', { 'field--error': error }, className),
			fauxInput: cx(FAUX_INPUT_CLASS, {
				disabled,
				error,
				[FOCUSED_INPUT_CLASS]: this.state.isFieldFocused,
			}),
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
			incrementBtn: cx('button--reset', INCREMENT_BTN_CLASS),
			decrementBtn: cx('button--reset', DECREMENT_BTN_CLASS),
		};

		return (
			<div>
				{label && (
					<label
						className={classNames.label}
						htmlFor={id}
						data-requiredtext={required && requiredText}
					>
						{label}
					</label>
				)}
				{helperText && <div className={classNames.helperText}>{helperText}</div>}
				<div
					className={classNames.fauxInput}
					ref={(el: HTMLButtonElement | null) => (this.fauxInputEl = el)}
				>
					<Flex align="center">
						<FlexItem>
							<input
								type="number"
								id={id}
								name={name}
								max={max}
								min={min}
								step={step}
								value={this.state.value === 0 ? '' : this.state.value}
								required={required}
								className={classNames.field}
								onBlur={this.onBlur}
								onFocus={this.onFocus}
								onChange={this.onChange}
								onKeyDown={this.onKeyDown}
								disabled={disabled}
								{...other}
							/>
						</FlexItem>

						<FlexItem shrink>
							<Button
								reset
								tabIndex="-1"
								className={classNames.decrementBtn}
								onBlur={this.onBlur}
								onClick={this.decrementAction}
								onFocus={this.onFocus}
								ref={(el: HTMLButtonElement | null) =>
									(this.decrementBtnEl = el)
								}
							>
								<Icon shape="minus" size="xs" />
							</Button>
						</FlexItem>

						<FlexItem shrink>
							<Button
								reset
								tabIndex="-1"
								className={classNames.incrementBtn}
								onBlur={this.onBlur}
								onClick={this.incrementAction}
								onFocus={this.onFocus}
								ref={(el: HTMLButtonElement | null) =>
									(this.incrementBtnEl = el)
								}
							>
								<Icon shape="plus" size="xs" />
							</Button>
						</FlexItem>

						{children}
					</Flex>
				</div>
			</div>
		);
	}
}

export default withErrorList(NumberInput);
