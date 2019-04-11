// @flow
import React from 'react';
import {
	NumericalInput as SwarmNumeric,
	FieldHelper,
	FieldLabel,
} from '@meetup/swarm-components';
import withErrorList from '../utils/components/withErrorList';

export const DECREMENT_BTN_CLASS = 'decrementButton';
export const FAUX_INPUT_CLASS = 'fauxInput';
export const FOCUSED_INPUT_CLASS = 'focused';
export const INCREMENT_BTN_CLASS = 'incrementButton';

type Value = number | null;
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
	min?: number,
	name: string,
	onChange: Value => void,
	onBlur: (SyntheticInputEvent<HTMLInputElement>) => void,
	required?: boolean,
	requiredText?: string | React$Node,
	step: number,
	value: Value,
};

export class NumberInput extends React.PureComponent<Props> {
	static defaultProps = {
		requiredText: '*',
	};

	render() {
		const { id, helperText, label, required, requiredText, ...other } = this.props;

		return (
			<React.Fragment>
				{label && (
					<FieldLabel htmlFor={id} data-requiredtext={required && requiredText}>
						{label}
					</FieldLabel>
				)}
				{helperText && <FieldHelper>{helperText}</FieldHelper>}
				<SwarmNumeric id={id} required={required} {...other} />
			</React.Fragment>
		);
	}
}

export default withErrorList(NumberInput);
