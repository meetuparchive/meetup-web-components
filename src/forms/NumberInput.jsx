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
	id: string,
	className?: string,
	children?: React$Element<*>,
	error?: string | React$Node,
	label?: string | React$Node,
	labelClassName?: string,
	max?: number,
	min: number,
	name: string,
	decrementAction: Function,
	incrementAction: Function,
	_updateValueByStep: Function,
	onBlur: Function,
	onFocus: Function,
	onKeyDown: Function,
	onChange?: Function,
	step: number,
	disabled: boolean,
	value: number,
	helperText: string | React$Node,
	required: boolean,
	requiredText: string | React$Node,
};

type State = {
	value: number,
};

/**
 * @module NumberInput
 */
export class NumberInput extends React.PureComponent<Props, State> {
	fauxInputEl: HTMLInputElement | null;
	decrementBtnEl: HTMLButtonElement | null;
	incrementBtnEl: HTMLButtonElement | null;

	defaultProps: {
		requiredText: '*',
		step: 1,
		min: 0,
	};
	constructor(props: Props) {
		super(props);
		this.state = {
			value: props.value,
		};

		this._updateValueByStep = this._updateValueByStep.bind(this);
		this.decrementAction = this.decrementAction.bind(this);
		this.incrementAction = this.incrementAction.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	static getDerivedStateFromProps(nextProps: Props, prevState: State) {
		const isNewValue = nextProps.onChange && nextProps.value !== prevState.value;

		return {
			value: isNewValue ? nextProps.value : prevState.value,
		};
	}

	_updateValueByStep: Function;
	_updateValueByStep(isIncreasing: boolean) {
		const currentVal = parseInt(this.state.value);
		const step = parseInt(this.props.step);
		let newValue = isIncreasing ? currentVal + step : currentVal - step;

		if (newValue < this.props.min) {
			return this.props.min;
		}

		if (this.props.max && newValue > this.props.max) {
			newValue = this.props.max;
		}

		return newValue;
	}

	onBlur: Function;
	onBlur(e: SyntheticInputEvent<*>) {
		const formControls = [this.fauxInputEl, this.decrementBtnEl, this.incrementBtnEl];
		if (formControls.every(c => c !== document.activeElement)) {
			this.fauxInputEl && this.fauxInputEl.classList.remove(FOCUSED_INPUT_CLASS);
		}
	}

	onChange: Function;
	onChange(e: HTMLInputElement) {
		const { onChange } = this.props;
		const { value, name } = e.target;

		this.setState(() => ({
			value: parseInt(value),
		}));

		if (onChange) {
			onChange({ target: { value, name } });
		}
	}

	onFocus: Function;
	onFocus(e: SyntheticFocusEvent<*>) {
		this.fauxInputEl && this.fauxInputEl.classList.add(FOCUSED_INPUT_CLASS);
	}

	onKeyDown: Function;
	onKeyDown(e: SyntheticKeyboardEvent<*>) {
		// Disable the 'e' or 'E' values because we don't
		// support scientific notation at the moment
		if (e.key.toLowerCase() === 'e') {
			e.preventDefault();
		}
	}

	incrementAction: Function;
	incrementAction(e: SyntheticInputEvent<*>) {
		e.preventDefault();
		this.onChange({
			target: { value: this._updateValueByStep(true), name: this.props.name },
		});
	}

	decrementAction: Function;
	decrementAction(e: SyntheticInputEvent<*>) {
		e.preventDefault();
		this.onChange({
			target: { value: this._updateValueByStep(false), name: this.props.name },
		});
	}

	render() {
		const {
			children,
			className,
			error,
			id,
			label,
			labelClassName,
			max,
			min,
			name,
			onBlur, // eslint-disable-line no-unused-vars
			onFocus, // eslint-disable-line no-unused-vars
			onChange, // eslint-disable-line no-unused-vars
			step,
			disabled,
			value, // eslint-disable-line no-unused-vars
			helperText,
			required,
			requiredText,
			...other
		} = this.props;

		const classNames = {
			field: cx('field--reset', { 'field--error': error }, className),
			fauxInput: cx(FAUX_INPUT_CLASS, {
				disabled,
				error,
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

// NumberInput.defaultProps = {
// 	requiredText: '*',
// 	step: 1,
// 	min: 0,
// };

export default withErrorList(NumberInput);
