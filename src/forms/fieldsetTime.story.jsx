import React from 'react';
import FieldsetTime from './FieldsetTime';
import { storiesOf } from '@storybook/react';
import { decorateWithInfo } from '../utils/decorators';
import { action } from '@storybook/addon-actions';

const logValueChange = action('Value changed:');
class ControlledFieldsetTime extends React.Component {
	state = { value: this.props.value };
	render() {
		return (
			<div className="span--25">
				<FieldsetTime
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

storiesOf('FieldsetTime', module)
	.addDecorator(decorateWithInfo)
	.add('default', () => <ControlledFieldsetTime name="time" value="14:00" />, {
		info: {
			text:
				'renders a 2-field time input, provided values are in 24hr time (ex 13:00)',
		},
	})
	.add(
		'12hr time',
		() => <ControlledFieldsetTime is24Hr={false} name="time" value="14:30" />,
		{
			info: {
				text:
					'renders a 3-field time input, onChange callback values are in 24hr time (ex 13:00), but are displayed in the input as 12 hour time',
			},
		}
	)
	.add('no initial value', () => <ControlledFieldsetTime name="time" />)
	.add('disabled', () => <ControlledFieldsetTime name="time" value="14:30" disabled />)
	.add('with error', () => (
		<ControlledFieldsetTime name="time" value="13:00" error="Sorry, out of time!" />
	));
