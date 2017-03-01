import React from 'react';
import TimeInput from './TimeInput';
import { storiesOf } from '@kadira/storybook';

storiesOf('TimeInput', module)
	.add('default', () => {
		return (<div className='span--25'>
			<TimeInput label='End time' />
		</div>);
	})
	.add('initial value', () => {
		return (<div className='span--25'>
			<TimeInput value='13:00' label='End time' />
		</div>);
	})
	.add('required', () => {
		return (<div className='span--25'>
			<TimeInput required label='End time' />
		</div>);
	})
	.add('with error', () => {
		return (<div className='span--25'>
			<TimeInput value='13:00' label='End time' error='Sorry, out of time!' />
		</div>);
	});

