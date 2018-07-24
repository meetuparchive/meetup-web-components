import React from 'react';
import InputTime, { InputTimeComponent } from './InputTime';
import { storiesOf } from '@storybook/react';
import { decorateWithInfo } from '../utils/decorators';
import { action } from '@storybook/addon-actions';

const logValueChange = action('Value changed:');

class ControlledInputTime extends React.Component {
	state = { value: this.props.value };
	render() {
		return (
			<div className="span--25">
				<InputTime
					onChange={value => {
						logValueChange(value);
						this.setState({ value });
					}}
					{...this.props}
					value={this.state.value}
				/>
			</div>
		);
	}
}

const timeInputStories = storiesOf('Forms/InputTime/input[type=time]', module)
	.addParameters({ info: { propTables: [InputTimeComponent] } })
	.addDecorator(decorateWithInfo);
const fieldsetStories = storiesOf('Forms/InputTime/fieldset', module)
	.addParameters({ info: { propTables: [InputTimeComponent] } })
	.addDecorator(decorateWithInfo);

[false, true].forEach(forceTextInput => {
	// nested stories - 3-input fieldset vs input[type=time]
	const stories = forceTextInput ? fieldsetStories : timeInputStories;
	// only fieldset supports 'is24Hr' prop
	const supportedIs24HrVals = forceTextInput ? [false, true] : [undefined];

	supportedIs24HrVals.forEach(is24Hr => {
		const is24HrSuffix =
			(is24Hr === true && '(24hr)') || (is24Hr === false && '(12Hr)') || '';
		const makeRenderer = (props = {}) => () => (
			<ControlledInputTime
				{...props}
				name="time"
				is24Hr={is24Hr}
				forceTextInput={forceTextInput}
			/>
		);

		stories
			.add(`default ${is24HrSuffix}`, makeRenderer({ value: '14:00' }), {
				info: {
					text:
						'renders a 2-field time input, provided values are in 24hr time (ex 13:00)',
				},
			})
			.add(`no initial value ${is24HrSuffix}`, makeRenderer())
			.add(
				`disabled ${is24HrSuffix}`,
				makeRenderer({ value: '14:30', disabled: true })
			)
			.add(
				`with error ${is24HrSuffix}`,
				makeRenderer({ value: '14:30', error: 'Sorry, out of time!' })
			);
	});
});
