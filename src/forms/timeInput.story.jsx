import React from 'react';
import TimeInput from './TimeInput';
import { InfoWrapper } from '../utils/storyComponents';
import { storiesOf } from '@kadira/storybook';

storiesOf('TimeInput', module)
	.addWithInfo(
		'default',
		'renders a time input, provided values are in 24hr time (ex 13:00)',
		() => (
			<InfoWrapper>
				<TimeInput name='time' required defaultValue='14:30' label='Dentist appt time' />
			</InfoWrapper>
		)
	)
	.add('initial value', () => {
		return (<div className='span--25'>
			<TimeInput name='time' defaultValue='13:00' label='End time' />
		</div>);
	})
	.add('required', () => {
		return (<div className='span--25'>
			<TimeInput name='time' required label='End time' />
		</div>);
	})
	.add('with error', () => {
		return (<div className='span--25'>
			<TimeInput name='time' defaultValue='13:00' label='End time' error='Sorry, out of time!' />
		</div>);
	});

