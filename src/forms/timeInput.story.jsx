import React from 'react';
import TimeInput from './TimeInput';
import { InfoWrapper } from '../utils/storyComponents';
import { storiesOf } from '@storybook/react';

storiesOf('TimeInput', module)
	.addWithInfo(
		'default',
		'renders a time input, provided values are in 24hr time (ex 13:00)',
		() => (
			<InfoWrapper>
				<TimeInput name='time' value='14:30' label='Dentist appt time' forceTextInput />
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'12hr time',
		'this example only makes sense in a browser that does not support input[type=time]. renders a time input, provided values are in 24hr time (ex 13:00), but are displayed in the input as 12 hour time',
		() => (
			<InfoWrapper>
				<TimeInput is24Hr={false} name='time' value='14:30' label='Dentist appt time' forceTextInput />
			</InfoWrapper>
		)
	)
	.add('initial value', () => {
		return (<div className='span--25'>
			<TimeInput name='time' value='13:00' label='End time' />
		</div>);
	})
	.add('required', () => {
		return (<div className='span--25'>
			<TimeInput name='time' required label='End time' />
		</div>);
	})
	.add('with error', () => {
		return (<div className='span--25'>
			<TimeInput name='time' value='13:00' label='End time' error='Sorry, out of time!' />
		</div>);
	});

