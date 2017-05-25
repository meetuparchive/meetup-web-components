import React from 'react';
import cx from 'classnames';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';

export const DECREMENT_BTN_CLASS = 'decrementButton';
export const FAUX_INPUT_CLASS = 'fauxInput';
export const FOCUSED_INPUT_CLASS = 'focused';
export const INCREMENT_BTN_CLASS = 'incrementButton';

/**
 * @module NumberInput
 */
class NumberInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value || '',
		};

		this._updateValueByStep = this._updateValueByStep.bind(this);
		this.decrementAction = this.decrementAction.bind(this);
		this.incrementAction = this.incrementAction.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	_updateValueByStep(isIncreasing) {
		const currentVal = new Number(this.state.value);
		const step = new Number(this.props.step);
		let newValue = isIncreasing ? currentVal + step : currentVal - step;

		if (newValue > this.props.max){
			newValue = this.props.max;
		}
		else if (newValue < this.props.min){
			newValue = this.props.min;
		}

		return newValue;
	}

	onBlur(e) {
		const formControls = [
			this.fauxInputEl,
			this.decrementBtnEl,
			this.incrementBtnEl
		];
		if (formControls.every(c => c !== document.activeElement)) {
			this.fauxInputEl.classList.remove(FOCUSED_INPUT_CLASS);
		}
	}

	onChange(e) {
		const { value } = e.target;

		this.setState(() => ({ value }));
		if (this.props.onChange) {
			this.props.onChange(e);
		}
	}

	onFocus(e) {
		this.fauxInputEl.classList.add(FOCUSED_INPUT_CLASS);
	}

	incrementAction() {
		this.setState(() => ({ value: this._updateValueByStep(true) }));
	}

	decrementAction() {
		this.setState(() => ({ value: this._updateValueByStep(false) }));
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
			required,
			step,
			disabled,
			value, // eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = {
			field: cx(
				'field--reset',
				{ 'field--error': error },
				className
			),
			fauxInput: cx(
				FAUX_INPUT_CLASS,
				{
					disabled,
					error
				}
			),
			label: cx(
				'label--field',
				{ required, disabled },
				labelClassName
			),
			incrementBtn: cx(
				'button--reset',
				INCREMENT_BTN_CLASS
			),
			decrementBtn: cx(
				'button--reset',
				DECREMENT_BTN_CLASS
			),
		};

		return (
			<div>
				<label className={classNames.label} htmlFor={id}>
					{label}
				</label>

				<div
					className={classNames.fauxInput}
					ref={ el => this.fauxInputEl = el }>
					<Flex align='center'>
						<FlexItem>
							<input type='number'
								name={name}
								max={max}
								min={min}
								step={step}
								value={this.state.value}
								required={required}
								className={classNames.field}
								onBlur={this.onBlur}
								onFocus={this.onFocus}
								onChange={this.onChange}
								disabled={disabled}
								{...other} />
						</FlexItem>

						<FlexItem shrink>
							<button
								className={classNames.decrementBtn}
								onBlur={this.onBlur}
								onClick={this.decrementAction}
								onFocus={this.onFocus}
								ref={ el => this.decrementBtnEl = el }>
								<Icon shape='minus' size='xs' />
							</button>
						</FlexItem>

						<FlexItem shrink>
							<button
								className={classNames.incrementBtn}
								onBlur={this.onBlur}
								onClick={this.incrementAction}
								onFocus={this.onFocus}
								ref={ el => this.incrementBtnEl = el }>
								<Icon shape='plus' size='xs' />
							</button>
						</FlexItem>

						{children}
					</Flex>
				</div>
				{ error && <p className='text--error'>{error}</p> }
			</div>
		);
	}
}

NumberInput.defaultProps = {
	step: 1,
	min: 0
};

NumberInput.propTypes = {
	id: React.PropTypes.string,
	error: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	label: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	labelClassName: React.PropTypes.string,
	max: React.PropTypes.number,
	min: React.PropTypes.number,
	name: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func,
	required: React.PropTypes.bool,
	disabled: React.PropTypes.bool,
	step: React.PropTypes.number
};

export default NumberInput;
