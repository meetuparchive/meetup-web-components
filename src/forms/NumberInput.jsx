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

type Props = {
	className?: string,
	children?: React$Node,
	disabled?: boolean,
	error?: React$Node,
	fauxInputClassName?: string,
	helperText?: string | React$Node,
	id: string,
	label?: React$Node,
	labelClassName?: string,
	max?: number,
	min: number,
	name: string,
	onChange: number => void,
	onBlur: (SyntheticInputEvent<HTMLInputElement>) => void,
	required?: boolean,
	requiredText?: string | React$Node,
	step: number,
	value: number,
};

type State = {
	isFieldFocused: boolean,
	value: number,
};

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

	_updateValueByStep = (isIncreasing: boolean) => {
		const currentVal = this.state.value;
		const step = this.props.step;

		const newValue = isIncreasing ? currentVal + step : currentVal - step;
		const minConstrained = Math.max(newValue, this.props.min);
		return Math.min(minConstrained, this.props.max || Infinity);
	};

	_updateValue = (value: number) => {
		this.setState(() => ({
			value,
		}));

		if (this.props.onChange) {
			this.props.onChange(value);
		}
	};

	onBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
		const formControls = [this.fauxInputEl, this.decrementBtnEl, this.incrementBtnEl];
		if (formControls.every(c => c !== document.activeElement)) {
			this.setState(() => ({ isFieldFocused: false }));
		}
		if (this.props.onBlur) {
			this.props.onBlur(e);
		}
	};

	onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
		this._updateValue(parseInt(e.target.value));
	};

	onFocus = (e: SyntheticFocusEvent<HTMLInputElement>) => {
		this.setState(() => ({ isFieldFocused: true }));
	};

	onKeyDown = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
		// Disable the 'e' or 'E' values because we don't
		// support scientific notation at the moment
		if (e.key.toLowerCase() === 'e') {
			e.preventDefault();
		}
	};

	incrementAction = (e: SyntheticInputEvent<HTMLInputElement>) => {
		e.preventDefault();
		this._updateValue(this._updateValueByStep(true));
	};

	decrementAction = (e: SyntheticInputEvent<HTMLInputElement>) => {
		e.preventDefault();
		this._updateValue(this._updateValueByStep(false));
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
			fauxInputClassName,
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
			fauxInput: cx(FAUX_INPUT_CLASS, fauxInputClassName, {
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
			<React.Fragment>
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
			</React.Fragment>
		);
	}
}

export default withErrorList(NumberInput);
