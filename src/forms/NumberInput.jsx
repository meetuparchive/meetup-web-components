import PropTypes from 'prop-types';
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

/**
 * @module NumberInput
 */
export class NumberInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: props.value };

		this._updateValueByStep = this._updateValueByStep.bind(this);
		this.decrementAction = this.decrementAction.bind(this);
		this.incrementAction = this.incrementAction.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
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

	componentWillReceiveProps(nextProps) {
		if (this.props.onChange && (this.props.value !== nextProps.value) && (nextProps.value !== this.state.value)) {
			this.setState(() => ({value: nextProps.value }));
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.props.onChange && nextState.value !== this.state.value) {
			this.props.onChange({ target: { name: nextProps.name, value: nextState.value }});
		}
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
	}

	onFocus(e) {
		this.fauxInputEl.classList.add(FOCUSED_INPUT_CLASS);
	}

	onKeyDown(e) {
		// Disable the 'e' or 'E' values because we don't
		// support scientific notation at the moment
		if (e.key.toLowerCase() === 'e') {
			e.preventDefault();
		}
	}

	incrementAction(e) {
		e.preventDefault();
		this.setState(() => ({ value: this._updateValueByStep(true) }));
	}

	decrementAction(e) {
		e.preventDefault();
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
			step,
			disabled,
			value, // eslint-disable-line no-unused-vars
			helperText,
			required,
			requiredText,
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
				{
					'label--disabled': disabled,
					'label--required': required,
					'flush--bottom': helperText
				},
				labelClassName
			),
			helperText: cx(
				'helperTextContainer',
				{ required, disabled }
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
				{label &&
					<label className={classNames.label} htmlFor={id} data-requiredtext={required && requiredText}>
						{label}
					</label>
				}
				{helperText &&
					<div className={classNames.helperText}>
						{helperText}
					</div>
				}
				<div
					className={classNames.fauxInput}
					ref={ el => this.fauxInputEl = el }>
					<Flex align='center'>
						<FlexItem>
							<input type='number'
								id={id}
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
								ref={ el => this.decrementBtnEl = el }>
								<Icon shape='minus' size='xs' />
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
								ref={ el => this.incrementBtnEl = el }>
								<Icon shape='plus' size='xs' />
							</Button>
						</FlexItem>

						{children}
					</Flex>
				</div>
			</div>
		);
	}
}

NumberInput.defaultProps = {
	requiredText: '*',
	step: 1,
	min: 0,
};

NumberInput.propTypes = {
	id: PropTypes.string,
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	labelClassName: PropTypes.string,
	max: PropTypes.number,
	min: PropTypes.number,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	step: PropTypes.number,
	disabled: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	helperText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	required: PropTypes.bool,
	requiredText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	])
};

export default withErrorList(NumberInput);
