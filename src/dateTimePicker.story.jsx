import React from 'react';
import DateTimePicker from './DateTimePicker';
import { storiesOf } from '@kadira/storybook';

storiesOf('DateTimePicker', module)
	.add('default', () => {
		const opts = {
			allowInput: true,
			enableTime: true,
			minDate: Date.now()
		};
		return (<div className='span--50'>
			<DateTimePicker
				label='Start at'
				value='2017-02-18T14:30'
				datepickerOptions={opts}
			/>
		</div>);
	});
