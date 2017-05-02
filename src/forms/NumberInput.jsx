import React from 'react';
import cx from 'classnames';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';

/**
 * @module NumberInput
 */
class NumberInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value || '',
		};

		this.decrement = this.decrement.bind(this);
		this.increment = this.increment.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	onBlur(e) {
		if (document.activeElement !== this.fauxInputEl && document.activeElement !== this.decrementBtnEl && document.activeElement !== this.incrementBtnEl) {
			this.fauxInputEl.classList.remove('focused');
		}
	}

	onChange(e) {
		this.setState({ value: e.target.value });
		if (this.props.onChange) {
			this.props.onChange(e);
		}
	}

	onFocus(e) {
		this.fauxInputEl.classList.add('focused');
	}

	increment() {
		const currentVal = new Number(this.state.value);
		const increment = new Number(this.props.step);
		const newValue = currentVal + increment;

		if (newValue > this.props.max) return;

		this.setState({value: newValue});
	}

	decrement() {
		const currentVal = new Number(this.state.value);
		const decrement = new Number(this.props.step);
		const newValue = currentVal - decrement;

		if (newValue < this.props.min) return;

		this.setState({value: newValue});
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
			value, // eslint-disable-line no-unused-vars
		} = this.props;

		const classNames = cx(
			'field--reset',
			{ 'field--error': error },
			className
		);

		const labelClassNames = cx(
			{ required },
			labelClassName
		);

		return (
			<div>
				<label className={labelClassNames} htmlFor={id}>
					{label}
				</label>

				<div
					className='fauxInput'
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
								className={classNames}
								onBlur={this.onBlur}
								onFocus={this.onFocus}
								onChange={this.onChange} />
						</FlexItem>

						<FlexItem shrink>
							<button
								className='button--reset'
								onBlur={this.onBlur}
								onClick={this.decrement}
								onFocus={this.onFocus}
								ref={ el => this.decrementBtnEl = el }>
								<Icon shape='minus' size='xs' />
							</button>
						</FlexItem>

						<FlexItem shrink>
							<button
								className='button--reset'
								onBlur={this.onBlur}
								onClick={this.increment}
								onFocus={this.onFocus}
								ref={ el => this.incrementBtnEl = el }>
								<Icon shape='plus' size='xs' />
							</button>
						</FlexItem>

						{ error && <p className='text--error'>{error}</p> }
						{children}
					</Flex>
				</div>
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
	step: React.PropTypes.number
};

export default NumberInput;
